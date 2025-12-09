const { createCanvas } = require('canvas');
const fs = require('fs');

// Simple script to create a 3D badge thumbnail
// For actual 3D renders, use Blender or your CAD software

function createPlaceholder3DThumbnail(outputPath) {
  const canvas = createCanvas(800, 800);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#242424';
  ctx.fillRect(0, 0, 800, 800);

  // Draw simple 3D cube representation
  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = 4;
  ctx.fillStyle = '#dc2626';

  // Back face
  ctx.globalAlpha = 0.3;
  ctx.fillRect(200, 200, 300, 300);
  
  // Front face
  ctx.globalAlpha = 0.6;
  ctx.fillRect(300, 300, 300, 300);
  
  ctx.globalAlpha = 1;
  ctx.strokeRect(300, 300, 300, 300);

  // Lines connecting
  ctx.beginPath();
  ctx.moveTo(200, 200);
  ctx.lineTo(300, 300);
  ctx.moveTo(500, 200);
  ctx.lineTo(600, 300);
  ctx.moveTo(500, 500);
  ctx.lineTo(600, 600);
  ctx.moveTo(200, 500);
  ctx.lineTo(300, 600);
  ctx.stroke();

  // Text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('3D MODEL', 400, 700);
  ctx.font = '24px Arial';
  ctx.fillStyle = '#9ca3af';
  ctx.fillText('Click to view interactive 3D', 400, 750);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Thumbnail created: ${outputPath}`);
}

// Usage: node generate-thumbnail.js
createPlaceholder3DThumbnail('./public/images/thumbnails/3d-model-placeholder.png');
