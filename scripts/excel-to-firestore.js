#!/usr/bin/env node
/**
 * Convert Excel back to Firestore JSON
 * Usage: node scripts/excel-to-firestore.js <input.xlsx> <output.json>
 */

const XLSX = require('xlsx');
const fs = require('fs');

// Fields that should be parsed from JSON strings
const COMPLEX_FIELDS = ['features', 'specifications', 'cogsBreakdown', 'images', 'packingSlipComponents'];

// Fields that should be numbers
const NUMBER_FIELDS = [
  'price', 'originalPrice', 'discount', 'cost', 'quantity',
  'lowStockThreshold', 'weight', 'length', 'width', 'height', 'avgShippingCost'
];

// Fields that should be booleans
const BOOLEAN_FIELDS = ['inStock', 'preOrder', 'freeShipping', 'requiresDisclaimer'];

function excelToJson(inputFile, outputFile) {
  console.log(`📖 Reading ${inputFile}...`);

  // Read the Excel file
  const workbook = XLSX.readFile(inputFile);

  if (!workbook.SheetNames.includes('Products')) {
    throw new Error('Excel file must contain a "Products" sheet');
  }

  // Convert Products sheet to JSON
  const worksheet = workbook.Sheets['Products'];
  const rawRows = XLSX.utils.sheet_to_json(worksheet);

  console.log(`✓ Found ${rawRows.length} products`);

  // Process each row
  const products = rawRows.map((row, index) => {
    const product = {};

    for (const [key, value] of Object.entries(row)) {
      // Skip empty values
      if (value === '' || value === null || value === undefined) {
        // Keep null for specific fields, skip for others
        if (NUMBER_FIELDS.includes(key) || ['height', 'width', 'length', 'weight'].includes(key)) {
          product[key] = null;
        }
        continue;
      }

      // Handle complex fields (parse JSON)
      if (COMPLEX_FIELDS.includes(key)) {
        try {
          if (typeof value === 'string') {
            product[key] = JSON.parse(value);
          } else {
            product[key] = value;
          }
        } catch (e) {
          console.warn(`⚠️  Row ${index + 2}, column "${key}": Invalid JSON, keeping as string`);
          product[key] = value;
        }
      }
      // Handle numbers
      else if (NUMBER_FIELDS.includes(key)) {
        const num = typeof value === 'number' ? value : parseFloat(value);
        if (!isNaN(num)) {
          product[key] = num;
        } else {
          console.warn(`⚠️  Row ${index + 2}, column "${key}": Invalid number "${value}", skipping`);
        }
      }
      // Handle booleans
      else if (BOOLEAN_FIELDS.includes(key)) {
        if (typeof value === 'boolean') {
          product[key] = value;
        } else if (typeof value === 'string') {
          const lower = value.toLowerCase();
          product[key] = lower === 'true' || lower === 'yes' || lower === '1';
        } else {
          product[key] = Boolean(value);
        }
      }
      // Everything else as-is
      else {
        product[key] = value;
      }
    }

    // Validate required fields
    if (!product.id) {
      throw new Error(`Row ${index + 2}: Missing required field "id"`);
    }

    return product;
  });

  // Create the full Firestore structure
  const firestoreData = {
    products: products,
    orders: [],
    components: []
  };

  // Write to JSON file
  const jsonOutput = JSON.stringify(firestoreData, null, 2);
  fs.writeFileSync(outputFile, jsonOutput, 'utf8');

  console.log(`✅ Firestore JSON created: ${outputFile}`);
  console.log(`📊 ${products.length} products imported`);

  // Summary statistics
  const stats = {
    withCost: products.filter(p => p.cost != null).length,
    withDimensions: products.filter(p => p.weight != null || p.length != null).length,
    inStock: products.filter(p => p.inStock).length,
    preOrder: products.filter(p => p.preOrder).length,
  };

  console.log('\n📈 Summary:');
  console.log(`   - Products with cost data: ${stats.withCost}`);
  console.log(`   - Products with dimensions: ${stats.withDimensions}`);
  console.log(`   - In stock: ${stats.inStock}`);
  console.log(`   - Pre-order: ${stats.preOrder}`);
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('Usage: node scripts/excel-to-firestore.js <input.xlsx> <output.json>');
    console.error('Example: node scripts/excel-to-firestore.js products.xlsx firestore-updated.json');
    process.exit(1);
  }

  const [inputFile, outputFile] = args;

  try {
    excelToJson(inputFile, outputFile);
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

module.exports = { excelToJson };
