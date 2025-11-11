# Razors-Edge Electronic Transmission System - Bill of Materials (BOM)

## Complete System Overview
**Product**: Razors-Edge Electronic Transmission System
**System Price**: $599.99
**Status**: Pre-Order (Expected Early 2026)

---

## BOM Breakdown by Module

### 1. Core Control Module
**Module SKU**: RE-CTRL-001
**Module Price**: $89.99

| Component | Part Number | Qty | Unit Price | Extended | Supplier |
|-----------|-------------|-----|------------|----------|----------|
| ESP32 DevKit V1 (Dual-Core) | ESP32-WROOM-32 | 1 | $8.99 | $8.99 | Amazon/AliExpress |
| Custom PCB - Main Controller | RE-PCB-MAIN-V1 | 1 | $15.00 | $15.00 | JLCPCB |
| Micro USB Cable (programming) | USB-MICRO-6FT | 1 | $3.99 | $3.99 | Amazon |
| ESP32 Breakout Board | PROTO-ESP32 | 1 | $4.99 | $4.99 | Amazon |
| GPIO Expansion Header (40-pin) | HEADER-40P-F | 2 | $1.99 | $3.98 | Mouser |
| 0.1uF Ceramic Capacitors | CAP-CER-100NF | 10 | $0.10 | $1.00 | Mouser |
| 10uF Electrolytic Capacitors | CAP-ELEC-10UF | 4 | $0.25 | $1.00 | Mouser |
| Pull-up/down Resistors (10kΩ) | RES-10K-0805 | 20 | $0.05 | $1.00 | Mouser |

**Module Total**: $39.95 (Component Cost) → **Retail: $89.99**

---

### 2. Motor Control Module (Dual Channel)
**Module SKU**: RE-MOTOR-001
**Module Price**: $129.99

| Component | Part Number | Qty | Unit Price | Extended | Supplier |
|-----------|-------------|-----|------------|----------|----------|
| Cytron MDD20A Motor Driver | MDD20A | 2 | $24.99 | $49.98 | Cytron Direct |
| Custom PCB - Motor Interface | RE-PCB-MOTOR-V1 | 1 | $12.00 | $12.00 | JLCPCB |
| Heat Sink for MDD20A (40mm) | HEATSINK-40MM | 2 | $2.99 | $5.98 | Amazon |
| Thermal Paste | THERMAL-PASTE | 1 | $3.99 | $3.99 | Amazon |
| PWM Signal Cables (shielded) | CABLE-PWM-2M | 2 | $4.99 | $9.98 | Amazon |
| Power Terminal Blocks (30A) | TERM-30A-2P | 4 | $1.99 | $7.96 | Mouser |
| Schottky Diodes (30A) | DIODE-30SQ150 | 4 | $1.50 | $6.00 | Mouser |

**Module Total**: $95.89 (Component Cost) → **Retail: $129.99**

---

### 3. Power Management & Monitoring Module
**Module SKU**: RE-POWER-001
**Module Price**: $109.99

| Component | Part Number | Qty | Unit Price | Extended | Supplier |
|-----------|-------------|-----|------------|----------|----------|
| INA228 Current Sensor | INA228AIDGSR | 3 | $8.99 | $26.97 | Mouser/DigiKey |
| 0.001Ω Current Shunt Resistors | SHUNT-0.001-50W | 3 | $12.99 | $38.97 | Mouser |
| Custom PCB - Power Monitor | RE-PCB-PWR-V1 | 1 | $10.00 | $10.00 | JLCPCB |
| DC-DC Buck Converter (60V→5V, 5A) | LM2596-ADJ-60V | 1 | $8.99 | $8.99 | Amazon |
| Low Voltage Cutoff Module | LVC-60V-100A | 1 | $15.99 | $15.99 | Amazon |
| Main Power Switch (100A) | SWITCH-100A-12-60V | 1 | $12.99 | $12.99 | Amazon |
| Fuse Holder (Blade Type) | FUSE-HOLDER-ATC | 2 | $3.99 | $7.98 | Amazon |
| Blade Fuses (40A, 60A, 80A) | FUSE-ATC-ASSORT | 1 | $8.99 | $8.99 | Amazon |
| Emergency Stop Button (Red) | E-STOP-RED-16MM | 1 | $9.99 | $9.99 | Amazon |

