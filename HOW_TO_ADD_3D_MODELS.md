# How to Add 3D Models to Products

## Step 1: Export your STL/OBJ files
- Keep files under 5MB for good performance
- Center your model at origin (0,0,0) in your CAD software
- Export with appropriate scale

## Step 2: Upload files
Place your STL or OBJ files in: `public/models/`

Example:
```
public/
  models/
    wheel-adapter.stl
    gator-wheel-kit.stl
    battery-adapter.obj
```

## Step 3: Add to product data
Edit `data/products.js` and add the `model3D` field:

```javascript
{
  id: 'peg-perego-front-rear-wheel-kit',
  name: 'Peg Perego Front & Rear Wheel Kit',
  slug: 'peg-perego-front-rear-wheel-kit',
  // ... other fields ...
  images: [], // can still have regular images as fallback
  model3D: '/models/wheel-adapter.stl', // <-- Add this line
  freeShipping: true
}
```

## Supported Formats
- `.stl` - Most common for 3D printing
- `.obj` - Also supported

## Features
- ✅ Interactive 3D rotation (drag to spin)
- ✅ Zoom in/out (mouse wheel)
- ✅ Pan camera (right-click drag)
- ✅ Automatic fallback to images if model fails
- ✅ Loading indicator
- ✅ Red metallic material matches brand colors

## Tips
- Test locally first: `npm run dev`
- Optimize large models before uploading
- Models display with red metallic finish
- Falls back to regular images or "Coming Soon" if 3D model unavailable
