import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { APPLICATIONS } from '../../../../content/ptfeWireSizes';
import { ChevronRight, ArrowRight, ShieldCheck, FileText, Factory } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return APPLICATIONS.map((app) => ({
    slug: app.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const app = APPLICATIONS.find(a => a.slug === slug);
  if (!app) return {};

  return {
    title: `${app.name} — High-Temperature Wire & Cable Solutions`,
    description: `Specialized high-temperature PTFE and FEP insulated wires and coaxial cables for ${app.name}. Conforming strictly to JSS & MIL-SPEC standards.`,
  };
}

interface ApplicationContent {
  title: string;
  subtitle: string;
  whyFits: string;
  specTableHeaders: string[];
  specTableRows: string[][];
  body1: string;
  body2: string;
  recommendedProduct: { name: string; url: string };
}

const APPLICATION_DATA: Record<string, ApplicationContent> = {
  "aerospace": {
    title: "Aerospace & Avionics Wiring",
    subtitle: "Weight reduction, thermal envelopes, and high-frequency signal integrity.",
    whyFits: "PTFE and FEP fluoropolymers are mandatory in aerospace systems because they offer thin-wall structures with high dielectric strength, allowing wire bundles to stay compact and lightweight while handling thermal swings from -65 to +260 °C.",
    specTableHeaders: ["System", "Recommended Wire Gauge", "Insulation Class", "Conductor Plating"],
    specTableRows: [
      ["Flight Controls", "22 AWG - 26 AWG", "Type E (600V)", "Silver-Plated Copper (SPC)"],
      ["Radio & Telemetry", "RG-196 A/U, RG-115 U", "MIL-C-17 Coaxial", "Silver-Plated Copper / Steel"],
      ["Sensor Harnesses", "28 AWG - 30 AWG", "Type ET (250V)", "Nickel-Plated Copper (NPC)"]
    ],
    body1: "In modern aircraft engineering, weight is equivalent to fuel cost. Standard PVC insulated wires require a thick jacket to prevent dielectric breakdowns, which adds weight. PTFE tape-wrapped wires (MIL-W-16878E Type E) support thin walls (0.25mm) while remaining completely immune to hydraulic fluids, jet fuels, and high-altitude ozone exposure.",
    body2: "For high-frequency radar, radio, and satellite transceivers, we supply coaxial cables built to MIL-C-17 and JSS 51100 standards. The FEP jackets on our FEP coaxial cables allow seamless melt-extruded lines that maintain highly stable impedance levels up to 10 GHz, ensuring clean signal transmission under high vibration.",
    recommendedProduct: { name: "View Coaxial & Multicore Cables", url: "/products/cables" }
  },
  "defense": {
    title: "Defence & Military Wiring",
    subtitle: "Rugged conformance to JSS 51004 & MIL-W-16878E specifications.",
    whyFits: "Military systems operate in severe climates where electronics must stay functional. Jain Polymer manufactures MoD (L.C.S.O) approved equipment wires designed to survive chemical solvents, mechanical abrasion, and sub-zero temperatures.",
    specTableHeaders: ["Domain", "Recommended Wire Gauge", "Insulation Class", "Conductor Plating"],
    specTableRows: [
      ["Tactical Radios", "24 AWG - 26 AWG", "Type E (600V)", "Silver-Plated Copper (SPC)"],
      ["Radar Components", "RG-188 A/U", "MIL-C-17 Coaxial", "Silver-Plated Copper-Clad Steel"],
      ["Vehicle Electronics", "12 AWG - 16 AWG", "Type EE (1000V)", "Nickel-Plated Copper (NPC)"]
    ],
    body1: "Defense contracting demands compliance with strict JSS and MIL standards. Our plant processes custom compound mixes that are subjected to high-voltage spark testing (up to 5,000V AC) to eliminate pinholes and micro-cracks. Nickel-plated conductors are used in hot zones (up to +260°C) such as engine lead feeds and missile firing channels.",
    body2: "Jain Polymer Co. is an L.C.S.O Type Approved manufacturer for the Indian Ministry of Defence. This means our production logs, batch records, and quality check systems are fully certified for direct defense supply chain integrations, ensuring zero-compromise reliability.",
    recommendedProduct: { name: "View PTFE Hook-Up Wires", url: "/products/ptfe-wires" }
  },
  "medical-devices": {
    title: "Medical Device Wiring",
    subtitle: "Chemical inertness, biocompatibility, and autoclave sterilization.",
    whyFits: "Fluoropolymer insulations like PTFE are chemically passive and non-reactive, making them biocompatible and safe for direct clinical and diagnostic tools. They also survive repeated autoclave sterilization without drying or cracking.",
    specTableHeaders: ["Equipment", "Recommended Wire Gauge", "Insulation Class", "Conductor Plating"],
    specTableRows: [
      ["Diagnostic Probes", "30 AWG - 32 AWG", "Type ET (250V)", "Silver-Plated Copper (SPC)"],
      ["Surgical Instruments", "28 AWG", "Type E (600V)", "Nickel-Plated Copper (NPC)"],
      ["Autoclave Connectors", "PTFE Sleeving", "MIL-I-22129 / JSS 54802", "N/A (Tubing)"]
    ],
    body1: "Surgical and diagnostic tools are subjected to aggressive sanitation regimes, including high-pressure steam autoclaves and gas sterilization. PVC wires dry out, stiffen, and crack under these cycles. PTFE remains stable and maintains high dielectric resistance, protecting patients and sensitive micro-current amplifiers.",
    body2: "Our 32 AWG and 30 AWG sub-miniature wires allow medical equipment designers to pack complex multi-channel sensor arrays inside thin catheter lines and probes without sacrificing dielectric safety or wire flex-life.",
    recommendedProduct: { name: "View PTFE Sleevings", url: "/products/ptfe-sleevings" }
  },
  "atomic-energy": {
    title: "Atomic Energy & Reactor Cabling",
    subtitle: "Nuclear radiation stability, heat resistance, and long-life integrity.",
    whyFits: "Nuclear power stations demand wiring that can survive inside reactor chambers, handling high ambient temperatures and radiation fields. PTFE and FEP are highly stable polymers that do not oxidize or release halogens.",
    specTableHeaders: ["Plant Zone", "Recommended Wire Gauge", "Insulation Class", "Conductor Plating"],
    specTableRows: [
      ["Reactor Sensors", "18 AWG - 22 AWG", "Type EE (1000V)", "Nickel-Plated Copper (NPC)"],
      ["Control Panels", "22 AWG", "Type E (600V)", "Silver-Plated Copper (SPC)"],
      ["Coaxial Data Feeds", "RG-115 U", "MIL-C-17 Coaxial", "Silver-Plated Copper (SPC)"]
    ],
    body1: "Atomic reactor control rooms monitor thousands of data feeds. A single short-circuit due to melted insulation can trigger shutdowns. Our JSS 51004 conforming PTFE wires offer a continuous +260°C rating, providing high safety margins during thermal fluctuations.",
    body2: "Our cables are also manufactured to resist high physical pressures and are chemically inert to standard nuclear cooling fluids and demineralized water circuits, preventing copper corrosion over decades of service.",
    recommendedProduct: { name: "View Coaxial & Multicore Cables", url: "/products/cables" }
  },
  "satellite-ground-control": {
    title: "Satellite & Ground Control",
    subtitle: "Low outgassing, high-frequency telemetry, and vacuum stability.",
    whyFits: "Vacuum environments cause standard plastics to release volatile gases, which condense on optics and degrade sensors. PTFE has extremely low outgassing rates, making it vacuum-compatible.",
    specTableHeaders: ["Segment", "Recommended Wire Gauge", "Insulation Class", "Conductor Plating"],
    specTableRows: [
      ["Satellite Bus", "26 AWG - 28 AWG", "Type E (600V)", "Silver-Plated Copper (SPC)"],
      ["RF Antennas", "RG-196 A/U", "MIL-C-17 Coaxial", "Silver-Plated Copper (SPC)"],
      ["Solar Arrays", "10 AWG - 14 AWG", "Type EE (1000V)", "Nickel-Plated Copper (NPC)"]
    ],
    body1: "In space, there is no cooling air convection. Thermal management is dependent entirely on radiation, leading to localized heating. Wires near solar arrays see intense thermal stress. PTFE's continuous rating up to +260°C ensures the conductor does not short out.",
    body2: "For high-frequency RF downlinks, our silver-plated copper coaxial cables provide low dielectric loss (constant 2.1) to preserve weak telemetry signals as they travel through satellite transceiver lines.",
    recommendedProduct: { name: "View PTFE Hook-Up Wires", url: "/products/ptfe-wires" }
  },
  "furnace-oven": {
    title: "Furnace & Oven Wiring",
    subtitle: "Direct high-heat lead feeds, heaters, and heater loops.",
    whyFits: "Industrial furnaces and commercial ovens operate at continuous temperatures above +150°C. PTFE and FEP are the only flexible insulations that do not char or break down under direct exposure to these heat zones.",
    specTableHeaders: ["Zone", "Recommended Wire Gauge", "Insulation Class", "Conductor Plating"],
    specTableRows: [
      ["Heater Leads", "8 AWG - 12 AWG", "Type EE (1000V)", "Nickel-Plated Copper (NPC)"],
      ["Thermocouple Sensors", "24 AWG", "Type E (600V)", "Silver-Plated Copper (SPC)"],
      ["Exhaust Controls", "14 AWG", "Type E (600V)", "Nickel-Plated Copper (NPC)"]
    ],
    body1: "Oven and furnace heating coils draw high currents. The resulting electrical heat, combined with ambient temperatures, can melt standard wiring. Our 8 AWG and 10 AWG heavy-duty PTFE wires (Type EE) are rated for up to 75 Amps and are nickel-plated to handle up to +260°C.",
    body2: "Unlike glass-braided ceramic insulation, which is brittle and absorbs moisture, PTFE insulation is completely waterproof and resistant to grease and oils, preventing ground faults in food processing and metallurgy ovens.",
    recommendedProduct: { name: "View PTFE Hook-Up Wires", url: "/products/ptfe-wires" }
  },
  "motors-transformers": {
    title: "Motor & Transformer Lead Wire",
    subtitle: "Varnish bake resistance, corona prevention, and tight coil leads.",
    whyFits: "Winding lead wires are subjected to chemical solvents during varnish baking cycles. PTFE is chemically inert, meaning it does not soften or dissolve during varnish coating and baking.",
    specTableHeaders: ["Component", "Recommended Wire Gauge", "Insulation Class", "Conductor Plating"],
    specTableRows: [
      ["Transformer Leads", "14 AWG - 18 AWG", "Type EE (1000V)", "Silver-Plated Copper (SPC)"],
      ["Stator Coil Outputs", "12 AWG", "Type E (600V)", "Nickel-Plated Copper (NPC)"],
      ["Coil Phase Sleeves", "PTFE Sleeving", "MIL-I-22129 / JSS 54802", "N/A (Tubing)"]
    ],
    body1: "Electric motor windings generate intense thermal stress. Lead wires feeding the stator must withstand these temperatures and the physical stress of coil wrapping. The slick surface of PTFE allows wires to be pulled through stator slots without jacket tearing.",
    body2: "Our PTFE sleevings are also widely used as phase separators and slot liners. With a breakdown voltage rating of up to 17 kV/mm, our sleevings prevent corona breakdown and voltage leaks between phase coils.",
    recommendedProduct: { name: "View PTFE Sleevings", url: "/products/ptfe-sleevings" }
  },
  "chemical-processing": {
    title: "Chemical Processing Wiring",
    subtitle: "Corrosive chemical vapor immunity and fluid immersion.",
    whyFits: "PTFE is completely inert to aggressive chemical compounds, including sulfuric acid, caustic soda, organic solvents, and chlorine. It does not absorb moisture or react with corrosive gases.",
    specTableHeaders: ["Deployment", "Recommended Wire Gauge", "Insulation Class", "Conductor Plating"],
    specTableRows: [
      ["Acid Tank Sensors", "22 AWG - 24 AWG", "Type E (600V)", "Nickel-Plated Copper (NPC)"],
      ["Petrochemical Pumps", "16 AWG", "Type EE (1000V)", "Silver-Plated Copper (SPC)"],
      ["Process Instrumentation", "RG-196 A/U", "MIL-C-17 Coaxial", "Silver-Plated Copper (SPC)"]
    ],
    body1: "Chemical plants operate in highly corrosive atmospheres. Acid fumes destroy standard PVC and rubber wire coatings in weeks. PTFE tape-wrapped wires offer an impermeable shield that does not degrade, rot, or absorb moisture.",
    body2: "We also supply FEP extruded wires for pump controls. FEP's continuous extrusion allows long runs without splices, preventing chemical infiltration and protecting conductors from corrosion.",
    recommendedProduct: { name: "View FEP Extruded Wires", url: "/products/fep-wires" }
  }
};

export default async function ApplicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = APPLICATIONS.find(a => a.slug === slug);
  const content = APPLICATION_DATA[slug];

  if (!app || !content) {
    notFound();
  }

  const siteUrl = process.env.SITE_URL || 'https://www.jainpolymers.com';

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Applications",
        "item": `${siteUrl}/applications/${slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="relative bg-paper py-12 md:py-20 font-sans">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-ink/50 border-b border-ink/5 pb-4">
            <Link href="/" className="hover:text-cobalt">Home</Link>
            <ChevronRight className="w-3 h-3 text-swan-red" />
            <span className="text-ink font-bold">{content.title} Solutions</span>
          </div>

          {/* Heading */}
          <div className="border-b border-ink/10 pb-8 space-y-4">
            <div className="flex items-center gap-2 text-cobalt">
              <Factory className="w-5 h-5 text-swan-red" />
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold">
                APPLICATION PROFILE // SECTOR-SPECIFIC WIRE SOLUTIONS
              </span>
            </div>
            <h1 className="font-display font-black text-3xl md:text-4xl text-ink uppercase tracking-tight leading-none">
              {content.title}
            </h1>
            <p className="text-xs text-swan-red font-mono uppercase font-bold tracking-wide mt-1">
              {content.subtitle}
            </p>
            <p className="text-sm text-ink/70 leading-relaxed font-sans max-w-3xl pt-2">
              {content.whyFits}
            </p>
          </div>

          {/* Recommended Wire specs table */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40">Conductor Sizing & Plating Configurations</h3>
            <div className="overflow-x-auto border border-ink/10 rounded-xs bg-white shadow-3xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-ink text-paper font-mono uppercase tracking-wider text-[10px] border-b border-ink/15">
                    {content.specTableHeaders.map((h, idx) => (
                      <th key={idx} className="p-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/5 font-mono">
                  {content.specTableRows.map((row, rIdx) => (
                    <tr key={rIdx} className={`${rIdx % 2 === 1 ? 'bg-paper/50' : 'bg-white'} hover:bg-sky/10 transition-colors`}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className={`p-3 ${cIdx === 0 ? 'font-sans font-bold text-ink' : ''}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detailed analysis copy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="bg-white border border-ink/10 p-6 rounded-xs space-y-3 shadow-3xs">
              <h3 className="font-display font-bold text-sm uppercase text-cobalt tracking-wider border-b border-ink/5 pb-2">
                Operational Stress Demands
              </h3>
              <p className="text-xs text-ink/75 leading-relaxed font-sans">
                {content.body1}
              </p>
            </div>
            <div className="bg-white border border-ink/10 p-6 rounded-xs space-y-3 shadow-3xs">
              <h3 className="font-display font-bold text-sm uppercase text-cobalt tracking-wider border-b border-ink/5 pb-2">
                Conformance Criteria
              </h3>
              <p className="text-xs text-ink/75 leading-relaxed font-sans">
                {content.body2}
              </p>
            </div>
          </div>

          {/* Technical Reference Guides */}
          <div className="pt-12 border-t border-ink/10 space-y-6">
            <div>
              <span className="text-[9px] font-mono text-cobalt font-bold uppercase block mb-1">REFERENCE GUIDES</span>
              <h3 className="font-display font-black text-xl text-ink uppercase tracking-wider">
                Technical Reference Guides
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-ink/10 p-5 rounded-xs hover:border-cobalt transition-colors">
                <h4 className="font-display font-bold text-xs uppercase text-ink">
                  Material Comparison
                </h4>
                <p className="text-xs text-ink/60 mt-1 leading-relaxed">
                  Understand how PTFE, FEP, PVC, and Silicone differ in chemical resistance and thermal ratings.
                </p>
                <Link href="/resources/ptfe-vs-pvc-vs-fep-vs-silicone-wire-insulation" className="inline-block text-xs font-mono text-swan-red hover:underline mt-3 focus:outline-none">
                  Read Comparison →
                </Link>
              </div>

              <div className="bg-white border border-ink/10 p-5 rounded-xs hover:border-cobalt transition-colors">
                <h4 className="font-display font-bold text-xs uppercase text-ink">
                  Military Specs Explained
                </h4>
                <p className="text-xs text-ink/60 mt-1 leading-relaxed">
                  Detailed analysis of MIL-W-16878E and JSS 51004 standards for avionics and defence harness builds.
                </p>
                <Link href="/resources/mil-w-16878-jss-51004-hook-up-wire-explained" className="inline-block text-xs font-mono text-swan-red hover:underline mt-3 focus:outline-none">
                  Read Standards Guide →
                </Link>
              </div>

              <div className="bg-white border border-ink/10 p-5 rounded-xs hover:border-cobalt transition-colors">
                <h4 className="font-display font-bold text-xs uppercase text-ink">
                  Wire Gauge Sizing
                </h4>
                <p className="text-xs text-ink/60 mt-1 leading-relaxed">
                  Engineering calculations for current load capacities and continuous temperature derating.
                </p>
                <Link href="/resources/how-to-select-ptfe-hook-up-wire" className="inline-block text-xs font-mono text-swan-red hover:underline mt-3 focus:outline-none">
                  Read Selection Guide →
                </Link>
              </div>
            </div>
          </div>

          {/* Related product redirect */}
          <div className="pt-8 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="block text-[9px] font-mono text-ink/40 uppercase">Related Product catalog</span>
              <Link
                href={content.recommendedProduct.url}
                className="inline-flex items-center gap-2 text-xs font-mono text-swan-red hover:underline font-bold uppercase"
              >
                <span>{content.recommendedProduct.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <Link
              href="/contact"
              className="bg-ink hover:bg-cobalt text-paper font-mono text-xs uppercase tracking-widest py-3 px-6 rounded-xs flex items-center gap-2 cursor-pointer font-bold shadow-md transition-colors"
            >
              <span>Consult an R&D Specialist</span>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