**Module Total**: $139.87 (Component Cost) → **Retail: $109.99**

---

### 4. Display & User Interface Module
**Module SKU**: RE-DISPLAY-001
**Module Price**: $49.99

| Component | Part Number | Qty | Unit Price | Extended | Supplier |
|-----------|-------------|-----|------------|----------|----------|
| 128x64 OLED Display (I2C) | OLED-128X64-I2C | 1 | $12.99 | $12.99 | Amazon |
| Rotary Encoder with Push Button | ROTARY-EC11-20MM | 1 | $4.99 | $4.99 | Amazon |
| Encoder Knob (Metal) | KNOB-METAL-20MM | 1 | $3.99 | $3.99 | Amazon |
| Custom PCB - Display Interface | RE-PCB-DISP-V1 | 1 | $8.00 | $8.00 | JLCPCB |
| Ribbon Cable (I2C, 30cm) | CABLE-I2C-4PIN-30CM | 1 | $2.99 | $2.99 | Amazon |
| Panel Mount Bracket | BRACKET-OLED-128X64 | 1 | $4.99 | $4.99 | 3D Printed |
| M3 Mounting Hardware | HARDWARE-M3-KIT | 1 | $3.99 | $3.99 | Amazon |

**Module Total**: $41.94 (Component Cost) → **Retail: $49.99**

---

### 5. GPS & Telemetry Module
**Module SKU**: RE-GPS-001
**Module Price**: $69.99

| Component | Part Number | Qty | Unit Price | Extended | Supplier |
|-----------|-------------|-----|------------|----------|----------|
| GPS Module (NEO-6M or NEO-7M) | GPS-NEO-7M-UART | 1 | $14.99 | $14.99 | Amazon |
| GPS Antenna (Ceramic, Active) | GPS-ANT-CERAMIC-28DB | 1 | $8.99 | $8.99 | Amazon |
| Custom PCB - GPS Interface | RE-PCB-GPS-V1 | 1 | $8.00 | $8.00 | JLCPCB |
| GPS Cable Extension (3m) | CABLE-GPS-IPEX-3M | 1 | $6.99 | $6.99 | Amazon |
| Weatherproof Enclosure (GPS) | ENCL-GPS-IP65 | 1 | $7.99 | $7.99 | Amazon |
| Mounting Bracket | BRACKET-GPS-MAGNETIC | 1 | $5.99 | $5.99 | Amazon |

**Module Total**: $52.95 (Component Cost) → **Retail: $69.99**

---

### 6. Safety & Emergency Systems Module
**Module SKU**: RE-SAFETY-001
**Module Price**: $79.99

| Component | Part Number | Qty | Unit Price | Extended | Supplier |
|-----------|-------------|-----|------------|----------|----------|
| Wireless Remote Kill Switch (433MHz) | REMOTE-KILL-433MHZ | 1 | $19.99 | $19.99 | Amazon |
| Reed Switch (Parking Brake Sensor) | REED-SWITCH-N52 | 1 | $4.99 | $4.99 | Amazon |
| Tilt Sensor (Rollover Detection) | TILT-SENSOR-SW-520D | 2 | $3.99 | $7.98 | Amazon |
| Piezo Buzzer (Warning Alerts) | BUZZER-PIEZO-5V | 1 | $2.99 | $2.99 | Amazon |
| LED Indicator Lights (Red/Green) | LED-INDICATOR-12MM | 4 | $2.99 | $11.96 | Amazon |
| Relay Module (4-Channel, Opto) | RELAY-4CH-OPTO-5V | 1 | $8.99 | $8.99 | Amazon |
| Custom PCB - Safety Interface | RE-PCB-SAFETY-V1 | 1 | $10.00 | $10.00 | JLCPCB |

