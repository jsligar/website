// Razors-Edge Electronic Transmission System - Complete Product Catalog
// This file contains all Razors-Edge products, modules, components, and accessories

export const razorsEdgeProducts = [
  // ============================================================================
  // COMPLETE SYSTEMS & BUNDLES
  // ============================================================================

  {
    id: 'razors-edge-complete',
    sku: 'RE-SYS-COMPLETE-001',
    name: 'Razors-Edge Complete Electronic Transmission System',
    slug: 'razors-edge-complete',
    category: 'electronics',
    subcategory: 'complete-systems',
    price: 599.99,
    originalPrice: 680.91,
    discount: 12,
    description: 'Transform your ride-on into an advanced electric vehicle with our complete 6-speed electronic transmission system. Includes all 8 modules fully assembled and tested: Core Control, Dual Motor Control, Power Management, Display & UI, GPS Telemetry, Safety Systems, Professional Wiring Harness, and Weatherproof Enclosure. Battery sold separately.',
    features: [
      '6-Speed Electronic Transmission (Park, 1st, 2nd, 3rd, Eco, Sport+)',
      'Dual independent motor control with Cytron MDD20A drivers',
      'GPS geofencing and speed limiting capabilities',
      'WiFi remote monitoring and real-time telemetry',
      '60V Li-ion power system ready (battery sold separately)',
      'Multi-layer safety features with emergency stop',
      '128×64 OLED display with rotary encoder interface',
      'Triple INA228 current monitoring with 0.001Ω shunts',
      'Overcurrent, low voltage, and motor stall protection',
      'Wireless remote kill switch included',
      'Weatherproof IP65 enclosure with mounting hardware',
      'Pre-assembled and burn-in tested for 24 hours',
      'Free shipping within USA'
    ],
    specifications: {
      'System Voltage': '60V Li-ion (battery not included)',
      'Microcontroller': 'ESP32 Dual-Core (240MHz)',
      'Motor Control': '2× Cytron MDD20A drivers (40A continuous, 80A peak)',
      'Current Monitoring': '3× INA228 sensors with 0.001Ω shunts',
      'Display': '128×64 OLED with rotary encoder',
      'Connectivity': 'WiFi 802.11 b/g/n',
      'GPS': 'NEO-7M module with active antenna',
      'Safety Features': 'E-stop, tilt sensors, remote kill switch, parking brake sensor',
      'Enclosure Rating': 'IP65 weatherproof',
      'Operating Temperature': '-20°C to 60°C',
      'Dimensions': '200mm × 120mm × 75mm',
      'Weight': '2.8 kg (6.2 lbs)',
      'Installation Time': '4-6 hours',
      'Difficulty': 'Advanced (Qualified individuals only)',
      'Warranty': '1 year limited'
    },
    inStock: false,
    preOrder: true,
    availableDate: 'Early 2026',
    images: ['/images/products/razors-edge-complete-1.jpg'],
    freeShipping: true,
    requiresDisclaimer: true,
    disclaimerText: 'WARNING: This system operates at 60V with Li-ion batteries. Installation and operation require electrical and mechanical expertise. Only qualified individuals should attempt this project. Improper installation or use can result in serious injury or death. By purchasing, you acknowledge all risks and assume full responsibility.'
  },

  {
    id: 'razors-edge-diy-kit',
    sku: 'RE-SYS-DIY-001',
    name: 'Razors-Edge DIY Kit - Complete Component Package',
    slug: 'razors-edge-diy-kit',
    category: 'electronics',
    subcategory: 'diy-kits',
    price: 499.99,
    originalPrice: 599.99,
    discount: 17,
    description: 'Build your own Razors-Edge system! This complete DIY kit includes every component, PCB, connector, and wire needed to assemble a professional-grade 6-speed electronic transmission. Perfect for makers, hobbyists, and electronics enthusiasts. Includes detailed assembly instructions, wiring diagrams, and access to our online build community.',
    features: [
      'All components for complete Razors-Edge system',
      'Custom PCBs (qty 6) - professionally manufactured',
      'ESP32 microcontroller pre-programmed with latest firmware',
      '2× Cytron MDD20A motor drivers',
      '3× INA228 current sensors with precision shunts',
      'GPS module with antenna and mounting',
      'OLED display and rotary encoder',
      'Complete wiring harness materials (pre-cut to length)',
      'All connectors, terminals, and hardware',
      'Weatherproof enclosure with mounting plate',
      'Detailed assembly manual (100+ pages, full color)',
      'Access to video assembly tutorials',
      'Online community support and troubleshooting',
      'Free shipping'
    ],
    specifications: {
      'Assembly Time': '8-12 hours',
      'Skill Level': 'Intermediate to Advanced',
      'Tools Required': 'Soldering iron, multimeter, wire strippers, screwdrivers',
      'Documentation': 'Printed manual + PDF schematics + video tutorials',
      'All Components Included': 'Yes (except battery)',
      'Firmware': 'Pre-loaded on ESP32',
      'Technical Support': '90 days email support included',
      'Warranty': '1 year on components (not assembly)'
    },
    inStock: false,
    preOrder: true,
    availableDate: 'Early 2026',
    images: ['/images/products/razors-edge-diy-kit-1.jpg'],
    freeShipping: true,
    requiresDisclaimer: true,
    disclaimerText: 'DIY Assembly Warning: This kit requires soldering, wiring, and electrical assembly skills. Improper assembly can result in component damage, fire hazard, or personal injury. 60V systems are dangerous. Only qualified individuals should attempt this build.'
  },

  {
    id: 'razors-edge-battery-bundle',
    sku: 'RE-SYS-BUNDLE-001',
    name: 'Razors-Edge Complete System + 60V Battery Bundle',
    slug: 'razors-edge-battery-bundle',
    category: 'electronics',
    subcategory: 'complete-systems',
    price: 899.99,
    originalPrice: 949.98,
    discount: 5,
    description: 'The ultimate plug-and-play solution! Complete Razors-Edge system with professional 60V 20Ah Li-ion battery pack, smart BMS, and battery management components. Everything you need for a high-performance electric vehicle conversion in one package.',
    features: [
      'Complete Razors-Edge transmission system (fully assembled)',
      '60V 20Ah Li-ion battery pack with Samsung/Sanyo cells',
      'Smart Battery Management System (BMS) - 50A continuous',
      'Battery level gauge with LED indicators',
      'Ventilated battery enclosure (fire-resistant)',
      'All power cables and XT90 connectors',
      'Pre-configured and tested as complete system',
      'Extended 18-month warranty on complete system',
      'Priority installation support',
      'Free shipping (insured, signature required)'
    ],
    specifications: {
      'Battery Capacity': '20Ah (1200Wh)',
      'Battery Voltage': '60V nominal (50.4V-67.2V range)',
      'Battery Chemistry': 'Li-ion (Samsung 21700 or Sanyo 18650)',
      'BMS Rating': '50A continuous, 100A peak (3 seconds)',
      'Charge Time': '4-6 hours (2A charger included)',
      'Estimated Runtime': '2-4 hours (depending on load)',
      'Battery Weight': '6.5 kg (14.3 lbs)',
      'Total System Weight': '9.3 kg (20.5 lbs)',
      'Battery Cycles': '800+ cycles to 80% capacity',
      'Safety Certifications': 'UN38.3, IEC62133 (battery)',
      'Shipping Restrictions': 'Ground shipping only (hazmat)',
      'Installation Time': '4-6 hours',
      'Difficulty': 'Advanced'
    },
    inStock: false,
    preOrder: true,
    availableDate: 'Early 2026',
    images: ['/images/products/razors-edge-bundle-1.jpg'],
    freeShipping: true,
    requiresDisclaimer: true,
    disclaimerText: 'LITHIUM BATTERY WARNING: This bundle includes a high-capacity 60V Li-ion battery. Lithium batteries can cause fires or explosions if damaged, short-circuited, or improperly charged. Never puncture, crush, or expose to high temperatures. Use only the included charger. Keep away from children. By purchasing, you acknowledge understanding of lithium battery hazards and accept all risks.'
  },

  // ============================================================================
  // INDIVIDUAL MODULES
  // ============================================================================

  {
    id: 'razors-edge-core-control-module',
    sku: 'RE-CTRL-001',
    name: 'Razors-Edge Core Control Module - ESP32 Brain',
    slug: 'razors-edge-core-control-module',
    category: 'electronics',
    subcategory: 'modules',
    price: 89.99,
    originalPrice: null,
    discount: 0,
    description: 'The brain of the Razors-Edge system. This module features a dual-core ESP32 microcontroller on a custom PCB with power regulation, GPIO expansion, and WiFi connectivity. Pre-programmed with Razors-Edge firmware and ready to control your electric vehicle.',
    features: [
      'ESP32 dual-core microcontroller (240MHz)',
      'Custom PCB with power regulation and protection',
      'WiFi 802.11 b/g/n for telemetry and remote monitoring',
      'GPIO expansion headers for all system modules',
      'Pre-programmed with latest Razors-Edge firmware',
      'Firmware updates via WiFi OTA (Over-The-Air)',
      'USB programming interface',
      'Status LED indicators',
      'Compact form factor',
      'Free shipping'
    ],
    specifications: {
      'Microcontroller': 'ESP32-WROOM-32 (Dual-Core)',
      'Clock Speed': '240MHz',
      'Flash Memory': '4MB',
      'RAM': '520KB',
      'WiFi': '802.11 b/g/n',
      'GPIO Pins': '30+ available',
      'Operating Voltage': '3.3V (regulated from 5-12V input)',
      'Current Draw': '80mA typical, 240mA peak (WiFi active)',
      'Dimensions': '65mm × 45mm',
      'Firmware Version': 'v2.0 or later',
      'Update Method': 'WiFi OTA or USB'
    },
    inStock: false,
    preOrder: true,
    availableDate: 'Early 2026',
    images: ['/images/products/razors-edge-core-module-1.jpg'],
    freeShipping: true
  },

  {
    id: 'razors-edge-motor-control-module',
    sku: 'RE-MOTOR-001',
    name: 'Razors-Edge Dual Motor Control Module',
    slug: 'razors-edge-motor-control-module',
    category: 'electronics',
    subcategory: 'modules',
    price: 129.99,
    originalPrice: null,
    discount: 0,
    description: 'Professional dual-channel motor control with two Cytron MDD20A drivers on a custom interface PCB. Control two independent motors with PWM speed control, direction switching, and thermal protection. Includes heat sinks and all power connections.',
    features: [
      '2× Cytron MDD20A motor drivers',
      '40A continuous per channel (80A peak for 10 seconds)',
      'PWM frequency up to 20kHz',
      'Bi-directional motor control (forward/reverse)',
      'Thermal shutdown protection',
      'Short circuit and overcurrent protection',
      'Custom PCB interface with screw terminals',
      'Heat sinks with thermal paste included',
      'LED status indicators per channel',
      'Compatible with 6-60V motors',
      'Free shipping'
    ],
    specifications: {
      'Motor Driver': 'Cytron MDD20A (qty 2)',
      'Continuous Current': '40A per channel',
      'Peak Current': '80A per channel (10 seconds)',
      'Voltage Range': '6-30V (motor voltage)',
      'PWM Frequency': '1-20 kHz (adjustable)',
      'Control Input': '3.3V/5V logic compatible',
      'Efficiency': '95%+ at nominal load',
      'Thermal Protection': 'Yes, auto-shutdown at 85°C',
      'Dimensions': '95mm × 75mm × 35mm (with heat sinks)',
      'Weight': '285g',
      'Operating Temperature': '-20°C to 60°C'
    },
    inStock: false,
    preOrder: true,
    availableDate: 'Early 2026',
    images: ['/images/products/razors-edge-motor-module-1.jpg'],
    freeShipping: true
  },

  {
    id: 'razors-edge-power-management-module',
    sku: 'RE-POWER-001',
    name: 'Razors-Edge Power Management & Monitoring Module',
    slug: 'razors-edge-power-management-module',
    category: 'electronics',
    subcategory: 'modules',
    price: 109.99,
    originalPrice: null,
    discount: 0,
    description: 'Advanced power management with triple INA228 current sensors, low-voltage cutoff, emergency stop, and main power switching. Monitor battery current, motor currents, and system voltage in real-time with milliamp precision.',
    features: [
      '3× INA228 precision current sensors',
      '0.001Ω high-power shunt resistors',
      'Measures up to 80A per channel with 0.1A resolution',
      'Low voltage cutoff protection (configurable threshold)',
      '100A main power switch',
      'Emergency stop button (red, illuminated)',
      'Inline fuse protection (40A, 60A, 80A)',
      '60V to 5V buck converter (5A) for system power',
      'Voltage and current monitoring via I2C',
      'Real-time power consumption logging',
      'Free shipping'
    ],
    specifications: {
      'Current Sensors': '3× INA228 (16-bit ADC)',
      'Shunt Resistance': '0.001Ω (50W rating)',
      'Current Range': '±80A per channel',
      'Current Resolution': '0.1A',
      'Voltage Range': '0-85V',
      'Voltage Resolution': '0.1V',
      'LVC Threshold': 'Configurable 45-55V',
      'Main Switch Rating': '100A continuous',
      'Fuse Protection': 'ATC blade fuses (replaceable)',
      'Power Supply Output': '5V @ 5A (for system)',
      'Communication': 'I2C bus',
      'Dimensions': '110mm × 85mm × 40mm'
    },
    inStock: false,
    preOrder: true,
    availableDate: 'Early 2026',
    images: ['/images/products/razors-edge-power-module-1.jpg'],
    freeShipping: true
  },

  {
    id: 'razors-edge-display-module',
    sku: 'RE-DISPLAY-001',
    name: 'Razors-Edge Display & User Interface Module',
    slug: 'razors-edge-display-module',
    category: 'electronics',
    subcategory: 'modules',
    price: 49.99,
    originalPrice: null,
    discount: 0,
    description: 'High-contrast OLED display with rotary encoder for intuitive control. Shows real-time speed, battery level, current gear, power consumption, GPS status, and system diagnostics. Weather-resistant panel mount design.',
    features: [
      '128×64 OLED display (white on black, high contrast)',
      'Rotary encoder with push-button',
      'Metal knob with smooth rotation',
      'Real-time gear indicator',
      'Battery voltage and percentage',
      'Current draw and power (watts)',
      'GPS lock status and speed',
      'Customizable display layouts',
      'Panel mount bracket included',
      'Weather-resistant front panel',
      'Free shipping'
    ],
    specifications: {
      'Display Type': '128×64 OLED (SSD1306)',
      'Display Size': '0.96 inches diagonal',
      'Display Color': 'White on black',
      'Viewing Angle': '160° (all directions)',
      'Interface': 'I2C (2-wire)',
      'Encoder Type': 'Mechanical rotary with detents',
      'Encoder Resolution': '20 steps per revolution',
      'Button': 'Integrated push-button',
      'Panel Cutout': '25mm diameter',
      'Cable Length': '30cm (extendable)',
      'Dimensions': '45mm × 35mm × 25mm',
      'Operating Temperature': '-20°C to 70°C'
    },
    inStock: false,
    preOrder: true,
    availableDate: 'Early 2026',
    images: ['/images/products/razors-edge-display-module-1.jpg'],
    freeShipping: true
  },

  {
    id: 'razors-edge-gps-module',
    sku: 'RE-GPS-001',
    name: 'Razors-Edge GPS & Telemetry Module',
    slug: 'razors-edge-gps-module',
    category: 'electronics',
    subcategory: 'modules',
    price: 69.99,
    originalPrice: null,
    discount: 0,
    description: 'GPS geofencing and speed limiting module with active antenna. Set virtual boundaries to restrict driving areas and enforce maximum speeds. Track your rides with location logging and real-time telemetry.',
    features: [
      'NEO-7M GPS module with high sensitivity',
      'Active ceramic antenna (28dB gain)',
      'Geofencing with customizable boundaries',
      'Speed limiting (configurable max speed)',
      'Position accuracy to 2.5 meters',
      'Location logging and ride tracking',
      'Real-time telemetry via WiFi',
      'Magnetic antenna mount',
      'Weatherproof enclosure (IP65)',
      '3-meter antenna extension cable',
      'Free shipping'
    ],
    specifications: {
      'GPS Chipset': 'u-blox NEO-7M',
      'Channels': '50 channels',
      'Position Accuracy': '2.5m CEP',
      'Velocity Accuracy': '0.1 m/s',
      'Time to First Fix': '27s (cold), 1s (hot)',
      'Update Rate': '5Hz (configurable)',
      'Antenna Type': 'Active ceramic, 28dB gain',
      'Antenna Cable': '3m with IPEX connector',
      'Interface': 'UART (9600-115200 baud)',
      'Geofencing': 'Up to 4 boundaries',
      'Speed Limit': '0-50 km/h (configurable)',
      'Operating Voltage': '3.3V',
      'Dimensions': '70mm × 55mm × 25mm'
    },
    inStock: false,
    preOrder: true,
    availableDate: 'Early 2026',
    images: ['/images/products/razors-edge-gps-module-1.jpg'],
    freeShipping: true
  },

  {
    id: 'razors-edge-safety-module',
    sku: 'RE-SAFETY-001',
    name: 'Razors-Edge Safety & Emergency Systems Module',
    slug: 'razors-edge-safety-module',
    category: 'electronics',
    subcategory: 'modules',
    price: 79.99,
    originalPrice: null,
    discount: 0,
    description: 'Multi-layer safety system with wireless remote kill switch, tilt sensors, parking brake detection, and visual/audio alerts. Essential protection for high-power electric vehicles.',
    features: [
      'Wireless remote kill switch (433MHz, 100m range)',
      'Dual tilt sensors for rollover detection',
      'Reed switch for parking brake sensor',
      'Piezo buzzer for audible warnings',
      '4× LED indicator lights (red/green)',
      '4-channel relay module for safety interlocks',
      'Parking brake enforcement (Park mode only when engaged)',
      'Tilt detection with automatic shutdown',
      'Remote emergency stop from key fob',
      'Visual and audio fault indicators',
      'Free shipping'
    ],
    specifications: {
      'Remote Range': '100 meters (open field)',
      'Remote Frequency': '433MHz',
      'Remote Battery': 'CR2032 (included)',
      'Tilt Sensitivity': '±30° from level',
      'Tilt Response Time': '<100ms',
      'Relay Rating': '10A @ 250VAC per channel',
      'Buzzer Type': 'Piezo (85dB @ 10cm)',
      'LED Indicators': '12mm panel mount',
      'Operating Voltage': '5V (regulated)',
      'Current Draw': '150mA maximum',
      'Dimensions': '85mm × 70mm × 30mm',
      'Operating Temperature': '-20°C to 60°C'
    },
    inStock: false,
    preOrder: true,
    availableDate: 'Early 2026',
    images: ['/images/products/razors-edge-safety-module-1.jpg'],
    freeShipping: true
  },

  // ============================================================================
  // COMPONENT KITS & ACCESSORIES
  // ============================================================================

  {
    id: 'razors-edge-wiring-kit',
    sku: 'RE-WIRE-001',
    name: 'Razors-Edge Professional Wiring & Connectors Kit',
    slug: 'razors-edge-wiring-kit',
    category: 'electronics',
    subcategory: 'accessories',
    price: 59.99,
    originalPrice: null,
    discount: 0,
    description: 'Professional-grade wiring harness kit with high-current silicone wire, premium connectors, and complete installation hardware. Everything you need to wire your Razors-Edge system safely and cleanly.',
    features: [
      '10AWG silicone wire (10ft red, 10ft black)',
      '18AWG silicone wire assortment (30ft, multiple colors)',
      'XT90 high-current connectors (5 pairs)',
      'Anderson Powerpole connectors (45A, 10 sets)',
      'JST-XH connector assortment',
      'Heat shrink tubing (assorted sizes)',
      'UV-resistant cable ties (100pcs)',
      'Wire labels and markers',
      'Professional crimping required',
      'Installation guide included',
      'Free shipping'
    ],
    specifications: {
      'Main Power Wire': '10AWG silicone (40A continuous, 60A peak)',
      'Signal Wire': '18AWG silicone (16A rating)',
      'Wire Temperature Rating': '-60°C to 200°C',
      'XT90 Rating': '90A continuous',
      'Powerpole Rating': '45A continuous',
      'Heat Shrink Ratio': '2:1 and 3:1',
      'Cable Tie Rating': 'UV resistant, 50lb tensile',
      'Total Wire Length': '20ft (10AWG) + 30ft (18AWG)',
      'Color Options': 'Red, Black, Yellow, White, Blue, Green',
      'Tools Required': 'Wire strippers, crimpers, heat gun'
    },
    inStock: true,
    preOrder: false,
    images: ['/images/products/razors-edge-wiring-kit-1.jpg'],
    freeShipping: true
  },

  {
    id: 'razors-edge-enclosure-kit',
    sku: 'RE-ENCL-001',
    name: 'Razors-Edge Weatherproof Enclosure & Mounting Kit',
    slug: 'razors-edge-enclosure-kit',
    category: 'electronics',
    subcategory: 'accessories',
    price: 89.99,
    originalPrice: null,
    discount: 0,
    description: 'Professional IP65-rated weatherproof enclosure with custom aluminum mounting plate, PCB standoffs, cable glands, and vibration dampening. Protect your electronics from water, dust, and impacts.',
    features: [
      'IP65 weatherproof ABS enclosure (200×120×75mm)',
      'Custom aluminum mounting plate (pre-drilled)',
      'PCB standoffs (M3 brass, 10mm height, qty 20)',
      'IP68 cable glands (PG9, qty 8)',
      'Gore-Tex ventilation membranes (qty 2)',
      'Stainless steel L-brackets for mounting',
      'Vibration dampening pads',
      'M4 stainless steel mounting hardware kit',
      'Clear lid for visual inspection',
      'UV-resistant material',
      'Free shipping'
    ],
    specifications: {
      'Enclosure Material': 'ABS (UV-stabilized)',
      'Protection Rating': 'IP65 (dust-tight, water-resistant)',
      'External Dimensions': '200mm × 120mm × 75mm',
      'Internal Dimensions': '185mm × 110mm × 65mm',
      'Mounting Plate': 'Aluminum 3mm thick',
      'Cable Glands': 'PG9 (4-8mm cable diameter)',
      'Vent Membranes': 'M12 threaded, breathable',
      'Mounting Brackets': '304 stainless steel',
      'Weight': '680g (enclosure + hardware)',
      'Operating Temperature': '-40°C to 80°C',
      'Color': 'Gray with clear lid'
    },
    inStock: true,
    preOrder: false,
    images: ['/images/products/razors-edge-enclosure-kit-1.jpg'],
    freeShipping: true
  },

  {
    id: 'razors-edge-pcb-set',
    sku: 'RE-PCB-SET',
    name: 'Razors-Edge Complete Custom PCB Set (6 Boards)',
    slug: 'razors-edge-pcb-set',
    category: 'electronics',
    subcategory: 'replacement-parts',
    price: 89.99,
    originalPrice: 112.94,
    discount: 20,
    description: 'Complete set of all 6 custom-designed Razors-Edge PCBs. Perfect for DIY builders, repairs, or upgrades. Professionally manufactured with ENIG finish and silkscreen labels.',
    features: [
      'Main Controller PCB (RE-PCB-MAIN-V1)',
      'Motor Interface PCB (RE-PCB-MOTOR-V1)',
      'Power Monitor PCB (RE-PCB-PWR-V1)',
      'Display Interface PCB (RE-PCB-DISP-V1)',
      'GPS Interface PCB (RE-PCB-GPS-V1)',
      'Safety Interface PCB (RE-PCB-SAFETY-V1)',
      'Professional JLCPCB manufacturing',
      'ENIG (gold) surface finish',
      'Clear silkscreen component labels',
      'Electrical testing completed',
      'Free shipping'
    ],
    specifications: {
      'Manufacturer': 'JLCPCB',
      'PCB Material': 'FR-4 (TG 135-155)',
      'Copper Weight': '2oz (70μm)',
      'Surface Finish': 'ENIG (Electroless Nickel Immersion Gold)',
      'Silkscreen': 'White on green solder mask',
      'Board Thickness': '1.6mm',
      'Min Track/Space': '0.2mm / 0.2mm',
      'Min Hole Size': '0.3mm',
      'Quantity': '6 boards (1 of each type)',
      'Design Version': 'v1.0',
      'Design Files': 'Available on GitHub (open source)'
    },
    inStock: false,
    preOrder: true,
    availableDate: 'Early 2026',
    images: ['/images/products/razors-edge-pcb-set-1.jpg'],
    freeShipping: true
  },

  {
    id: 'razors-edge-battery-60v',
    sku: 'RE-BATT-60V-001',
    name: 'Razors-Edge 60V 20Ah Li-ion Battery Pack with BMS',
    slug: 'razors-edge-battery-60v',
    category: 'battery',
    subcategory: 'lithium-batteries',
    price: 349.99,
    originalPrice: null,
    discount: 0,
    description: 'Professional-grade 60V 20Ah lithium-ion battery pack with integrated smart BMS, battery gauge, and ventilated fire-resistant enclosure. Samsung/Sanyo cells rated for 800+ cycles. Includes 2A charger with balance charging.',
    features: [
      '60V 20Ah capacity (1200Wh total energy)',
      'Samsung 21700 or Sanyo 18650 cells (Grade A)',
      'Smart BMS (50A continuous, 100A peak)',
      'Battery level gauge with 10-segment LED display',
      'Ventilated fire-resistant enclosure',
      'Built-in cell balancing',
      'Overcharge and overdischarge protection',
      'Short circuit and overcurrent protection',
      'Temperature monitoring and thermal cutoff',
      '2A smart charger included',
      'XT90 high-current connector',
      'Carry handle for portability',
      'Free shipping (ground only, hazmat)'
    ],
    specifications: {
      'Nominal Voltage': '60V (16S configuration)',
      'Voltage Range': '50.4V (empty) to 67.2V (full)',
      'Capacity': '20Ah (1200Wh)',
      'Cell Type': 'Li-ion (Samsung 21700/Sanyo 18650)',
      'BMS Rating': '50A continuous, 100A peak (3s)',
      'Charge Current': '2A standard (4A fast charge capable)',
      'Charge Time': '4-6 hours (2A), 2-3 hours (4A)',
      'Cycle Life': '800+ cycles to 80% capacity',
      'Self-Discharge': '<3% per month',
      'Operating Temperature': 'Discharge: -20°C to 60°C, Charge: 0°C to 45°C',
      'Storage Temperature': '-20°C to 25°C (recommended)',
      'Dimensions': '280mm × 180mm × 100mm',
      'Weight': '6.5 kg (14.3 lbs)',
      'Certifications': 'UN38.3, IEC62133',
      'Warranty': '1 year'
    },
    inStock: false,
    preOrder: true,
    availableDate: 'Early 2026',
    images: ['/images/products/razors-edge-battery-60v-1.jpg'],
    freeShipping: true,
    requiresDisclaimer: true,
    disclaimerText: 'LITHIUM BATTERY HAZARD: This high-capacity lithium battery can cause severe burns, fires, or explosions if mishandled. Never puncture, crush, short-circuit, or expose to temperatures above 60°C. Use only the provided charger. Store in cool, dry location away from flammable materials. Ships ground only (Class 9 Hazmat). Additional hazmat fees may apply.'
  },

  // ============================================================================
  // REPLACEMENT COMPONENTS & SPARE PARTS
  // ============================================================================

  {
    id: 'razors-edge-esp32-replacement',
    sku: 'RE-COMP-ESP32',
    name: 'Razors-Edge ESP32 Replacement Module (Pre-Programmed)',
    slug: 'razors-edge-esp32-replacement',
    category: 'electronics',
    subcategory: 'replacement-parts',
    price: 14.99,
    originalPrice: null,
    discount: 0,
    description: 'Replacement ESP32 DevKit board pre-programmed with latest Razors-Edge firmware. Drop-in replacement for damaged or failed controller.',
    features: [
      'ESP32-WROOM-32 dual-core',
      'Pre-programmed with latest firmware',
      'Tested and verified',
      'Drop-in replacement',
      'Free shipping'
    ],
    specifications: {
      'Part': 'ESP32 DevKit V1',
      'Firmware': 'Razors-Edge v2.0+',
      'Flash': '4MB',
      'RAM': '520KB'
    },
    inStock: true,
    preOrder: false,
    images: ['/images/products/razors-edge-esp32-1.jpg'],
    freeShipping: true
  },

  {
    id: 'razors-edge-motor-driver-replacement',
    sku: 'RE-COMP-MDD20A',
    name: 'Cytron MDD20A Motor Driver Replacement',
    slug: 'razors-edge-motor-driver-replacement',
    category: 'electronics',
    subcategory: 'replacement-parts',
    price: 34.99,
    originalPrice: null,
    discount: 0,
    description: 'Genuine Cytron MDD20A motor driver. Replacement for Motor Control Module (one driver).',
    features: [
      'Genuine Cytron MDD20A',
      '40A continuous, 80A peak',
      'Thermal protection',
      'Tested',
      'Free shipping'
    ],
    specifications: {
      'Model': 'Cytron MDD20A',
      'Current': '40A continuous',
      'Voltage': '6-30V'
    },
    inStock: true,
    preOrder: false,
    images: ['/images/products/razors-edge-mdd20a-1.jpg'],
    freeShipping: true
  },

  {
    id: 'razors-edge-current-sensor-replacement',
    sku: 'RE-COMP-INA228',
    name: 'INA228 Current Sensor Replacement Module',
    slug: 'razors-edge-current-sensor-replacement',
    category: 'electronics',
    subcategory: 'replacement-parts',
    price: 12.99,
    originalPrice: null,
    discount: 0,
    description: 'INA228 precision current sensor on breakout board. Replacement for Power Management Module.',
    features: [
      'INA228 16-bit ADC',
      'Breakout board',
      'Tested and calibrated',
      'Free shipping'
    ],
    specifications: {
      'IC': 'INA228AIDGSR',
      'Range': '±80A',
      'Resolution': '16-bit',
      'Interface': 'I2C'
    },
    inStock: true,
    preOrder: false,
    images: ['/images/products/razors-edge-ina228-1.jpg'],
    freeShipping: true
  },

  {
    id: 'razors-edge-gps-replacement',
    sku: 'RE-COMP-GPS',
    name: 'NEO-7M GPS Module with Antenna Replacement',
    slug: 'razors-edge-gps-replacement',
    category: 'electronics',
    subcategory: 'replacement-parts',
    price: 29.99,
    originalPrice: null,
    discount: 0,
    description: 'Complete GPS replacement with NEO-7M module and active ceramic antenna.',
    features: [
      'NEO-7M GPS module',
      'Active ceramic antenna (28dB)',
      'Tested',
      'Free shipping'
    ],
    specifications: {
      'Module': 'u-blox NEO-7M',
      'Antenna': 'Active ceramic',
      'Accuracy': '2.5m'
    },
    inStock: true,
    preOrder: false,
    images: ['/images/products/razors-edge-gps-replacement-1.jpg'],
    freeShipping: true
  },

  {
    id: 'razors-edge-oled-display-replacement',
    sku: 'RE-COMP-OLED',
    name: '128x64 OLED Display Replacement',
    slug: 'razors-edge-oled-display-replacement',
    category: 'electronics',
    subcategory: 'replacement-parts',
    price: 19.99,
    originalPrice: null,
    discount: 0,
    description: 'Replacement OLED display for Display & UI Module.',
    features: [
      '128x64 OLED (SSD1306)',
      'I2C interface',
      'White on black',
      'Tested',
      'Free shipping'
    ],
    specifications: {
      'Size': '0.96 inch',
      'Resolution': '128x64',
      'Color': 'White',
      'Interface': 'I2C'
    },
    inStock: true,
    preOrder: false,
    images: ['/images/products/razors-edge-oled-1.jpg'],
    freeShipping: true
  },

  {
    id: 'razors-edge-rotary-encoder-replacement',
    sku: 'RE-COMP-ENCODER',
    name: 'Rotary Encoder with Knob Replacement',
    slug: 'razors-edge-rotary-encoder-replacement',
    category: 'electronics',
    subcategory: 'replacement-parts',
    price: 12.99,
    originalPrice: null,
    discount: 0,
    description: 'Rotary encoder with metal knob for Display & UI Module.',
    features: [
      'Mechanical rotary encoder',
      'Push button integrated',
      'Metal knob',
      'Free shipping'
    ],
    specifications: {
      'Type': 'EC11',
      'Steps': '20 per revolution',
      'Button': 'Integrated'
    },
    inStock: true,
    preOrder: false,
    images: ['/images/products/razors-edge-encoder-1.jpg'],
    freeShipping: true
  },

  {
    id: 'razors-edge-remote-kill-switch-replacement',
    sku: 'RE-COMP-REMOTE',
    name: 'Wireless Remote Kill Switch Replacement',
    slug: 'razors-edge-remote-kill-switch-replacement',
    category: 'electronics',
    subcategory: 'replacement-parts',
    price: 24.99,
    originalPrice: null,
    discount: 0,
    description: 'Replacement wireless remote kill switch for Safety Module.',
    features: [
      '433MHz remote',
      '100m range',
      'Battery included',
      'Tested',
      'Free shipping'
    ],
    specifications: {
      'Frequency': '433MHz',
      'Range': '100 meters',
      'Battery': 'CR2032'
    },
    inStock: true,
    preOrder: false,
    images: ['/images/products/razors-edge-remote-1.jpg'],
    freeShipping: true
  },

  {
    id: 'razors-edge-emergency-stop-button',
    sku: 'RE-COMP-ESTOP',
    name: 'Emergency Stop Button Replacement',
    slug: 'razors-edge-emergency-stop-button',
    category: 'electronics',
    subcategory: 'replacement-parts',
    price: 14.99,
    originalPrice: null,
    discount: 0,
    description: 'Replacement emergency stop button (red, illuminated).',
    features: [
      'Red illuminated button',
      '16mm panel mount',
      'Twist to release',
      'Free shipping'
    ],
    specifications: {
      'Type': 'E-stop',
      'Size': '16mm',
      'Color': 'Red'
    },
    inStock: true,
    preOrder: false,
    images: ['/images/products/razors-edge-estop-1.jpg'],
    freeShipping: true
  },

  // ============================================================================
  // DOCUMENTATION & SERVICES
  // ============================================================================

  {
    id: 'razors-edge-installation-manual-printed',
    sku: 'RE-DOC-PRINT',
    name: 'Razors-Edge Printed Installation Manual (Full Color)',
    slug: 'razors-edge-installation-manual',
    category: 'documentation',
    subcategory: 'manuals',
    price: 29.99,
    originalPrice: null,
    discount: 0,
    description: 'Professional printed installation manual with full-color photos, detailed wiring diagrams, troubleshooting guides, and step-by-step instructions. Spiral-bound, 100+ pages.',
    features: [
      '100+ pages, full color',
      'Step-by-step installation guide',
      'Detailed wiring diagrams',
      'Component identification',
      'Troubleshooting section',
      'Safety precautions',
      'Maintenance guide',
      'Spiral bound (lay-flat)',
      'Heavy-duty paper stock',
      'Free shipping'
    ],
    specifications: {
      'Pages': '100+',
      'Format': '8.5" × 11" landscape',
      'Binding': 'Spiral bound',
      'Printing': 'Full color',
      'Paper': '32lb premium'
    },
    inStock: true,
    preOrder: false,
    images: ['/images/products/razors-edge-manual-1.jpg'],
    freeShipping: true
  },

  {
    id: 'razors-edge-remote-support',
    sku: 'RE-SUP-INSTALL',
    name: 'Razors-Edge Remote Installation Support (2 Hours)',
    slug: 'razors-edge-remote-support',
    category: 'services',
    subcategory: 'support',
    price: 149.99,
    originalPrice: null,
    discount: 0,
    description: 'Live remote installation support via video call with a Razors-Edge expert. Get help with wiring, troubleshooting, configuration, and testing. Two hours of personalized assistance.',
    features: [
      '2 hours of live video support',
      'Screen sharing for configuration',
      'Real-time troubleshooting',
      'Wiring verification',
      'System testing guidance',
      'Configuration assistance',
      'Scheduled at your convenience',
      'Record session for reference',
      'Email follow-up included'
    ],
    specifications: {
      'Duration': '2 hours',
      'Format': 'Video call (Zoom/Teams)',
      'Scheduling': 'Flexible (7 days/week)',
      'Recording': 'Available upon request',
      'Follow-up': '7 days email support'
    },
    inStock: true,
    preOrder: false,
    images: ['/images/products/razors-edge-support-1.jpg'],
    freeShipping: false
  }
]

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getRazorsEdgeProductBySlug(slug) {
  return razorsEdgeProducts.find(product => product.slug === slug)
}

