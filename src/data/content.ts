import { ProductFamily, WireSpec, SleevingSpec, CableSpec, TapeSpec } from '../types';

export const PRODUCT_FAMILIES: ProductFamily[] = [
  {
    id: 'ptfe-wires',
    name: 'PTFE Hook-Up & Equipment Wires',
    shortDescription: 'High-reliability single-core hook-up wires for defense, aerospace, and high-temperature systems.',
    description: 'Engineered for operation in extreme temperatures and severe environments, our PTFE insulated equipment wires are manufactured strictly in accordance with JSS 51004 and US MIL-W-16878E standards. Featuring annealed silver-plated, nickel-plated, or bare copper conductors, these wires offer unrivaled thermal stability, chemical inertness, and dielectric strength.',
    standardMil: 'MIL-W-16878E',
    standardJss: 'JSS 51004',
    image: '/brand/crops/ptfe.webp',
    tagline: 'The Permanent Solution to severe wiring environments.',
    features: [
      'Operational service temperature range from -65°C to +260°C (up to 300°C for short duration)',
      'Excellent resistance to chemical solvents, acids, bases, oils, and fuels',
      'Non-flammable, self-extinguishing, and immune to fungus, UV, and corona discharge',
      'Available in 10 standard solid colors (Black, Brown, Red, Orange, Yellow, Green, Blue, Violet, Grey, White) plus Pink and Natural',
      'Offered in three voltage classes: Type ET (250V), Type E (600V), and Type EE (1000V AC RMS)'
    ],
    applications: [
      'Defense electronics and radar systems',
      'Aerospace and satellite navigation instrumentation',
      'Industrial furnace and oven wiring',
      'High-performance motors and transformer windings',
      'Medical apparatus and diagnostic equipment'
    ],
    colors: ['Black', 'Brown', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Violet', 'Grey', 'White', 'Pink', 'Natural']
  },
  {
    id: 'cables',
    name: 'Multi-Core & Co-Axial / Tri-Axial Cables',
    shortDescription: 'Shielded and jacketed cables for high-frequency signal integrity and heavy-duty telemetry.',
    description: 'Designed for high-frequency signal preservation and critical data transmission, our co-axial, tri-axial, and multi-core cables conform strictly to JSS 51100 and US MIL-C-17. Featuring PTFE or FEP dielectrics and high-density silver-plated copper (SPC) shielding braids, they guarantee clean signals under mechanical stress and extreme thermal ranges.',
    standardMil: 'MIL-C-17',
    standardJss: 'JSS 51100',
    image: '/brand/crops/product1.webp',
    tagline: 'Precision signals preserved. Absolute telemetry integrity.',
    features: [
      'Standard impedance options of 50 Ω, 75 Ω, and 90 Ω',
      'High-density SPC braided shield with up to 95% coverage for EMI/RFI suppression',
      'Jacket options: PTFE, extruded FEP, high-grade PVC, or varnished fiberglass',
      'Compact construction for high-density chassis wiring and telemetry'
    ],
    applications: [
      'Satellite ground control and launch communications',
      'Military communication systems and transceiver feeds',
      'High-resolution load cells and transducer leads',
      'Television transmission and telecommunication exchanges'
    ],
    colors: ['White', 'Light Sky Blue', 'Natural', 'Black']
  },
  {
    id: 'fep-wires',
    name: 'FEP Extruded High-Temperature Wires',
    shortDescription: 'Melt-extruded fluorinated ethylene propylene wires for high-frequency and compact routing.',
    description: 'Fluorinated Ethylene Propylene (FEP) insulated wires offer a unique combination of PTFE-like chemical and thermal properties, coupled with the benefit of melt-extruded continuous lengths. Rated from -65°C to +200°C, these wires provide a highly compact footprint and excellent dielectric properties, suitable for frequencies ranging from D.C. up to 10 GHz.',
    standardMil: 'ASTM D2116',
    standardJss: 'MIL-W-16878/11',
    image: '/brand/crops/fep.webp',
    tagline: 'High frequency stability. Continuous long-length extrusion.',
    features: [
      'Melt-extruded for long, continuous joint-free wire runs',
      'Maintains structural integrity and flexibility down to -65°C',
      'Extremely low dissipation factor and stable dielectric constant across 10 GHz',
      'High chemical inertness and immune to outdoor weathering/aging'
    ],
    applications: [
      'Ultra-high frequency communication lines',
      'Down-hole oil drilling sensors and controls',
      'Furnace and industrial heater internal wiring',
      'Control valves and high-density telemetry feeds'
    ],
    colors: ['Black', 'Brown', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Violet', 'Grey', 'White']
  },
  {
    id: 'ptfe-sleevings',
    name: 'High-Frequency PTFE Sleevings',
    shortDescription: 'Flexible insulating sleeves from 0.3mm to 30mm bore, offering breakdown voltage up to 17kV.',
    description: 'Manufactured to meet the rigorous specifications of JSS 54802 and MIL-I-22129, our PTFE sleevings provide reliable terminal point insulation and bundle protection. With exceptional dielectric breakdown resistance up to 17 kV, these sleevings are chemically inert, non-stick, and highly heat-resistant.',
    standardMil: 'MIL-I-22129',
    standardJss: 'JSS 54802',
    image: '/brand/crops/product2.webp',
    tagline: 'Dielectric shielding where space is critical.',
    features: [
      'Bore diameters ranging from 0.3 mm up to 30 mm with tight tolerances',
      'Wall thicknesses starting at 0.25 mm for micro-insulation',
      'High dielectric breakdown voltage (tested up to 17,000V AC RMS)',
      'Chemically inert, self-extinguishing, and non-toxic'
    ],
    applications: [
      'Point-to-point electrical chassis wiring insulation',
      'Protective sleeve cover for wiring harnesses in hot environments',
      'Insulating sleeve for semiconductor heat sink mounts',
      'Corrosive fluid transit lines in analytical labs'
    ],
    colors: ['Natural', 'White', 'Black', 'Red', 'Yellow', 'Blue', 'Green', 'Pink']
  },
  {
    id: 'ptfe-tapes',
    name: 'Premium PTFE Electrical & Thread Seal Tapes',
    shortDescription: 'Premium cable wrap tapes and JAIN FLON thread sealants for sealing and insulation.',
    description: 'Our tape family consists of two distinct product lines: Premium electrical-grade PTFE cable-wrap tape (available in jumbo rolls or slit widths) for high-voltage dielectric wrapping, and the renowned "JAIN FLON" thread-seal tape for plumbing and chemical piping. Both exhibit zero moisture absorption and complete chemical resistance.',
    standardMil: 'MIL-T-27730A',
    standardJss: 'BS 7786',
    image: '/brand/crops/ptfe_tape.webp', // Using cutaway photo as a visual placeholder
    tagline: 'High-voltage wrap insulation and leak-proof thread sealing.',
    features: [
      'Electrical wrap tape: thin, high-tensile, and uniform thickness for spiral wrapping',
      'JAIN FLON: Standard widths of 12.5 mm, 19 mm, and 25 mm',
      'Completely chemically inert, sealing threads against water, fuels, and acids',
      'Non-stick surface prevents thread binding and seizing'
    ],
    applications: [
      'High-temperature cable bundling and shielding insulation',
      'Thread sealing in hydraulic, pneumatic, and water distribution lines',
      'Corrosive environment joint protection in chemical industries'
    ],
    colors: ['White', 'Yellow (Gas Grade)']
  },
  {
    id: 'silicon-products',
    name: 'Silicon Rubber Cables & Tubing',
    shortDescription: 'Ultra-flexible high-voltage silicone components for extreme mechanical and environmental stress.',
    description: 'Completing our product catalog, our Silicon Rubber insulated cables and tubings are designed for applications requiring maximum flexibility combined with high temperature resilience. Unlike PTFE which is semi-rigid, silicon offers rubber-like elastic flexibility while maintaining an operating envelope up to +200°C, and exceptional ozone and weathering resistance.',
    standardMil: 'MIL-I-3190',
    standardJss: 'JSS 54800 (Ref)',
    image: '/brand/crops/Silicon_Rubber_Cables.webp',
    tagline: 'Ultra-flexibility meets high temperature endurance.',
    features: [
      'Highly flexible rubber-like elastomer insulation',
      'Continuous service temperature from -60°C to +200°C',
      'Excellent resistance to ozone, aging, corona, and weather exposure',
      'Highly resilient against mechanical bending and vibration fatigue'
    ],
    applications: [
      'High-performance motor lead cables',
      'Furnace, foundry, and hot rolling mill wiring',
      'High-voltage neon signage and ignition leads',
      'Flexible protective tubes for sensor cabling arrays'
    ],
    colors: ['Brick Red', 'White', 'Black', 'Blue']
  }
];

export const WIRE_SPECS: WireSpec[] = [
  { awg: '32', strands: '7/40', condDia: 0.24, area: 0.035, eeDiaMax: 0.98, resistance: 567.57, current: 0.7, voltageType: 'ET' },
  { awg: '30', strands: '7/38', condDia: 0.31, area: 0.055, eeDiaMax: 1.16, resistance: 330.37, current: 1.0, voltageType: 'ET' },
  { awg: '28', strands: '7/36', condDia: 0.38, area: 0.089, eeDiaMax: 1.25, resistance: 204.10, current: 1.5, voltageType: 'ET' },
  { awg: '26', strands: '19/38', condDia: 0.48, area: 0.150, eeDiaMax: 1.35, resistance: 125.98, current: 3.0, voltageType: 'ET' },
  { awg: '24', strands: '19/36', condDia: 0.64, area: 0.252, eeDiaMax: 1.47, resistance: 79.72, current: 4.0, voltageType: 'ET' },
  { awg: '22', strands: '19/34', condDia: 0.79, area: 0.382, eeDiaMax: 1.62, resistance: 49.54, current: 7.3, voltageType: 'ET' },
  { awg: '20', strands: '19/32', condDia: 1.02, area: 0.596, eeDiaMax: 1.82, resistance: 30.15, current: 11.0, voltageType: 'ET' },
  { awg: '18', strands: '19/30', condDia: 1.27, area: 0.950, eeDiaMax: 2.15, resistance: 19.50, current: 16.0, voltageType: 'ET' },
  { awg: '16', strands: '19/29', condDia: 1.45, area: 1.254, eeDiaMax: 2.41, resistance: 14.82, current: 22.0, voltageType: 'E' },
  { awg: '14', strands: '19/27', condDia: 1.80, area: 1.940, eeDiaMax: 2.85, resistance: 9.80, current: 32.0, voltageType: 'E' },
  { awg: '12', strands: '19/25', condDia: 2.31, area: 3.021, eeDiaMax: 3.37, resistance: 5.93, current: 41.0, voltageType: 'E' },
  { awg: '10', strands: '37/26', condDia: 2.95, area: 4.930, eeDiaMax: 4.10, resistance: 3.80, current: 55.0, voltageType: 'EE' },
  { awg: '8', strands: '133/29', condDia: 4.29, area: 8.784, eeDiaMax: 5.56, resistance: 2.15, current: 75.0, voltageType: 'EE' },
  { awg: '6', strands: '133/27', condDia: 5.41, area: 13.537, eeDiaMax: 6.93, resistance: 1.37, current: 100.0, voltageType: 'EE' }
];

export const SLEEVING_SPECS: SleevingSpec[] = [
  { nominalBore: 0.30, boreTolerance: '±0.10', nominalWall: 0.25, wallTolerance: '±0.05', breakdownVoltage: 10.0 },
  { nominalBore: 0.50, boreTolerance: '±0.10', nominalWall: 0.25, wallTolerance: '±0.05', breakdownVoltage: 11.5 },
  { nominalBore: 1.00, boreTolerance: '±0.10', nominalWall: 0.30, wallTolerance: '±0.08', breakdownVoltage: 14.6 },
  { nominalBore: 1.50, boreTolerance: '±0.15', nominalWall: 0.30, wallTolerance: '±0.08', breakdownVoltage: 15.0 },
  { nominalBore: 2.00, boreTolerance: '±0.15', nominalWall: 0.35, wallTolerance: '±0.10', breakdownVoltage: 15.5 },
  { nominalBore: 3.00, boreTolerance: '±0.15', nominalWall: 0.40, wallTolerance: '±0.10', breakdownVoltage: 16.0 },
  { nominalBore: 5.00, boreTolerance: '±0.20', nominalWall: 0.50, wallTolerance: '±0.10', breakdownVoltage: 17.0 },
  { nominalBore: 10.00, boreTolerance: '±0.30', nominalWall: 0.60, wallTolerance: '±0.15', breakdownVoltage: 17.0 },
  { nominalBore: 20.00, boreTolerance: '±0.50', nominalWall: 0.80, wallTolerance: '±0.20', breakdownVoltage: 17.0 },
  { nominalBore: 30.00, boreTolerance: '±0.80', nominalWall: 1.00, wallTolerance: '±0.25', breakdownVoltage: 17.0 }
];

export const CABLE_SPECS: CableSpec[] = [
  { rgDesignation: 'RG-196 A/U', impedance: '50 Ω', dielectric: 'PTFE', shield: 'Single SPC Braid (93% cov.)', jacket: 'FEP' },
  { rgDesignation: 'RG-198 A/U', impedance: '75 Ω', dielectric: 'PTFE', shield: 'Single SPC Braid', jacket: 'FEP' },
  { rgDesignation: 'RG-195 A/U', impedance: '90 Ω', dielectric: 'PTFE', shield: 'Single SPC Braid', jacket: 'FEP' },
  { rgDesignation: 'RG-115 A/U', impedance: '50 Ω', dielectric: 'PTFE', shield: 'Double SPC Braid (95% cov.)', jacket: 'FEP' },
  { rgDesignation: 'RG-140 A/U', impedance: '75 Ω', dielectric: 'PTFE', shield: 'Single SPC Braid', jacket: 'FEP' },
  { rgDesignation: 'RG-141 A/U', impedance: '50 Ω', dielectric: 'PTFE', shield: 'SPC Braid, Flat Woven', jacket: 'FEP' },
  { rgDesignation: 'RG-142 A/U', impedance: '50 Ω', dielectric: 'PTFE', shield: 'Double SPC Braid', jacket: 'FEP' }
];

export const TAPE_SPECS: TapeSpec[] = [
  { name: 'JAIN FLON Thread Seal Tape', type: 'Plumbing & Hydraulic grade', width: '12.5 mm / 19 mm / 25 mm', thickness: '0.075 mm', length: '10 m / 12 m rolls', application: 'Leak-proof sealing of threaded metal & plastic pipes' },
  { name: 'PTFE Electrical Wrap Tape', type: 'Premium dielectric grade', width: '150 mm jumbo (custom slitting)', thickness: '0.05 mm - 0.20 mm', length: 'Spools to order', application: 'High-voltage spiral wrapping and wire bundle insulation' }
];

export const QUALITY_TIMELINE = [
  {
    phase: 'Raw Material Quarantine',
    rule: 'Failure is barred from the shop floor.',
    detail: 'Every batch of incoming PTFE virgin resin, FEP pellets, and silver/nickel-plated copper wires is held in strict quarantine and tested for chemical purity and diameter tolerance before release.'
  },
  {
    phase: 'Contract Review & Custom Plans',
    rule: 'Alignment with exact customer end-use.',
    detail: 'Before manufacturing begins, our engineering team performs a rigorous contract review to formulate custom testing parameters based on client-specific voltage, frequency, and thermal tolerances.'
  },
  {
    phase: 'Equipment Calibration',
    rule: 'Eliminating tool drift.',
    detail: 'All testing jigs, spark testers, calipers, and extrusion temperature sensors are calibrated periodically against certified standards to maintain a zero-drift benchmark.'
  },
  {
    phase: 'Mandatory Pre-Inspection',
    rule: 'Absolute transparency before shipping.',
    detail: 'We generate exhaustive pre-inspection test reports detailing dielectric spark resistance, conductor resistance, and dimensional consistency for every single batch before shipping.'
  }
];

export const DIELECTRIC_TESTS = [
  { type: 'Type ET (250V)', sparkTest: '1,500 V AC RMS', dielectricStrength: '2,500 V AC RMS' },
  { type: 'Type E (600V)', sparkTest: '2,000 V AC RMS', dielectricStrength: '3,400 V AC RMS' },
  { type: 'Type EE (1000V)', sparkTest: '3,000 V AC RMS', dielectricStrength: '5,000 V AC RMS' }
];