**Module Total**: $66.90 (Component Cost) → **Retail: $79.99**

---

### 7. Wiring & Connectors Kit
**Module SKU**: RE-WIRE-001
**Module Price**: $59.99

| Component | Part Number | Qty | Unit Price | Extended | Supplier |
|-----------|-------------|-----|------------|----------|----------|
| 10AWG Silicone Wire (Red, 10ft) | WIRE-10AWG-RED-10FT | 1 | $12.99 | $12.99 | Amazon |
| 10AWG Silicone Wire (Black, 10ft) | WIRE-10AWG-BLK-10FT | 1 | $12.99 | $12.99 | Amazon |
| 18AWG Silicone Wire (Assorted, 30ft) | WIRE-18AWG-ASSORT | 1 | $14.99 | $14.99 | Amazon |
| XT90 Connectors (5 pairs) | CONN-XT90-5PR | 1 | $9.99 | $9.99 | Amazon |
| Anderson Powerpole (45A, 10 sets) | CONN-PP45-10SET | 1 | $12.99 | $12.99 | Amazon |
| JST-XH Connectors (Assorted) | CONN-JST-XH-KIT | 1 | $11.99 | $11.99 | Amazon |
| Heat Shrink Tubing (Assorted) | HEATSHRINK-ASSORT | 1 | $9.99 | $9.99 | Amazon |
| Cable Ties (100pcs, UV resistant) | ZIP-TIES-UV-100 | 1 | $5.99 | $5.99 | Amazon |
| Wire Labels/Markers | WIRE-LABEL-KIT | 1 | $6.99 | $6.99 | Amazon |

**Module Total**: $98.91 (Component Cost) → **Retail: $59.99**

---

### 8. Main Enclosure & Mounting Hardware
**Module SKU**: RE-ENCL-001
**Module Price**: $89.99

| Component | Part Number | Qty | Unit Price | Extended | Supplier |
|-----------|-------------|-----|------------|----------|----------|
| Weatherproof Enclosure (IP65, 200x120x75mm) | ENCL-ABS-200X120 | 1 | $24.99 | $24.99 | Amazon |
| Aluminum Mounting Plate (Custom) | PLATE-AL-190X110 | 1 | $15.99 | $15.99 | Custom Fabrication |
| PCB Standoffs (M3, Brass, 10mm) | STANDOFF-M3-10MM | 20 | $0.25 | $5.00 | Amazon |
| Cable Glands (PG9, IP68) | GLAND-PG9-IP68 | 8 | $1.99 | $15.92 | Amazon |
| Ventilation Membrane (Gore-Tex) | VENT-MEMBRANE-M12 | 2 | $3.99 | $7.98 | Amazon |
| Mounting Brackets (L-Bracket) | BRACKET-L-50MM-SS | 4 | $2.99 | $11.96 | Amazon |
| Vibration Dampening Pads | PAD-VIBRATION-30MM | 4 | $1.99 | $7.96 | Amazon |
| M4 Mounting Hardware Kit | HARDWARE-M4-SS-KIT | 1 | $8.99 | $8.99 | Amazon |

**Module Total**: $98.79 (Component Cost) → **Retail: $89.99**

---

### 9. Battery System (60V Li-ion)
**Module SKU**: RE-BATT-60V-001
**Module Price**: $349.99 (Optional - NOT included in base system)

| Component | Part Number | Qty | Unit Price | Extended | Supplier |
|-----------|-------------|-----|------------|----------|----------|
| 60V 20Ah Li-ion Battery Pack | BATT-60V-20AH-SANYO | 1 | $249.99 | $249.99 | Specialized Supplier |
| Battery Management System (60V) | BMS-60V-50A-SMART | 1 | $49.99 | $49.99 | Amazon |
| Battery Enclosure (Ventilated) | ENCL-BATT-60V-IP65 | 1 | $34.99 | $34.99 | Custom |
| XT90 Battery Connector | CONN-XT90-HEAVY | 1 | $4.99 | $4.99 | Amazon |
| Battery Level Gauge (LED) | GAUGE-BATT-60V-LED | 1 | $12.99 | $12.99 | Amazon |

