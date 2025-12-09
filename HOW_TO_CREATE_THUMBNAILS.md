# Creating Thumbnails for 3D Models

## Option 1: Screenshot (Easiest)
1. Open your product page with the 3D model
2. Rotate it to a nice angle
3. Take a screenshot (Windows: Win+Shift+S)
4. Crop to just the model
5. Save as `public/images/thumbnails/product-name.jpg`

## Option 2: Render from CAD Software (Best Quality)
1. Open your STL in Fusion 360 / SolidWorks / Blender
2. Set up a nice camera angle
3. Apply red material (#dc2626)
4. Render to PNG/JPG (800x800px recommended)
5. Save to `public/images/thumbnails/`

## Option 3: Use the Live 3D Viewer
1. Go to: http://localhost:3000/products/peg-perego-front-rear-wheel-kit
2. Rotate model to desired angle
3. Screenshot just the model area
4. Crop and save

## Then Update Product Data

Edit `data/products.js`:

```javascript
{
  id: 'peg-perego-front-rear-wheel-kit',
  name: 'Peg Perego Front & Rear Wheel Kit',
  // ...
  images: [],
  model3D: '/models/front-axle-adapter.stl',
  thumbnail: '/images/thumbnails/front-axle-adapter.jpg', // <-- Add this
  freeShipping: true
}
```

## What the Thumbnail Does
- Shows on shop page grid
- Shows in cart
- Shows in product cards
- Shows until 3D model loads
- Has a "3D" badge to indicate interactive model available

## Recommended Size
- 800x800px (or any square)
- JPG or PNG
- Under 200KB
