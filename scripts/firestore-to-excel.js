#!/usr/bin/env node
/**
 * Convert Firestore JSON to Excel
 * Usage: node scripts/firestore-to-excel.js <input.json> <output.xlsx>
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Fields that contain complex data (arrays/objects) - will be JSON stringified
const COMPLEX_FIELDS = ['features', 'specifications', 'cogsBreakdown', 'images', 'packingSlipComponents'];

function jsonToExcel(inputFile, outputFile) {
  console.log(`📖 Reading ${inputFile}...`);

  // Read the JSON file
  const rawData = fs.readFileSync(inputFile, 'utf8');
  const data = JSON.parse(rawData);

  if (!data.products || !Array.isArray(data.products)) {
    throw new Error('Invalid format: expected { products: [...] }');
  }

  console.log(`✓ Found ${data.products.length} products`);

  // Convert products to flat rows for Excel
  const rows = data.products.map(product => {
    const row = {};

    // Copy all simple fields
    for (const [key, value] of Object.entries(product)) {
      if (COMPLEX_FIELDS.includes(key)) {
        // Stringify complex fields
        row[key] = value ? JSON.stringify(value) : '';
      } else if (value === null || value === undefined) {
        row[key] = '';
      } else {
        row[key] = value;
      }
    }

    return row;
  });

  // Get all unique column names across all products
  const allColumns = new Set();
  rows.forEach(row => {
    Object.keys(row).forEach(col => allColumns.add(col));
  });

  // Define column order (important fields first)
  const columnOrder = [
    'id',
    'name',
    'slug',
    'sku',
    'category',
    'subcategory',
    'price',
    'originalPrice',
    'discount',
    'cost',
    'inStock',
    'preOrder',
    'quantity',
    'lowStockThreshold',
    'freeShipping',
    'description',
    'features',
    'specifications',
    'images',
    'cogsBreakdown',
    'weight',
    'weightUnit',
    'length',
    'width',
    'height',
    'dimensionUnit',
    'requiresDisclaimer',
    'disclaimerText',
    'stripePaymentLink',
    'packingSlipComponents',
    'availableDate',
    'createdAt',
    'updatedAt',
    'avgShippingCost'
  ];

  // Add any remaining columns not in the order list
  const orderedColumns = [...columnOrder];
  allColumns.forEach(col => {
    if (!orderedColumns.includes(col)) {
      orderedColumns.push(col);
    }
  });

  // Create worksheet
  const ws = XLSX.utils.json_to_sheet(rows, { header: orderedColumns });

  // Set column widths for better readability
  const columnWidths = orderedColumns.map(col => {
    if (col === 'description') return { wch: 60 };
    if (COMPLEX_FIELDS.includes(col)) return { wch: 40 };
    if (col === 'name') return { wch: 50 };
    if (col === 'id' || col === 'slug') return { wch: 30 };
    return { wch: 15 };
  });

  ws['!cols'] = columnWidths;

  // Create workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Products');

  // Add a README sheet with instructions
  const readmeData = [
    ['Firestore Products - Excel Export'],
    [''],
    ['Instructions:'],
    ['1. Edit the data in the Products sheet'],
    ['2. Complex fields (features, specifications, images, cogsBreakdown) are JSON strings'],
    ['3. To edit complex fields, edit the JSON string directly or use a JSON editor'],
    ['4. Save this file when done'],
    ['5. Run: node scripts/excel-to-firestore.js <this-file.xlsx> <output.json>'],
    [''],
    ['Notes:'],
    ['- Do not change column names'],
    ['- Do not delete the id column'],
    ['- Empty cells will be preserved as empty strings or null'],
    ['- Dates should remain in ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)'],
    [''],
    ['Complex Fields (JSON format):'],
    ['- features: Array of strings, e.g., ["Feature 1", "Feature 2"]'],
    ['- specifications: Object, e.g., {"Size": "10 inches", "Weight": "5 lbs"}'],
    ['- images: Array of strings, e.g., ["/images/product1.jpg"]'],
    ['- cogsBreakdown: Array of objects, e.g., [{"label": "Part A", "amount": 10.5}]'],
  ];

  const wsReadme = XLSX.utils.aoa_to_sheet(readmeData);
  wsReadme['!cols'] = [{ wch: 80 }];
  XLSX.utils.book_append_sheet(wb, wsReadme, 'README');

  // Write the file
  XLSX.writeFile(wb, outputFile);

  console.log(`✅ Excel file created: ${outputFile}`);
  console.log(`📊 ${data.products.length} products exported`);
  console.log(`📋 ${orderedColumns.length} columns`);
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('Usage: node scripts/firestore-to-excel.js <input.json> <output.xlsx>');
    console.error('Example: node scripts/firestore-to-excel.js data.json products.xlsx');
    process.exit(1);
  }

  const [inputFile, outputFile] = args;

  try {
    jsonToExcel(inputFile, outputFile);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

module.exports = { jsonToExcel };
