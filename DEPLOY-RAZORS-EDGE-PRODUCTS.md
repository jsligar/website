# Deploy Razors-Edge Products to Production

**Issue**: New Razors-Edge products (24 SKUs) are on development branch but not showing on production site (https://nerdbillyfab-2ef48.web.app/)

**Current Status**:
- ✅ Development branch has 24 new products
- ❌ Production site only shows 1 old Razors-Edge product
- ✅ Build passes with zero errors
- ✅ All changes committed and pushed

---

## Problem

The production website is deployed from the main branch, but our new Razors-Edge product catalog is on the development branch:

**Branch**: `claude/razor-edge-bom-development-011CV1NzNmeBh4fiyRQWw1CG`

---

## Solution: Merge and Deploy

Follow these steps to deploy the new products to production:

### Step 1: Check Current Branch and Status
```bash
git branch
git status
```

### Step 2: Switch to Main Branch
```bash
# Find your main branch name (could be 'main' or 'master')
git branch -a

# Switch to main branch (replace 'main' with your actual main branch name)
git checkout main
```

### Step 3: Pull Latest Main Branch
```bash
git pull origin main
```

### Step 4: Merge Development Branch
```bash
git merge claude/razor-edge-bom-development-011CV1NzNmeBh4fiyRQWw1CG
```

### Step 5: Verify the Merge
```bash
# Check that the new files exist
ls -la data/razors-edge-*.js data/razors-edge-*.md

# Verify products.js has the import
head -5 data/products.js
```

### Step 6: Build for Production
```bash
npm run build
```

**Expected output**: ✅ Build should complete with zero errors

### Step 7: Deploy to Firebase
```bash
firebase deploy
```

**OR** if using a specific Firebase project:
```bash
firebase deploy --project nerdbillyfab-2ef48
```

### Step 8: Verify Deployment
After deployment completes, check these URLs:

1. **Shop Page**: https://nerdbillyfab-2ef48.web.app/shop
   - Should show 32 total products (9 wheels/adapters + 24 Razors-Edge)

2. **Complete System**: https://nerdbillyfab-2ef48.web.app/products/razors-edge-complete
   - Should show new $599.99 complete system with all details

3. **DIY Kit**: https://nerdbillyfab-2ef48.web.app/products/razors-edge-diy-kit
   - Should show $499.99 DIY kit

4. **Battery Bundle**: https://nerdbillyfab-2ef48.web.app/products/razors-edge-battery-bundle
   - Should show $899.99 bundle

5. **Modules**:
   - https://nerdbillyfab-2ef48.web.app/products/razors-edge-core-control-module
   - https://nerdbillyfab-2ef48.web.app/products/razors-edge-motor-control-module
   - (Should show 6 modules at various prices)

---

## What Was Added

### New Files Created
1. `data/razors-edge-products.js` - 24 product catalog entries
2. `data/razors-edge-bom.md` - Complete Bill of Materials
3. `data/razors-edge-sku-reference.md` - SKU reference and pricing
4. `RAZORS-EDGE-IMPLEMENTATION-SUMMARY.md` - Project documentation

### Modified Files
1. `data/products.js` - Imports and spreads razorsEdgeProducts array

### Products Added (24 total)

**Complete Systems (3)**:
- RE-SYS-COMPLETE-001: Complete System - $599.99
- RE-SYS-DIY-001: DIY Kit - $499.99
- RE-SYS-BUNDLE-001: Battery Bundle - $899.99

**Modules (6)**:
- RE-CTRL-001: Core Control - $89.99
- RE-MOTOR-001: Motor Control - $129.99
- RE-POWER-001: Power Management - $109.99
- RE-DISPLAY-001: Display & UI - $49.99
- RE-GPS-001: GPS & Telemetry - $69.99
- RE-SAFETY-001: Safety Systems - $79.99

**Accessories (4)**:
- RE-WIRE-001: Wiring Kit - $59.99
- RE-ENCL-001: Enclosure Kit - $89.99
- RE-PCB-SET: PCB Set - $89.99
- RE-BATT-60V-001: Battery Pack - $349.99

**Replacement Parts (9)**:
- Various components $12.99 - $34.99

**Services (2)**:
- RE-DOC-PRINT: Manual - $29.99
- RE-SUP-INSTALL: Support - $149.99

---

## Troubleshooting

### If Merge Conflicts Occur
```bash
# Check which files have conflicts
git status

# The conflict is likely in data/products.js
# Edit the file to keep both the original products AND the new import/spread
# Look for conflict markers: <<<<<<< ======= >>>>>>>

# After resolving:
git add data/products.js
git commit -m "Merge Razors-Edge products - resolve conflicts"
```

### If Build Fails
```bash
# Check for syntax errors
npm run build

# Common issues:
# 1. Missing .js extension in import (should be './razors-edge-products.js')
# 2. Missing files (verify all 4 new files exist)
# 3. Syntax errors in product data
```

### If Firebase Deploy Fails
```bash
# Login to Firebase
firebase login

# List projects
firebase projects:list

# Use correct project
firebase use nerdbillyfab-2ef48

# Try deploy again
firebase deploy
```

### If Products Don't Show After Deploy
```bash
# Clear Firebase hosting cache
firebase hosting:channel:delete <channel-name>

# Or wait 5-10 minutes for CDN cache to clear

# Force refresh in browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
```

---

## Expected Results After Deployment

### Shop Page
- **Before**: 9 products (8 wheels/adapters + 1 Razors-Edge)
- **After**: 32+ products (8 wheels/adapters + 24 Razors-Edge)

### Product Categories
New products will appear in these categories:
- Electronics (19 new Razors-Edge products)
- Battery (1 new: 60V pack)
- Documentation (1 new: printed manual)
- Services (1 new: remote support)

### Product Pages
24 new product detail pages will be accessible at:
- `/products/razors-edge-complete`
- `/products/razors-edge-diy-kit`
- `/products/razors-edge-battery-bundle`
- `/products/razors-edge-[module-name]-module`
- `/products/razors-edge-[component-name]`
- etc.

---

## Verification Checklist

After deployment, verify:

- [ ] Shop page shows 32+ products
- [ ] Complete System product page exists ($599.99)
- [ ] DIY Kit product page exists ($499.99)
- [ ] Battery Bundle product page exists ($899.99)
- [ ] All 6 module pages exist and load
- [ ] Replacement parts pages exist
- [ ] Services/documentation pages exist
- [ ] Product images show placeholders (to be replaced later)
- [ ] Safety disclaimers appear on appropriate products
- [ ] Prices and discounts display correctly
- [ ] "Pre-Order" badges show on unavailable items

---

## Alternative: Create Pull Request First

If you want to review changes before deploying:

```bash
# Using GitHub CLI
gh pr create --title "Add Razors-Edge Product Catalog (24 SKUs)" \
  --body "$(cat <<'EOF'
## Summary
Adds comprehensive Razors-Edge product catalog with 24 SKUs including:
- 3 complete systems/bundles
- 6 individual modules
- 4 component kits & accessories
- 9 replacement parts
- 2 documentation/service products

## Changes
- Created razors-edge-products.js with full catalog
- Created razors-edge-bom.md with Bill of Materials
- Created razors-edge-sku-reference.md with pricing strategy
- Modified products.js to import new catalog
- All builds passing ✅

## Testing
- Build: ✅ Zero errors
- Product pages: ✅ All 24 generated
- Integration: ✅ Products appear in main catalog

## Ready for
- Product photography
- Pre-order system configuration
- Production deployment

See RAZORS-EDGE-IMPLEMENTATION-SUMMARY.md for full details.
EOF
)" \
  --base main \
  --head claude/razor-edge-bom-development-011CV1NzNmeBh4fiyRQWw1CG
```

Then merge the PR through GitHub interface and deploy.

---

## Quick Deploy (If You're Ready)

```bash
# All-in-one command sequence
git checkout main && \
git pull origin main && \
git merge claude/razor-edge-bom-development-011CV1NzNmeBh4fiyRQWw1CG && \
npm run build && \
firebase deploy

# Then verify at: https://nerdbillyfab-2ef48.web.app/shop
```

---

## Contact/Support

If deployment issues occur:
1. Check build output for errors
2. Verify all 4 new files exist in data/ directory
3. Confirm products.js import statement has .js extension
4. Review Firebase deployment logs
5. Check browser console for JavaScript errors

---

**Status**: Ready to deploy
**Branch**: claude/razor-edge-bom-development-011CV1NzNmeBh4fiyRQWw1CG
**Build**: ✅ Passing
**Products**: 24 SKUs ready

Deploy when ready! 🚀
