import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { COMPARISONS } from '../../../../content/ptfeWireSizes';
import { ChevronRight, ArrowRight, ShieldCheck, Scale, Award } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return COMPARISONS.map((comp) => ({
    slug: comp.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const comp = COMPARISONS.find(c => c.slug === slug);
  if (!comp) return {};

  return {
    title: `${comp.a} vs ${comp.b} Wire Insulation | Technical Spec Comparison`,
    description: `Detailed engineering comparison of ${comp.a} and ${comp.b} wire insulation. Compare temperature limits, dielectric constants, chemical resistance, and cost.`,
  };
}

// Substantive comparative content data dictionary to prevent thin/duplicate pages
interface ComparisonContent {
  h1: string;
  summary: string;
  headers: string[];
  rows: string[][];
  sections: { title: string; text: string }[];
  hubLink?: string;
}

const COMPARISON_DATA: Record<string, ComparisonContent> = {
  "ptfe-vs-pvc": {
    h1: "PTFE vs PVC Wire Insulation: Spec Comparison",
    summary: "Detailed comparison of PTFE (Teflon) and Polyvinyl Chloride (PVC) insulated equipment wires. Compare heat profiles, dielectric constants, fire hazards, and chemical tolerances.",
    headers: ["Property", "PTFE (Teflon)", "PVC (Standard)"],
    rows: [
      ["Service Temperature", "-65 °C to +260 °C", "-15 °C to +70 °C (105°C FRLS)"],
      ["Dielectric Constant", "2.1 (Stable)", "3.5 to 4.5 (Frequency dependent)"],
      ["Flame Propagancy", "Self-extinguishing (Non-toxic)", "Burns, emits toxic/corrosive HCl fumes"],
      ["Solder Iron Resistance", "Outstanding (No shrink/melt)", "Poor (Softens and shrinks immediately)"],
      ["Chemical Resistance", "Inert to virtually all solvents", "Degrades in solvents and oils"],
      ["Cut-Through Resistance", "Outstanding", "Fair"]
    ],
    sections: [
      {
        title: "Thermal limits & Fire Hazard",
        text: "The primary differentiator between PTFE and PVC is thermal limit. PTFE is rated continuously up to +260°C and stays stable. PVC softens at 70°C, and under electrical overload, it melts, propagates fire, and releases toxic halogenated fumes. For defense, aviation, and industrial loops, PTFE represents a permanent safety upgrade."
      },
      {
        title: "Electrical & Dielectric Behaviour",
        text: "PTFE possesses an exceptionally low dielectric constant (2.1) that remains virtually constant across the entire operating temperature and frequency range. In contrast, PVC exhibits a higher dielectric constant that fluctuates with frequency, causing signal attenuation and capacitive loss, which makes it unsuitable for high-frequency or RF circuits."
      },
      {
        title: "Mechanical Performance & Solder Endurance",
        text: "During harnessing, PVC wire shrinks back when touched by a soldering iron, exposing the bare conductor. PTFE is completely immune to soldering iron heat. PTFE also offers higher tensile strength and cut-through endurance. However, PVC is more flexible in cold rooms and is significantly less expensive, making it the default choice for low-cost consumer electronics."
      }
    ],
    hubLink: "/resources/ptfe-vs-pvc-vs-fep-vs-silicone"
  },
  "ptfe-vs-fep": {
    h1: "PTFE vs FEP Wire Insulation: Spec Comparison",
    summary: "Compare PTFE (Teflon) and Fluorinated Ethylene Propylene (FEP) fluoropolymer insulation. Learn about processing, temperature levels, high frequency capacity, and flexible routing.",
    headers: ["Property", "PTFE (Teflon)", "FEP"],
    rows: [
      ["Operating Temp", "-65 °C to +260 °C", "-65 °C to +200 °C"],
      ["Processing Method", "Tape-wrapped and sintered", "Melt-extruded (High-speed)"],
      ["Concentricity", "Tape layers (Extremely uniform)", "Extruded (Concentricity dependent)"],
      ["Dielectric Strength", "Outstanding", "Outstanding"],
      ["Transparency", "Opaque/Translucent", "High transparency"],
      ["Continuous Lengths", "Medium (dependent on tape length)", "Very long (Continuous extrusion)"]
    ],
    sections: [
      {
        title: "Continuous Heat and Melting Point",
        text: "Both materials are high-performance fluoropolymers sharing similar chemical and electrical advantages. However, PTFE stands up to +260°C continuously, while FEP is rated up to +200°C. PTFE does not flow when melting; instead, it transitions to a gel state. FEP is a true thermoplastic that melts and flows, allowing melt-extrusion processing."
      },
      {
        title: "Processing Methods: Tape-Wrap vs Extrusion",
        text: "PTFE insulation is applied by wrapping sintered or unsintered tapes around the conductor and sintering it in vertical ovens. This creates a highly uniform, stress-free wall thickness. FEP is melt-extruded at high speed, making FEP ideal for high-volume production, extremely thin-walled wires, and long continuous lengths without splice points."
      },
      {
        title: "High-Frequency & RF Performance",
        text: "Both PTFE and FEP are excellent for RF and microwave telemetry because of their low dielectric loss. However, FEP is often chosen for coaxial cable jackets and miniature wire bundles because its extruded nature allows tighter concentricity control over long distances, which prevents impedance fluctuations in high-speed data feeds."
      }
    ],
    hubLink: "/resources/ptfe-vs-pvc-vs-fep-vs-silicone"
  },
  "ptfe-vs-silicone": {
    h1: "PTFE vs Silicone Wire Insulation: Spec Comparison",
    summary: "Compare PTFE (Teflon) and Silicone insulated wires. Learn about flexibility vs tear strength, continuous operating limits, and voltage ratings.",
    headers: ["Property", "PTFE (Teflon)", "Silicone Rubber"],
    rows: [
      ["Continuous Temp", "-65 °C to +260 °C", "-60 °C to +200 °C"],
      ["Flexibility", "Stiff / Semi-rigid", "Extremely flexible / Elastomeric"],
      ["Tear Strength", "Excellent", "Poor (Gashes easily)"],
      ["Dielectric Constant", "2.1 (Very low)", "3.0 to 3.2"],
      ["Space / Wall Thickness", "Thin-wall (ET: 0.15mm)", "Thicker wall (High voltage insulation)"],
      ["High-Voltage Rating", "Excellent in thin walls", "Outstanding (commonly used for kV leads)"]
    ],
    sections: [
      {
        title: "Flex-Life vs Mechanical Ruggedness",
        text: "Silicone rubber is a true elastomer, meaning it is highly flexible and returns to shape after severe bending. This makes it the benchmark for high-heat moving machinery. However, silicone has very low tear strength and cuts easily, whereas PTFE offers outstanding mechanical cut-through resistance and toughness under abrasion."
      },
      {
        title: "Wall Thickness and Space Economy",
        text: "PTFE's high dielectric strength allows very thin wall structures (such as Type ET at 0.15mm insulation wall), making it perfect for dense backplanes. Silicone requires a thicker insulation wall to prevent dielectric breakdown, which increases the wire's outer diameter. Choose PTFE for compact instrumentation and silicone for thick, flexible power cables."
      },
      {
        title: "Thermal Stability & Braiding Requirements",
        text: "Both materials handle high temperatures (+200°C to +260°C). Due to silicone's soft mechanical profile, silicone-insulated wires often require an outer glass-fiber braid or sleeve to protect the core from cutting, which adds to cost and diameter. PTFE is self-supporting and does not require protective braiding under standard environments."
      }
    ],
    hubLink: "/resources/ptfe-vs-pvc-vs-fep-vs-silicone"
  },
  "fep-vs-pvc": {
    h1: "FEP vs PVC Wire Insulation: Spec Comparison",
    summary: "Compare Fluorinated Ethylene Propylene (FEP) and Polyvinyl Chloride (PVC) wire insulation. Learn about high-temp rating vs general purpose costs.",
    headers: ["Property", "FEP", "PVC"],
    rows: [
      ["Operating Temp", "-65 °C to +200 °C", "-15 °C to +70 °C"],
      ["Dielectric Constant", "2.1", "3.5 - 4.5"],
      ["Chemical Resistance", "Outstanding (Inert)", "Fair to Poor"],
      ["Processing", "Melt-extruded", "Extruded"],
      ["Cost Factor", "High", "Low"],
      ["Acid/Solvent Endurance", "Immune", "Dissolves in ketones/esters"]
    ],
    sections: [
      {
        title: "Industrial & Laboratory Environments",
        text: "FEP insulated wires are widely specified for laboratory instrumentation and industrial sensor wiring because FEP is chemically inert to acids, bases, and organic solvents. PVC insulation swells and dissolves when exposed to aggressive industrial chemicals, which causes insulation thinning and eventual short-circuits."
      },
      {
        title: "Signal Propagation Speed",
        text: "Because FEP has a low dielectric constant (2.1), signals travel faster through it than through PVC (which has a dielectric constant around 4). This low capacitance makes FEP the preferred insulation for high-speed digital communications, sensor telemetry, and telecom switching devices where signal distortion must be prevented."
      }
    ],
    hubLink: "/resources/ptfe-vs-pvc-vs-fep-vs-silicone"
  },
  "silver-vs-nickel-plated-copper": {
    h1: "Silver vs Nickel Plated Copper Conductors: Spec Comparison",
    summary: "Compare Silver-Plated Copper (SPC) and Nickel-Plated Copper (NPC) conductors for high-temperature wires. Learn about heat limits and solderability.",
    headers: ["Property", "Silver-Plated Copper (SPC)", "Nickel-Plated Copper (NPC)"],
    rows: [
      ["Continuous Temp Limit", "+200 °C", "+260 °C"],
      ["Electrical Conductivity", "100% IACS (Excellent)", "90% - 93% IACS"],
      ["Solderability", "Outstanding (Standard flux)", "Requires active/special flux"],
      ["Corrosion Resistance", "Good (Prone to red-plague at high humidity)", "Outstanding (Immune to oxidation)"],
      ["Relative Cost", "High", "Medium-High"],
      ["Flexibility", "Excellent", "Slightly stiffer than SPC"]
    ],
    sections: [
      {
        title: "Upper Temperature Thresholds",
        text: "The selection between SPC and NPC is driven entirely by the operating temperature of the wire's environment. Silver plating oxidation becomes rapid above +200°C, leading to conductor degradation. Nickel plating does not oxidize and remains stable up to +260°C continuously, which makes NPC mandatory for aerospace turbine connections."
      },
      {
        title: "Solderability and Termination speed",
        text: "SPC wires are highly favored by assembly line operators because silver has a high affinity for solder. SPC can be terminated quickly using standard lead or lead-free solders and mild fluxes. Nickel is chemically passive and requires higher heat and active acid fluxes to achieve a reliable solder joint, which makes crimping the preferred termination for NPC."
      }
    ],
    hubLink: "/resources/mil-w-16878-jss-51004-explained"
  },
  "solid-vs-stranded-hook-up-wire": {
    h1: "Solid vs Stranded Hook-Up Wire: Spec Comparison",
    summary: "Compare solid and stranded conductors for hook-up and equipment wiring. Learn about flexibility, termination speed, and skin effects.",
    headers: ["Property", "Solid Conductor", "Stranded Conductor"],
    rows: [
      ["Flexibility", "Rigid (Single bend only)", "High (Repeated bending)"],
      ["Flex Life", "Low (Prone to work-hardening)", "Excellent"],
      ["Termination", "Ideal for wire-wrap / breadboards", "Ideal for crimping / solder loops"],
      ["Skin Effect (RF)", "Higher attenuation at GHz", "Better flexibility, standard RF"],
      ["Cost", "Slightly Lower", "Higher (Drawing multiple strands)"],
      ["Mechanical Size", "Compact (No air gaps)", "Slightly larger overall diameter"]
    ],
    sections: [
      {
        title: "Vibration & Work-Hardening Failures",
        text: "Solid wire is constructed from a single metal rod. While it is easy to route and holds its shape, it work-hardens and snaps under vibration. Stranded wire bundles multiple small-diameter strands (e.g. 19/34 stranding) together. This stranding distributes mechanical stress, allowing the wire to bend repeatedly and survive high-vibration aerospace environments."
      },
      {
        title: "Conductor Diameter and Space Constraints",
        text: "Solid wire has no air gaps, which gives it the smallest possible outer diameter for a given conductor cross-section. Stranded conductors contain tiny air gaps between the strands, making the overall core diameter slightly larger. In extremely dense instrument backplanes, solid wires (like 30 AWG wire-wrap) are specified to save space."
      }
    ],
    hubLink: "/resources/how-to-select-ptfe-hook-up-wire"
  }
};

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comp = COMPARISONS.find(c => c.slug === slug);
  const content = COMPARISON_DATA[slug];

  if (!comp || !content) {
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
        "name": "Compare",
        "item": `${siteUrl}/compare/${slug}`
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
            <span className="text-ink font-bold">{comp.a} vs {comp.b} Specification Comparison</span>
          </div>

          {/* Heading */}
          <div className="border-b border-ink/10 pb-8 space-y-4">
            <div className="flex items-center gap-2 text-cobalt">
              <Scale className="w-5 h-5 text-swan-red" />
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold">
                MATERIAL METRICS // COMPARATIVE SPEC SHEET
              </span>
            </div>
            <h1 className="font-display font-black text-3xl md:text-4xl text-ink uppercase tracking-tight leading-none">
              {content.h1}
            </h1>
            <p className="text-sm text-ink/70 leading-relaxed font-sans max-w-3xl">
              {content.summary}
            </p>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto border border-ink/10 rounded-xs bg-white shadow-3xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-ink text-paper font-mono uppercase tracking-wider text-[10px] border-b border-ink/15">
                  {content.headers.map((h, idx) => (
                    <th key={idx} className="p-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5 font-mono">
                {content.rows.map((row, rIdx) => (
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

          {/* Analysis copy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {content.sections.map((sect, sIdx) => (
              <div key={sIdx} className="bg-white border border-ink/10 p-6 rounded-xs space-y-3 shadow-3xs">
                <h3 className="font-display font-bold text-sm uppercase text-cobalt tracking-wider border-b border-ink/5 pb-2">
                  {sect.title}
                </h3>
                <p className="text-xs text-ink/75 leading-relaxed font-sans">
                  {sect.text}
                </p>
              </div>
            ))}
          </div>

          {/* Actions & Hub Links */}
          <div className="pt-8 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            {content.hubLink ? (
              <div className="space-y-1">
                <span className="block text-[9px] font-mono text-ink/40 uppercase">Long-form Hub Guide</span>
                <Link
                  href={content.hubLink}
                  className="inline-flex items-center gap-2 text-xs font-mono text-swan-red hover:underline font-bold uppercase"
                >
                  <span>Read full comparison analysis guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-1">
                <span className="block text-[9px] font-mono text-ink/40 uppercase">Related technical sheets</span>
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-2 text-xs font-mono text-cobalt hover:underline font-bold uppercase"
                >
                  <span>Browse all technical guides</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            <Link
              href="/contact"
              className="bg-ink hover:bg-cobalt text-paper font-mono text-xs uppercase tracking-widest py-3 px-6 rounded-xs flex items-center gap-2 cursor-pointer font-bold shadow-md transition-colors"
            >
              <span>Consult an Engineer</span>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
