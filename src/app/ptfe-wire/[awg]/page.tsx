import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PTFE_WIRE_SIZES } from '../../../../content/ptfeWireSizes';
import { ChevronRight, ArrowRight, ShieldCheck, Zap, Shield, HelpCircle } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return PTFE_WIRE_SIZES.map((wire) => ({
    awg: wire.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ awg: string }> }): Promise<Metadata> {
  const { awg } = await params;
  const wire = PTFE_WIRE_SIZES.find(w => w.slug === awg);
  if (!wire) return {};

  return {
    title: `${wire.awg} AWG PTFE / Teflon Hook-Up Wire — Specs & Current Rating`,
    description: `Technical specifications for ${wire.awg} AWG PTFE insulated hook-up wire: ${wire.strands} stranding, ${wire.currentA}A current rating, ${wire.voltageClasses.join('/')} voltage classes, and conductor resistance.`,
  };
}

export default async function PtfeWireGaugePage({ params }: { params: Promise<{ awg: string }> }) {
  const { awg } = await params;
  const currentIndex = PTFE_WIRE_SIZES.findIndex(w => w.slug === awg);
  if (currentIndex === -1) {
    notFound();
  }

  const current = PTFE_WIRE_SIZES[currentIndex];
  const prev = currentIndex > 0 ? PTFE_WIRE_SIZES[currentIndex - 1] : null;
  const next = currentIndex < PTFE_WIRE_SIZES.length - 1 ? PTFE_WIRE_SIZES[currentIndex + 1] : null;

  const siteUrl = process.env.SITE_URL || 'https://www.jainpolymers.com';

  // Product JSON-LD Schema
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${current.awg} AWG PTFE Hook-Up Wire`,
    "image": `${siteUrl}/brand/crops/photo_wire_coils_bundles.jpg`,
    "description": `High-performance ${current.awg} AWG PTFE insulated single-core hook-up wire conforming to MIL-W-16878E and JSS 51004. Stranding: ${current.strands}, current rating: ${current.currentA} Amps.`,
    "brand": {
      "@type": "Brand",
      "name": "Jain Polymer Co."
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": "15.00",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Jain Polymer Co."
      }
    }
  };

  // FAQ Page Schema
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the current rating for ${current.awg} AWG PTFE wire?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Under nominal operating conditions, ${current.awg} AWG PTFE insulated hook-up wire is rated for a continuous current carrying capacity of up to ${current.currentA} Amps.`
        }
      },
      {
        "@type": "Question",
        "name": `Which standards does ${current.awg} AWG PTFE wire conform to?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Our ${current.awg} AWG PTFE wire is manufactured strictly to military standard MIL-W-16878E (dual-rated to NEMA HP3) and JSS 51004 (Indian Defence specification).`
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="relative bg-paper py-12 md:py-20 font-sans">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-ink/50 border-b border-ink/5 pb-4">
            <Link href="/" className="hover:text-cobalt">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products" className="hover:text-cobalt">Products</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products/ptfe-wires" className="hover:text-cobalt">PTFE Wires</Link>
            <ChevronRight className="w-3 h-3 text-swan-red" />
            <span className="text-ink font-bold">{current.awg} AWG Spec Page</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Specs Summary & Comparison Card */}
            <div className="lg:col-span-8 space-y-8 bg-white border border-ink/10 p-6 md:p-10 rounded-xs shadow-xs">
              <div className="border-b border-ink/10 pb-6 space-y-3">
                <span className="text-[10px] font-mono tracking-widest text-cobalt uppercase font-bold bg-sky/35 px-2 py-0.5 rounded-xs inline-block">
                  TECHNICAL DATASHEET // WIRE GAUGE SPECIFICATION
                </span>
                <h1 className="font-display font-black text-3xl md:text-4xl text-ink uppercase tracking-tight leading-none">
                  {current.awg} AWG PTFE Hook-Up Wire
                </h1>
                <p className="text-xs text-swan-red font-mono uppercase font-bold">
                  MIL-W-16878E / JSS 51004 Conforming
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="border border-ink/5 p-4 bg-paper/30 rounded-xs">
                  <span className="block text-[9px] font-mono text-ink/40 uppercase">Stranding</span>
                  <span className="block text-base font-mono font-bold text-ink">{current.strands}</span>
                </div>
                <div className="border border-ink/5 p-4 bg-paper/30 rounded-xs">
                  <span className="block text-[9px] font-mono text-ink/40 uppercase">Conductor Dia.</span>
                  <span className="block text-base font-mono font-bold text-ink">{current.conductorDiaMm.toFixed(2)} mm</span>
                </div>
                <div className="border border-ink/5 p-4 bg-paper/30 rounded-xs">
                  <span className="block text-[9px] font-mono text-ink/40 uppercase">Cross-section Area</span>
                  <span className="block text-base font-mono font-bold text-ink">{current.areaMm2.toFixed(3)} mm²</span>
                </div>
                <div className="border border-ink/5 p-4 bg-paper/30 rounded-xs">
                  <span className="block text-[9px] font-mono text-ink/40 uppercase">Max O.D. (EE Class)</span>
                  <span className="block text-base font-mono font-bold text-ink">{current.maxOdEeMm.toFixed(2)} mm</span>
                </div>
              </div>

              {/* Electrical limits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-ink/5">
                <div className="bg-ink text-paper p-5 rounded-xs space-y-2">
                  <div className="flex items-center gap-2 text-swan-red">
                    <Zap className="w-4 h-4 fill-current" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">Current Rating</span>
                  </div>
                  <span className="block text-3xl font-display font-black text-white">{current.currentA} Amps</span>
                  <span className="block text-[9px] font-mono text-white/40 uppercase leading-tight">
                    *Continuous load rating in open air at 25 °C ambient
                  </span>
                </div>
                <div className="border border-ink/10 p-5 rounded-xs space-y-2">
                  <div className="flex items-center gap-2 text-cobalt">
                    <Shield className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-ink/40">Conductor Resistance</span>
                  </div>
                  <span className="block text-3xl font-display font-black text-ink">{current.resistanceOhmPerKm} Ω/km</span>
                  <span className="block text-[9px] font-mono text-ink/40 uppercase leading-tight">
                    *Maximum DC resistance at 20 °C
                  </span>
                </div>
              </div>

              {/* Context Rating Row vs Adjacent Sizes */}
              <div className="space-y-4 pt-6 border-t border-ink/10">
                <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40">Relative Context Row vs Next Sizes</h3>
                <div className="overflow-x-auto border border-ink/10 rounded-xs bg-white">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-paper font-mono uppercase text-[9px] tracking-wider border-b border-ink/10">
                        <th className="p-3">Gauge</th>
                        <th className="p-3">Stranding</th>
                        <th className="p-3">Conductor Dia.</th>
                        <th className="p-3">Resistance</th>
                        <th className="p-3 text-right">Current Rating</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink/5 font-mono">
                      {prev && (
                        <tr className="text-ink/50 hover:bg-sky/5 transition-colors">
                          <td className="p-3"><Link href={`/ptfe-wire/${prev.slug}`} className="hover:underline">{prev.awg} AWG (Larger)</Link></td>
                          <td className="p-3">{prev.strands}</td>
                          <td className="p-3">{prev.conductorDiaMm.toFixed(2)} mm</td>
                          <td className="p-3">{prev.resistanceOhmPerKm} Ω/km</td>
                          <td className="p-3 text-right">{prev.currentA} A</td>
                        </tr>
                      )}
                      <tr className="bg-sky/15 text-ink font-bold">
                        <td className="p-3">{current.awg} AWG (Current)</td>
                        <td className="p-3">{current.strands}</td>
                        <td className="p-3">{current.conductorDiaMm.toFixed(2)} mm</td>
                        <td className="p-3">{current.resistanceOhmPerKm} Ω/km</td>
                        <td className="p-3 text-right text-swan-red">{current.currentA} A</td>
                      </tr>
                      {next && (
                        <tr className="text-ink/50 hover:bg-sky/5 transition-colors">
                          <td className="p-3"><Link href={`/ptfe-wire/${next.slug}`} className="hover:underline">{next.awg} AWG (Smaller)</Link></td>
                          <td className="p-3">{next.strands}</td>
                          <td className="p-3">{next.conductorDiaMm.toFixed(2)} mm</td>
                          <td className="p-3">{next.resistanceOhmPerKm} Ω/km</td>
                          <td className="p-3 text-right">{next.currentA} A</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* Right Information & CTA Column */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Common applications */}
              <div className="bg-white border border-ink/10 p-6 rounded-xs space-y-4">
                <h4 className="font-display font-bold text-xs uppercase text-ink tracking-wider border-b border-ink/5 pb-2">
                  Target Deployments
                </h4>
                <div className="space-y-3">
                  {current.commonUses.map((use, idx) => (
                    <div key={idx} className="flex gap-2 text-xs text-ink/80 leading-relaxed font-sans">
                      <ShieldCheck className="w-4 h-4 text-swan-red shrink-0 mt-0.5" />
                      <span className="first-letter:capitalize">{use}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selection Note */}
              <div className="bg-white border border-ink/10 p-6 rounded-xs space-y-3 text-xs text-ink/75 leading-relaxed font-sans">
                <h4 className="font-display font-bold uppercase text-ink text-xs tracking-wider border-b border-ink/5 pb-2">
                  Selection Notes
                </h4>
                <p>
                  This {current.awg} AWG size is manufactured by wrapping high-density unsintered PTFE tapes around the {current.strands} stranded conductor, followed by precision oven sintering. This produces an extremely concentric, pinhole-free insulation wall.
                </p>
                <p>
                  Specify **Type ET** (250V AC) for sub-miniature avionics, **Type E** (600V AC) for general purpose military and instrumentation loops, and **Type EE** (1000V AC) for industrial switchgears.
                </p>
              </div>

              {/* Quick RFQ CTA */}
              <div className="bg-cobalt text-paper p-6 rounded-xs space-y-4 shadow-md">
                <h3 className="font-display font-black text-lg text-white uppercase tracking-wider leading-tight">
                  Configuring {current.awg} AWG for an RFQ?
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  We custom compound colors and cut length packages matching your blueprints. Conforms fully to JSS 51004 & MIL-W-16878E.
                </p>
                <Link
                  href={`/contact?awg=${current.awg}`}
                  className="bg-swan-red hover:bg-swan-red/90 text-white font-mono text-xs uppercase tracking-widest py-3.5 px-4 rounded-xs text-center flex items-center justify-between gap-4 transition-all group font-bold shadow-sm"
                >
                  <span>Request RFQ For This Size</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

            </div>

          </div>

          {/* Reference Guides Section */}
          <div className="pt-12 border-t border-ink/10 space-y-6">
            <div>
              <span className="text-[9px] font-mono text-cobalt font-bold uppercase block mb-1">REFERENCE GUIDES</span>
              <h3 className="font-display font-black text-xl text-ink uppercase tracking-wider">
                Technical Knowledge Library
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-ink/10 p-5 rounded-xs hover:border-cobalt transition-colors">
                <span className="text-[9px] font-mono uppercase bg-cobalt/10 text-cobalt px-2 py-0.5 rounded-full font-bold">
                  Sizing Guide
                </span>
                <h4 className="font-display font-bold text-sm uppercase text-ink mt-2">
                  Select Wire Gauges
                </h4>
                <p className="text-xs text-ink/60 mt-1 leading-relaxed">
                  Understand wire gauge engineering formulas, current carrying capacities, and cross-section parameters.
                </p>
                <Link href="/resources/how-to-select-ptfe-hook-up-wire" className="inline-block text-xs font-mono text-swan-red hover:underline mt-3 focus:outline-none">
                  Read Sizing Guide →
                </Link>
              </div>

              <div className="bg-white border border-ink/10 p-5 rounded-xs hover:border-cobalt transition-colors">
                <span className="text-[9px] font-mono uppercase bg-cobalt/10 text-cobalt px-2 py-0.5 rounded-full font-bold">
                  Military Standards
                </span>
                <h4 className="font-display font-bold text-sm uppercase text-ink mt-2">
                  MIL-W-16878 vs JSS 51004
                </h4>
                <p className="text-xs text-ink/60 mt-1 leading-relaxed">
                  Deep dive into testing protocols, spark tests, and thermal endurance limits for defense cables.
                </p>
                <Link href="/resources/mil-w-16878-jss-51004-hook-up-wire-explained" className="inline-block text-xs font-mono text-swan-red hover:underline mt-3 focus:outline-none">
                  Read Standards Guide →
                </Link>
              </div>

              <div className="bg-white border border-ink/10 p-5 rounded-xs hover:border-cobalt transition-colors">
                <span className="text-[9px] font-mono uppercase bg-cobalt/10 text-cobalt px-2 py-0.5 rounded-full font-bold">
                  Material Chemistry
                </span>
                <h4 className="font-display font-bold text-sm uppercase text-ink mt-2">
                  Fluoropolymers vs Silicon
                </h4>
                <p className="text-xs text-ink/60 mt-1 leading-relaxed">
                  Physical and chemical comparison of PTFE, FEP, PVC, and Silicone rubber insulation characteristics.
                </p>
                <Link href="/resources/ptfe-vs-pvc-vs-fep-vs-silicone-wire-insulation" className="inline-block text-xs font-mono text-swan-red hover:underline mt-3 focus:outline-none">
                  Compare Materials →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
