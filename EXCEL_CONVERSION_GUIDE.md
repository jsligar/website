# Firestore ↔️ Excel Conversion Guide

Clean up your Firestore data using Excel, then import it back in the exact same format.

## 🚀 Quick Start

### Step 1: Export to Excel

```bash
# Save your Firestore data to a JSON file first (e.g., firestore-data.json)
# Then convert it to Excel:
node scripts/firestore-to-excel.js firestore-data.json products.xlsx
```

This creates `products.xlsx` with:
- **Products sheet**: All your product data
- **README sheet**: Instructions and field reference

### Step 2: Edit in Excel

1. Open `products.xlsx` in Excel, Google Sheets, or LibreOffice
2. Edit the data in the **Products** sheet
3. **Important notes:**
   - Don't change column names
   - Don't delete the `id` column
   - Complex fields (features, specifications, images, cogsBreakdown) are JSON strings
   - To edit JSON fields, edit the string directly or use a JSON validator

### Step 3: Import Back to JSON

```bash
# Convert your edited Excel file back to Firestore JSON:
node scripts/excel-to-firestore.js products.xlsx firestore-updated.json
```

This creates `firestore-updated.json` ready to upload to Firestore.

---

## 📋 Field Reference

### Simple Text Fields
Edit these directly in Excel:
- `id`, `name`, `slug`, `sku`
- `category`, `subcategory`
- `description`, `disclaimerText`
- `weightUnit`, `dimensionUnit`
- `stripePaymentLink`, `availableDate`

### Number Fields
Must be valid numbers (or empty):
- `price`, `originalPrice`, `discount`, `cost`
- `quantity`, `lowStockThreshold`
- `weight`, `length`, `width`, `height`
- `avgShippingCost`

### Boolean Fields (TRUE/FALSE)
- `inStock`
- `preOrder`
- `freeShipping`
- `requiresDisclaimer`

### Date Fields
Keep in ISO 8601 format:
- `createdAt`: `2025-11-11T23:05:02.828Z`
- `updatedAt`: `2025-12-10T07:17:34.458Z`

### Complex Fields (JSON Strings)

#### `features` - Array of strings
```json
["Feature 1", "Feature 2", "Feature 3"]
```

#### `specifications` - Object
```json
{"Tire Size": "13 inches", "Weight": "30 lbs", "Material": "Steel"}
```

#### `images` - Array of strings
```json
["/images/products/product-1.jpg", "/images/products/product-2.jpg"]
```

#### `cogsBreakdown` - Array of objects
```json
[
  {"label": "Part A", "amount": 10.5},
  {"label": "Part B", "amount": 5.25}
]
```

---

## ✅ Common Cleanup Tasks

### Fill in Missing SKUs
1. Find products with empty `sku` column
2. Add unique SKU codes (e.g., `PP-WHEEL-001`)

### Standardize Dimensions
1. Ensure `weight`, `length`, `width`, `height` are numbers (or empty)
2. Check `weightUnit` and `dimensionUnit` are consistent

### Fix Inventory Data
1. Add `quantity` for all products
2. Set appropriate `lowStockThreshold` (e.g., 3)
3. Update `inStock` based on quantity

### Update Cost Data
1. Fill in `cost` for products missing it
2. Add `cogsBreakdown` for detailed cost tracking

### Verify Categories
1. Ensure all products have `category`
2. Add `subcategory` where appropriate

---

## 🔧 Advanced Tips

### Bulk Find & Replace
Use Excel's Find & Replace to:
- Fix typos across all products
- Update URLs (e.g., change image paths)
- Standardize text formatting

### Filtering & Sorting
- Filter by `category` to work on related products
- Sort by `price` to check pricing consistency
- Filter by empty `sku` to find missing data

### Formulas
You can use Excel formulas in empty columns for calculations:
- Calculate profit margin: `=(price - cost) / price`
- Check discount percentage: `=(originalPrice - price) / originalPrice`

**Important**: Delete formula columns before importing back!

---

## ⚠️ Important Warnings

1. **Don't delete the `id` column** - Required for identifying products
2. **Don't change column names** - The import script relies on exact names
3. **Backup your data** - Always keep a copy of the original JSON
4. **Validate JSON fields** - Use a JSON validator for complex fields
5. **Test with small batch** - Try a few products first to ensure format is correct

---

## 🛠️ Troubleshooting

### "Invalid JSON" Warning
If you see this warning, check the JSON syntax in complex fields:
- Missing quotes around strings
- Missing commas between items
- Unmatched brackets `[]` or braces `{}`

### "Invalid Number" Warning
- Remove any text from number fields
- Use decimals with `.` not `,`
- Leave cell empty instead of `N/A` or `null`

### Products Not Importing
- Check that `id` field exists for all rows
- Ensure you're importing from the "Products" sheet
- Verify file extension is `.xlsx`

---

## 📞 Need Help?

If you encounter issues:
1. Check the console output for specific error messages
2. Validate your JSON fields at [jsonlint.com](https://jsonlint.com)
3. Compare your edited data to the original export

---

**Happy data cleaning! 🧹✨**
