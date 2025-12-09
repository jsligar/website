// Import Razors-Edge products from separate catalog
import { razorsEdgeProducts } from './razors-edge-products.js'

export const products = [
  {
    id: 'peg-perego-front-rear-wheel-kit',
    name: 'Peg Perego Front & Rear Wheel Kit – 2x10 and 2x13 Tires w/ ABS-GF Adapters + Hardware',
    slug: 'peg-perego-front-rear-wheel-kit',
    category: 'wheels',
    price: 59.49,
    originalPrice: 69.99,
    discount: 15,
    description: 'Upgrade your Peg Perego ride-on with this complete wheel replacement kit — it includes two 10″ front wheels and two 13″ rear wheels mounted on steel hubs, plus heavy-duty ABS-GF adapters and hardware for a direct bolt-on install.',
    features: [
      'Complete set: includes 2×10″ front and 2×13″ rear pneumatic tires on steel wheels, plus ABS-GF adapters',
      'Durable adapters: glass-filled ABS-GF outlast stock plastic and support more weight',
      'Hardware included: each kit comes with bolts, nuts and washers',
      'Direct fit: designed for Peg Perego John Deere, Case IH, and similar ride-on vehicles — no drilling required',
      'Made in Missouri, USA: printed in-house and shipped from the Midwest',
      'Free shipping'
    ],
    specifications: {
      'Front Tire Size': '10 inches',
      'Rear Tire Size': '13 inches',
      'Adapter Material': 'ABS-GF (Glass-filled)',
      'Wheel Material': 'Steel',
      'Compatibility': 'Peg Perego John Deere, Case IH, Gator XUV',
      'Installation Time': '30-45 minutes',
      'Difficulty': 'Moderate',
      'Processing Time': '1-2 weeks (made to order)'
    },
    inStock: true,
    images: [],
    model3D: '/models/front-axle-adapter.stl',
    thumbnail: '/images/thumbnails/front-axle-adapter.jpg',
    freeShipping: true
  },
  {
    id: 'gator-xuv-heavy-duty-wheel-kit',
    name: 'Gator XUV Peg Perego Heavy-Duty Wheel Upgrade Kit – Rubber Tires & Steel Wheels',
    slug: 'gator-xuv-heavy-duty-wheel-kit',
    category: 'wheels',
    price: 212.50,
    originalPrice: 250.00,
    discount: 15,
    description: 'Heavy-Duty Kit: Includes two 10″ front and two 13″ rear pneumatic rubber tires pre-mounted on solid steel wheels for the Peg Perego Gator XUV. Rugged ABS-GF Adapters & Hardware: Precision-printed adapters with glass‑fiber reinforced ABS and all bolts, nuts, and washers needed for a seamless installation.',
    features: [
      'Heavy-duty steel wheels with pneumatic rubber tires',
      'Superior traction & durability on grass, dirt, gravel, and pavement',
      'Precision ABS-GF adapters with all hardware included',
      'Direct replacement for Peg Perego Gator XUV',
      'Smoother, quieter ride vs stock plastic wheels',
      'Made in Missouri',
      'Free shipping'
    ],
    specifications: {
      'Front Tire Size': '10 inches',
      'Rear Tire Size': '13 inches',
      'Wheel Material': 'Steel',
      'Tire Material': 'Pneumatic rubber',
      'Compatibility': 'Peg Perego John Deere Gator XUV',
      'Installation Time': '45-60 minutes',
      'Difficulty': 'Moderate',
      'Processing Time': '5-7 business days'
    },
    inStock: true,
    images: [],
    freeShipping: true
  },
  {
    id: 'dewalt-battery-adapter-plate',
    name: 'Drop-In ABS Plate with DeWalt Battery Adapter + Peg Perego Connector | Low Voltage Cutoff + Fuse | Ride-On Toy Upgrade',
    slug: 'dewalt-battery-adapter-plate',
    category: 'battery',
    price: 38.24,
    originalPrice: 44.99,
    discount: 15,
    description: 'Drop-in ABS plate with DeWalt battery adapter and Peg Perego connector, complete with low voltage cutoff and built-in fuse for safety. Transform your ride-on to run on DeWalt 20V power tool batteries.',
    features: [
      '3D printed ABS mounting plate (drop-in fit)',
      'DeWalt 20V battery adapter with integrated low voltage cutoff',
      'Peg Perego connector prewired',
      'Inline fuse (30A–40A) for safety',
      'Heavy-duty silicone wiring',
      'No modifications required',
      'Free shipping'
    ],
    specifications: {
      'Material': 'ABS (3D printed)',
      'Battery Compatibility': 'DeWalt 20V MAX',
      'Protection': 'Low voltage cutoff + inline fuse',
      'Connector': 'Peg Perego standard',
      'Fuse Rating': '30A-40A',
      'Installation Time': '15-20 minutes',
      'Difficulty': 'Easy',
      'Status': 'In final development - Coming Soon late 2025'
    },
    inStock: true,
    preOrder: false,
    images: [],
    freeShipping: true
  },
  {
    id: '7r-adapter-kit-no-wheels',
    name: 'Peg Perego / Power Wheels 7R Adapter Kit – 3-Bolt 145/70-6 Wheel Upgrade (No Wheels)',
    slug: '7r-adapter-kit-no-wheels',
    category: 'adapters',
    price: 59.49,
    originalPrice: 69.99,
    discount: 15,
    description: 'Transform your ride-on tractor with this heavy-duty 7R adapter kit. This kit lets you mount real 145/70-6 tubeless ATV tires (3-bolt pattern) onto your Peg Perego or Power Wheels ride-on for unbeatable traction and durability. Built from glass-filled ABS (ABS-GF) and supplied with grade 8.8 hardware.',
    features: [
      '4× ABS-GF adapters (front & rear)',
      '10× M8×40 mm bolts + 8× M8×25 mm bolts',
      '36× washers + 18× locknuts',
      'Installation guide with torque specs',
      'Fits 145/70-6 tubeless tires (6″ rim, 3-bolt pattern)',
      'Supports 160 lb per tire (4-ply rated) at 10 PSI',
      'Designed and made in Missouri',
      'Free shipping'
    ],
    specifications: {
      'Bolt Pattern': '3-bolt, 78 mm spacing',
      'Center Bore': '54 mm (2.1")',
      'Material': 'ABS-GF (Glass-filled)',
      'Hardware Grade': '8.8',
      'Tire Compatibility': '145/70-6 tubeless',
      'Compatibility': 'Peg Perego 7R gearbox: John Deere Gator, Ground Force, Case IH, Power Wheels',
      'Load Rating': '160 lb per tire',
      'Wheels Included': 'No (adapters only)',
      'Installation Time': '30 minutes',
      'Difficulty': 'Moderate'
    },
    inStock: true,
    images: [],
    freeShipping: true
  },
  {
    id: '7r-wheel-kit-complete',
    name: 'Peg Perego / Power Wheels 7R Wheel Kit – 145/70-6 3-Bolt ATV Tires + ABS-GF Adapters',
    slug: '7r-wheel-kit-complete',
    category: 'wheels',
    price: 212.50,
    originalPrice: 250.00,
    discount: 15,
    description: 'Upgrade your Peg Perego or Power Wheels ride‑on with this complete heavy‑duty wheel kit. It includes four 145/70‑6 tubeless ATV tires on 6″ rims, our precision‑made ABS‑GF adapters, and all the hardware you need. The 3‑bolt 78 mm pattern and 2.1″ center bore mean it\'s truly plug‑and‑play: no drilling, cutting, or guesswork — just bolt on and ride.',
    features: [
      'Four 145/70‑6 tubeless ATV tires on 6″ steel rims',
      '4‑ply nylon construction, 3‑bolt 78 mm pattern',
      'Reinforced ABS‑GF adapters engineered for strength',
      'Grade 8.8 hardware: 10× M8×40 mm bolts, 8× M8×25 mm bolts, 36 washers, 18 nyloc nuts',
      'Printed installation guide with torque specs (20 ft‑lb)',
      'Perfect for lawn, gravel, and backyard trails',
      'Free shipping'
    ],
    specifications: {
      'Tire Size': '145/70-6 (14.7" tall × 5.5" wide)',
      'Rim Size': '6 inches',
      'Bolt Pattern': '3-bolt ATV standard, 78 mm spacing',
      'Center Bore': '2.1 inches (54 mm)',
      'Construction': '4-ply nylon',
      'Load Rating': '160 lb per wheel',
      'Operating Pressure': '10 PSI (24 PSI to seat beads)',
      'Quantity': '4 wheels + 4 adapters',
      'Compatibility': 'Peg Perego Gator, John Deere Ground Force, Case IH, Power Wheels 7R hubs',
      'Installation Time': '45-60 minutes',
      'Difficulty': 'Moderate'
    },
    inStock: true,
    images: [],
    freeShipping: true
  },
  {
    id: 'gator-xuv-wheel-adapter-kit',
    name: 'Peg Perego Gator XUV Wheel Adapter Kit - Fits 10in and 13in Harbor Freight Wheels (No Tires)',
    slug: 'gator-xuv-wheel-adapter-kit',
    category: 'adapters',
    price: 59.49,
    originalPrice: 69.99,
    discount: 15,
    description: 'Give your Peg Perego Gator XUV the off-road traction it deserves. This heavy-duty adapter kit lets you bolt on real pneumatic wheels from Harbor Freight — no drilling, cutting, or guesswork.',
    features: [
      '4 glass-filled ABS-GF adapters: 2× front (for 10" wheels) and 2× rear (for 13" wheels)',
      'Mounting hardware: 10× M8×40 mm bolts, 8× M8×25 mm bolts, 36 washers, and 18 nylock nuts',
      'Step-by-step installation guide (PDF)',
      'Fits HAUL-MASTER 10" and 13" pneumatic wheels from Harbor Freight',
      '4-bolt front / 5-bolt rear pattern',
      'Works with 10 PSI operating pressure',
      'Proudly designed and 3D-printed in Missouri',
      'Free shipping'
    ],
    specifications: {
      'Wheel Compatibility': 'Harbor Freight HAUL-MASTER 10" & 13"',
      'Axle Bore': '5/8 inch',
      'Front Bolt Spacing': '3.1 inches (4-bolt)',
      'Rear Bolt Spacing': '3.5 inches (5-bolt)',
      'Vehicle Compatibility': 'Peg Perego Gator XUV (12V & 24V), John Deere Gator, 7R-series',
      'Material': 'ABS-GF (Glass-filled)',
      'Wheels Included': 'No (adapters only)',
      'Installation Time': '30 minutes',
      'Difficulty': 'Moderate'
    },
    inStock: true,
    images: [],
    freeShipping: true
  },
  {
    id: '4x13-wheel-kit',
    name: 'Peg Perego 4×13in Wheel Kit – Complete Haul Master Tires + ABS‑GF Adapters',
    slug: '4x13-wheel-kit',
    category: 'wheels',
    price: 144.49,
    originalPrice: 169.99,
    discount: 15,
    description: 'Give your Peg Perego ride‑on tractor unstoppable grip with our complete 13″ wheel kit. This all‑in package includes four Haul Master 13″ pneumatic tires on 6″ steel rims, reinforced ABS‑GF adapters, and all the hardware you need for a direct bolt‑on install.',
    features: [
      'Four 13″ knobby all‑terrain tires (Haul Master, SKUs 67467/63517)',
      'Mounted on black steel 6" hubs',
      'Reinforced glass‑filled ABS‑GF adapters',
      'Complete hardware: 10× M8×40 bolts, 8× M8×25 bolts, 36 washers, 18 lock nuts',
      'Installation instructions included',
      'Ready for heavy‑duty traction on any terrain',
      'Free shipping'
    ],
    specifications: {
      'Tire Size': '13 inches',
      'Rim Size': '6 inches',
      'Bolt Pattern': '5-bolt',
      'Axle Bore': '5/8 inch',
      'Working Load': '300 lb',
      'Working Pressure': '30 PSI',
      'Quantity': '4 wheels + 4 adapters',
      'Tire Brand': 'Haul Master (Harbor Freight)',
      'Compatibility': 'Peg Perego Gator, John Deere Ground Force, Case IH, 7R ride-ons',
      'Installation Time': '45 minutes',
      'Difficulty': 'Moderate'
    },
    inStock: true,
    images: [],
    freeShipping: true
  },
  {
    id: '13-inch-steel-wheel-kit',
    name: 'Peg Perego 13" Front & Rear Wheel Upgrade Kit - Heavy-Duty Steel Wheels with ABS-GF Adapters (Set of 4)',
    slug: '13-inch-steel-wheel-kit',
    category: 'wheels',
    price: 254.99,
    originalPrice: 299.99,
    discount: 15,
    description: 'Upgrade your ride-on with this heavy-duty 13" wheel set! Each kit includes four ATV-style 145/70-6 tubeless tires on steel rims, custom ABS-GF (glass-filled) adapters, and all the hardware for a direct bolt-on install. These 4-ply tires measure about 14.7" tall x 5.5" wide and have a 360-lb load rating.',
    features: [
      'Four 13" ATV-style 145/70-6 tubeless tires',
      'Mounted on steel rims',
      'Custom printed ABS-GF adapters',
      'Complete hardware kit: nuts, bolts, washers',
      'Installation instructions included',
      '3-bolt 78 mm pattern, 54 mm center bore',
      'Built-to-order in Missouri garage',
      'Free U.S. shipping'
    ],
    specifications: {
      'Tire Size': '145/70-6 (14.7" tall × 5.5" wide)',
      'Wheel Material': 'Steel',
      'Tire Construction': '4-ply',
      'Load Rating': '360 lbs total (90 lb per wheel)',
      'Bolt Pattern': '3-bolt, 78 mm spacing',
      'Center Bore': '54 mm',
      'Quantity': '4 wheels + 4 adapters',
      'Compatibility': 'Peg Perego vehicles requiring four 13" front & rear wheels',
      'Installation Time': '60 minutes',
      'Difficulty': 'Moderate',
      'Processing Time': '1-2 weeks (built to order)'
    },
    inStock: true,
    images: [],
    freeShipping: true
  },
  // Note: Razors-Edge products moved to separate catalog (razors-edge-products.js)
  // The original basic listing is replaced with the comprehensive product catalog
  ...razorsEdgeProducts
]

export function getProductBySlug(slug) {
  return products.find(product => product.slug === slug)
}

export function getProductsByCategory(category) {
  if (!category) return products
  return products.filter(product => product.category === category)
}

export function getAllCategories() {
  return [...new Set(products.map(p => p.category))]
}