export function getRazorsEdgeProductBySKU(sku) {
  return razorsEdgeProducts.find(product => product.sku === sku)
}

export function getRazorsEdgeProductsBySubcategory(subcategory) {
  return razorsEdgeProducts.filter(product => product.subcategory === subcategory)
}

export function getRazorsEdgeCompleteSystems() {
  return razorsEdgeProducts.filter(p => p.subcategory === 'complete-systems')
}

export function getRazorsEdgeModules() {
  return razorsEdgeProducts.filter(p => p.subcategory === 'modules')
}

export function getRazorsEdgeReplacementParts() {
  return razorsEdgeProducts.filter(p => p.subcategory === 'replacement-parts')
}

export function getRazorsEdgeAccessories() {
  return razorsEdgeProducts.filter(p => p.subcategory === 'accessories')
}

// Product count summary
export const razorsEdgeProductSummary = {
  totalProducts: razorsEdgeProducts.length,
  completeSystems: razorsEdgeProducts.filter(p => p.subcategory === 'complete-systems').length,
  modules: razorsEdgeProducts.filter(p => p.subcategory === 'modules').length,
  diyKits: razorsEdgeProducts.filter(p => p.subcategory === 'diy-kits').length,
  accessories: razorsEdgeProducts.filter(p => p.subcategory === 'accessories').length,
  replacementParts: razorsEdgeProducts.filter(p => p.subcategory === 'replacement-parts').length,
  documentation: razorsEdgeProducts.filter(p => p.category === 'documentation').length,
  services: razorsEdgeProducts.filter(p => p.category === 'services').length
}
