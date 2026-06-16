// content/ptfeWireSizes.ts
// Real per-AWG dataset for programmatic SEO pages: /ptfe-wire/[awg]
// Source: Jain Polymer Co. PTFE wire specification table (JSS 51004 / MIL-W-16878E).
// Each entry generates ONE substantive, non-thin programmatic page.

export type VoltageClass = "ET" | "E" | "EE";

export interface PtfeWireSize {
  awg: number;                 // gauge
  slug: string;                // e.g. "22-awg"
  strands: string;             // e.g. "19/34"
  conductorDiaMm: number;
  areaMm2: number;
  maxOdEeMm: number;           // max O.D. over insulation, EE class
  resistanceOhmPerKm: number;
  currentA: number;            // indicative current rating
  voltageClasses: VoltageClass[];
  commonUses: string[];        // 2-4 application phrases (make each page unique)
}

export const PTFE_WIRE_SIZES: PtfeWireSize[] = [
  { awg: 32, slug: "32-awg", strands: "7/40", conductorDiaMm: 0.24, areaMm2: 0.035, maxOdEeMm: 0.98, resistanceOhmPerKm: 567.57, currentA: 0.7, voltageClasses: ["ET","E","EE"], commonUses: ["dense PCB and instrument wiring","miniature sensor leads"] },
  { awg: 30, slug: "30-awg", strands: "7/38", conductorDiaMm: 0.31, areaMm2: 0.055, maxOdEeMm: 1.16, resistanceOhmPerKm: 330.37, currentA: 1.0, voltageClasses: ["ET","E","EE"], commonUses: ["wire-wrap and point-to-point wiring","low-current signal paths"] },
  { awg: 28, slug: "28-awg", strands: "7/36", conductorDiaMm: 0.38, areaMm2: 0.089, maxOdEeMm: 1.25, resistanceOhmPerKm: 204.10, currentA: 1.5, voltageClasses: ["ET","E","EE"], commonUses: ["compact harnessing","test and measurement leads"] },
  { awg: 26, slug: "26-awg", strands: "19/38", conductorDiaMm: 0.48, areaMm2: 0.150, maxOdEeMm: 1.35, resistanceOhmPerKm: 125.98, currentA: 3.0, voltageClasses: ["ET","E","EE"], commonUses: ["flexible internal wiring","avionics signal lines"] },
  { awg: 24, slug: "24-awg", strands: "19/36", conductorDiaMm: 0.64, areaMm2: 0.252, maxOdEeMm: 1.47, resistanceOhmPerKm: 79.72, currentA: 4.0, voltageClasses: ["ET","E","EE"], commonUses: ["control and instrumentation","thermocouple extension"] },
  { awg: 22, slug: "22-awg", strands: "19/34", conductorDiaMm: 0.79, areaMm2: 0.382, maxOdEeMm: 1.62, resistanceOhmPerKm: 49.54, currentA: 7.3, voltageClasses: ["ET","E","EE"], commonUses: ["general high-temperature equipment wiring","power supply leads"] },
  { awg: 20, slug: "20-awg", strands: "19/32", conductorDiaMm: 1.02, areaMm2: 0.596, maxOdEeMm: 1.82, resistanceOhmPerKm: 30.15, currentA: 11.0, voltageClasses: ["ET","E","EE"], commonUses: ["light power distribution","motor and transformer leads"] },
  { awg: 18, slug: "18-awg", strands: "19/30", conductorDiaMm: 1.27, areaMm2: 0.950, maxOdEeMm: 2.15, resistanceOhmPerKm: 19.5, currentA: 16.0, voltageClasses: ["E","EE"], commonUses: ["moderate power runs","furnace and oven wiring"] },
  { awg: 16, slug: "16-awg", strands: "19/29", conductorDiaMm: 1.45, areaMm2: 1.254, maxOdEeMm: 2.41, resistanceOhmPerKm: 14.82, currentA: 22.0, voltageClasses: ["E","EE"], commonUses: ["heavier power circuits","industrial heating leads"] },
  { awg: 14, slug: "14-awg", strands: "19/27", conductorDiaMm: 1.80, areaMm2: 1.940, maxOdEeMm: 2.85, resistanceOhmPerKm: 9.8, currentA: 32.0, voltageClasses: ["E","EE"], commonUses: ["high-current equipment wiring","power feeders"] },
  { awg: 12, slug: "12-awg", strands: "19/25", conductorDiaMm: 2.31, areaMm2: 3.021, maxOdEeMm: 3.37, resistanceOhmPerKm: 5.93, currentA: 41.0, voltageClasses: ["E","EE"], commonUses: ["power distribution","high-temperature machinery"] },
  { awg: 10, slug: "10-awg", strands: "37/26", conductorDiaMm: 2.95, areaMm2: 4.930, maxOdEeMm: 4.10, resistanceOhmPerKm: 3.8, currentA: 55.0, voltageClasses: ["EE"], commonUses: ["heavy power feeders","generator and switchgear leads"] },
  { awg: 8, slug: "8-awg", strands: "133/29", conductorDiaMm: 4.29, areaMm2: 8.784, maxOdEeMm: 5.56, resistanceOhmPerKm: 2.15, currentA: 75.0, voltageClasses: ["EE"], commonUses: ["high-current power runs","industrial bus wiring"] },
  { awg: 6, slug: "6-awg", strands: "133/27", conductorDiaMm: 5.41, areaMm2: 13.537, maxOdEeMm: 6.93, resistanceOhmPerKm: 1.37, currentA: 100.0, voltageClasses: ["EE"], commonUses: ["heavy power feeders","high-temperature power distribution"] },
];

// Comparison-page seeds: /compare/[a]-vs-[b]
export const COMPARISONS = [
  { slug: "ptfe-vs-pvc", a: "PTFE", b: "PVC" },
  { slug: "ptfe-vs-fep", a: "PTFE", b: "FEP" },
  { slug: "ptfe-vs-silicone", a: "PTFE", b: "Silicone" },
  { slug: "fep-vs-pvc", a: "FEP", b: "PVC" },
  { slug: "silver-vs-nickel-plated-copper", a: "Silver-plated copper", b: "Nickel-plated copper" },
  { slug: "solid-vs-stranded-hook-up-wire", a: "Solid", b: "Stranded" },
];

// Application-page seeds: /applications/[slug]
export const APPLICATIONS = [
  { slug: "aerospace", name: "Aerospace & Avionics Wiring" },
  { slug: "defense", name: "Defence & Military Wiring" },
  { slug: "medical-devices", name: "Medical Device Wiring" },
  { slug: "atomic-energy", name: "Atomic Energy & Reactor Cabling" },
  { slug: "satellite-ground-control", name: "Satellite & Ground Control" },
  { slug: "furnace-oven", name: "Furnace & Oven Wiring" },
  { slug: "motors-transformers", name: "Motor & Transformer Lead Wire" },
  { slug: "chemical-processing", name: "Chemical Processing Wiring" },
];

// Standard-page seeds: /standards/[slug]
export const STANDARDS = [
  { slug: "mil-w-16878e", name: "MIL-W-16878E", jss: "JSS 51004", scope: "Hook-up & equipment wire" },
  { slug: "jss-51004", name: "JSS 51004", mil: "MIL-W-16878E", scope: "Hook-up & equipment wire" },
  { slug: "mil-c-17", name: "MIL-C-17", jss: "JSS 51100", scope: "Coaxial cable" },
  { slug: "mil-i-22129", name: "MIL-I-22129", jss: "JSS 54802", scope: "PTFE sleeving" },
];
