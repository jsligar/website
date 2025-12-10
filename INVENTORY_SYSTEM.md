# Inventory Management System

NerdbillyFab now uses **Firestore** for live inventory management with a smart text parser for easy bulk updates.

---

## Quick Start

### 1. **Initial Migration** (One-time setup)

Migrate existing components from `data/components.js` to Firestore:

```bash
node scripts/migrate-components-to-firestore.js
```

This will copy all 70+ components to Firestore.

---

### 2. **Using the Admin Interface**

Navigate to: **`/admin/inventory`**

#### Smart Text Parser:

Paste inventory updates in natural language:

```
1000g blue bambu pla 15.99
800g purple bambu pla 15.99
200g orange bambu pla 15.99
500g support material 25.99
1kg abs-gf red 15.99
```

#### Steps:
1. Paste your inventory data (one item per line)
2. Click **"Parse & Preview"** - see what will be saved
3. Review the parsed data
4. Click **"Save to Firestore"** - done!

---

## Supported Formats

### Filaments:

```
[amount]g [color] [type] [price]
```

Examples:
```
1000g blue bambu pla 15.99
800g purple bambu pla 15.99
500g support material 25.99
1kg abs-gf red 23.99
750g petg black 18.99
800g tpu clear 28.99
```

### Key Features:

- **Auto-calculates cost per 100g** from full spool price
- **Smart spool detection** - knows 1kg PLA spools cost $15.99
- **Tracks partial spools** - 800g remaining = note says "(800g remaining)"
- **Flexible input** - accepts "1000g", "1kg", "1 kg", etc.

---

## API Endpoints

### Get All Components
```javascript
GET /api/components
```

Returns all components from Firestore.

### Parse Inventory Text
```javascript
POST /api/components/parse
Body: { text: "1000g blue pla 15.99\n800g red pla 15.99" }
```

Returns structured component data.

### Save Components (Batch)
```javascript
POST /api/components
Body: {
  components: [...],
  updatedBy: "admin@email.com"
}
```

Saves multiple components to Firestore.

---

## Code Usage

### Fetch Components (Server-side):

```javascript
import { getComponents } from '@/lib/components-service'

const components = await getComponents()
```

### Fetch by Category:

```javascript
import { getComponentsByCategory } from '@/lib/components-service'

const filaments = await getComponentsByCategory('Filament')
const hardware = await getComponentsByCategory('Hardware')
```

### Calculate BOM Cost:

```javascript
import { calculateComponentCost } from '@/lib/components-service'

const bom = [
  { id: 'pla-bambu-blue-100g', quantity: 400 },  // 400g blue PLA
  { id: 'hex-bolt-m8x40', quantity: 10 },        // 10 bolts
  { id: 'washer-m8-flat', quantity: 20 }         // 20 washers
]

const totalCost = await calculateComponentCost(bom)
console.log(`Total COGS: $${totalCost.toFixed(2)}`)
```

---

## Firestore Structure

### Collection: `components`

Document ID: `pla-bambu-blue-100g`

```javascript
{
  id: 'pla-bambu-blue-100g',
  name: 'PLA Bambu Blue (100g)',
  type: 'PLA',
  color: 'Blue',
  category: 'Filament',
  cost: 1.60,                    // Cost per 100g
  unit: 'per 100g',
  onHand: 1000,                  // Grams on hand
  notes: '1000g spool @ $15.99 (full spool)',
  lastUpdated: Timestamp,
  updatedBy: 'admin@example.com'
}
```

---

## Categories

- **Filament** - PLA, PETG, TPU, ABS-GF, Support
- **Hardware** - Bolts, nuts, washers, bearings
- **Tires** - Pneumatic tires, wheels
- **Electronics** - Connectors, wires
- **Packaging** - Boxes, bubble wrap
- **Labor** - Print time, assembly, QC
- **Overhead** - Electricity

---

## Benefits vs. Static File

| Feature | components.js | Firestore |
|---------|--------------|-----------|
| Real-time updates | ❌ | ✅ |
| Web interface | ❌ | ✅ |
| History tracking | Git only | ✅ Built-in |
| Multi-user | ❌ Conflicts | ✅ No conflicts |
| Query/filter | ❌ | ✅ |
| Mobile access | ❌ | ✅ |

---

## Backup & Sync

The `data/components.js` file is **kept as backup**:

- Seed data for new projects
- Version control backup
- Can be exported from Firestore anytime

---

## Example Workflow

### Adding New Filament Purchase:

1. Go to `/admin/inventory`
2. Paste:
   ```
   1000g yellow bambu pla 15.99
   ```
3. Parse & Preview
4. Save to Firestore
5. Done! Inventory updated in ~5 seconds

### Tracking Usage:

When you print a 400g adapter:

```javascript
import { updateComponentInventory } from '@/lib/components-service'

// Deduct 400g from blue PLA
const currentOnHand = 1000  // Get from Firestore
await updateComponentInventory('pla-bambu-blue-100g', currentOnHand - 400, user.email)
// Now shows 600g remaining
```

---

## Troubleshooting

### Parse Errors?

- Check format: `[amount]g [color] [material] [price]`
- Material must be: `pla`, `petg`, `tpu`, `abs-gf`, or `support`
- Price can be `15.99` or `$15.99`

### Migration Failed?

- Check Firebase credentials in `.env.local`
- Ensure Firestore is enabled in Firebase Console
- Check internet connection

### Components Not Showing?

- Verify Firestore rules allow admin read/write
- Check browser console for errors
- Ensure you're logged in as admin

---

## Future Enhancements

- ✅ Smart text parser (DONE)
- ✅ Firestore integration (DONE)
- 🔜 Auto-deduct inventory on order shipment
- 🔜 Low stock alerts
- 🔜 Purchase order generation
- 🔜 Cost trend analysis
- 🔜 CSV export for accounting

---

**Questions?** Check the code or ask for help!