**Module Total**: $352.95 (Component Cost) → **Retail: $349.99**

---

## BOM Summary

### Module Pricing Breakdown

| Module | SKU | Component Cost | Retail Price | Margin |
|--------|-----|----------------|--------------|--------|
| Core Control Module | RE-CTRL-001 | $39.95 | $89.99 | 125% |
| Motor Control Module | RE-MOTOR-001 | $95.89 | $129.99 | 36% |
| Power Management Module | RE-POWER-001 | $139.87 | $109.99 | -21% (Loss Leader) |
| Display & UI Module | RE-DISPLAY-001 | $41.94 | $49.99 | 19% |
| GPS & Telemetry Module | RE-GPS-001 | $52.95 | $69.99 | 32% |
| Safety Systems Module | RE-SAFETY-001 | $66.90 | $79.99 | 20% |
| Wiring & Connectors Kit | RE-WIRE-001 | $98.91 | $59.99 | -39% (Loss Leader) |
| Enclosure & Mounting | RE-ENCL-001 | $98.79 | $89.99 | -9% (Loss Leader) |
| **SUBTOTAL (Without Battery)** | | **$635.20** | **$680.91** | **7%** |
| Battery System (Optional) | RE-BATT-60V-001 | $352.95 | $349.99 | -1% |

### Complete System Packages

| Package | SKU | Modules Included | Total Component Cost | Retail Price | Margin |
|---------|-----|------------------|---------------------|--------------|--------|
| **Razors-Edge Complete System** | RE-SYS-COMPLETE-001 | All 8 modules (no battery) | $635.20 | $599.99 | -6% (Intro Pricing) |
| **Razors-Edge DIY Kit** | RE-SYS-DIY-001 | All components, unassembled | $635.20 | $499.99 | -21% (DIY Discount) |
| **Razors-Edge + Battery Bundle** | RE-SYS-BUNDLE-001 | Complete system + 60V battery | $988.15 | $899.99 | -9% (Bundle Discount) |
| **Razors-Edge Premium** | RE-SYS-PREMIUM-001 | All modules + battery + install guide | $988.15 | $999.99 | 1% |

---

## Individual Component SKUs (Replacement Parts)

### Microcontrollers & ICs
- **RE-COMP-ESP32**: ESP32 DevKit V1 - $14.99
- **RE-COMP-INA228**: INA228 Current Sensor - $12.99 each
- **RE-COMP-MDD20A**: Cytron MDD20A Motor Driver - $34.99 each

### Sensors & Input Devices
- **RE-COMP-GPS**: GPS Module NEO-7M with Antenna - $29.99
- **RE-COMP-ENCODER**: Rotary Encoder with Knob - $12.99
- **RE-COMP-TILT**: Tilt Sensor (2-pack) - $9.99

### Display & Interface
- **RE-COMP-OLED**: 128x64 OLED Display - $19.99
- **RE-COMP-ESTOP**: Emergency Stop Button - $14.99
- **RE-COMP-REMOTE**: Wireless Kill Switch Remote - $24.99

### Power Components
- **RE-COMP-BUCK**: 60V to 5V Buck Converter - $14.99
- **RE-COMP-LVC**: Low Voltage Cutoff Module - $19.99
- **RE-COMP-FUSE**: Fuse Holder Kit with Assorted Fuses - $14.99
- **RE-COMP-SWITCH**: 100A Main Power Switch - $17.99

### PCBs (Custom Designed)
- **RE-PCB-MAIN-V1**: Main Controller PCB - $24.99
- **RE-PCB-MOTOR-V1**: Motor Interface PCB - $19.99
- **RE-PCB-PWR-V1**: Power Monitor PCB - $19.99
- **RE-PCB-DISP-V1**: Display Interface PCB - $14.99
- **RE-PCB-GPS-V1**: GPS Interface PCB - $14.99
- **RE-PCB-SAFETY-V1**: Safety Interface PCB - $19.99
- **RE-PCB-SET**: Complete PCB Set (all 6 boards) - $89.99

### Connectors & Wiring
- **RE-COMP-XT90**: XT90 Connector Set (10 pairs) - $14.99
- **RE-COMP-WIRE10**: 10AWG Silicone Wire Kit (Red/Black, 20ft total) - $29.99
- **RE-COMP-WIRE18**: 18AWG Silicone Wire Assortment (50ft) - $19.99

### Enclosures
- **RE-COMP-ENCL-MAIN**: Main Weatherproof Enclosure with Mounting Plate - $49.99
- **RE-COMP-ENCL-GPS**: GPS Weatherproof Enclosure - $14.99

---

## Documentation & Support SKUs
- **RE-DOC-INSTALL**: Professional Installation Guide (PDF Download) - FREE
- **RE-DOC-QUICK**: Quick Start Guide - FREE
- **RE-DOC-SCHEMA**: Complete Wiring Schematics - FREE
- **RE-DOC-CODE**: Source Code & Firmware (GitHub) - FREE
- **RE-DOC-PRINT**: Printed Installation Manual (Full Color, Spiral Bound) - $29.99
- **RE-SUP-INSTALL**: Remote Installation Support (2 hours via video call) - $149.99
- **RE-SUP-ONSITE**: On-site Installation Service (Missouri only) - $499.99

---

## Notes on Pricing Strategy

### Loss Leaders
- **Power Management Module**: Sold at loss to make complete system competitive
- **Wiring Kit**: Intentionally priced low to encourage DIY builders
- **Enclosure**: Reduced margin to keep complete system under $600

### Profit Centers
- **Individual PCBs**: Higher markup for replacement parts
- **Complete System**: Lower margin but higher volume expected
- **Installation Services**: High margin service revenue
- **Battery Bundle**: Profitable add-on for premium customers

### Market Positioning
- **Base System ($599.99)**: Competitive with DIY electric vehicle controllers ($400-$800 range)
- **DIY Kit ($499.99)**: Attracts makers and hobbyists
- **Bundle with Battery ($899.99)**: Complete solution under $1000 psychological barrier
- **Replacement Parts**: 30-50% markup standard for electronics components

---

## Recommended Inventory Levels (Pre-Launch)

| Item Type | Initial Stock | Reorder Point | Lead Time |
|-----------|---------------|---------------|-----------|
| Complete Systems (Pre-assembled) | 25 units | 10 units | 2-3 weeks |
| DIY Kits (Packaged Components) | 50 units | 15 units | 1-2 weeks |
| Individual Modules | 10 each | 3 each | 1 week |
| Replacement PCBs | 20 each | 5 each | 2 weeks (JLCPCB) |
| Critical Components (ESP32, MDD20A, INA228) | 50 each | 15 each | 2-4 weeks |

---

## Manufacturing Notes

### In-House Production
- Custom PCB fabrication via JLCPCB (China, 7-10 day lead time)
- 3D printed enclosure components (Missouri garage)
- Final assembly and quality testing (Missouri)
- Wiring harness pre-assembly

### Outsourced Components
- All electronic components (Amazon, Mouser, DigiKey)
- Motor drivers (Cytron Direct, Malaysia)
- Battery packs (Specialized Li-ion supplier, certification required)

### Quality Control Checkpoints
1. Incoming component inspection
2. PCB functional testing (each board)
3. Module-level testing before integration
4. System-level burn-in test (24 hours)
5. Final safety verification before shipping

---

*BOM Version: 1.0*
*Last Updated: 2025-11-11*
*Status: Pre-Production*
