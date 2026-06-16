import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { STANDARDS } from '../../../../content/ptfeWireSizes';
import { ChevronRight, ArrowRight, ShieldCheck, FileText, Award } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return STANDARDS.map((std) => ({
    slug: std.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const std = STANDARDS.find(s => s.slug === slug);
  if (!std) return {};

  return {
    title: `${std.name} Specification Sheet | JSS Conformance & Ratings`,
    description: `Learn about the ${std.name} standard details: scope, voltage ratings, testing parameters, and equivalent JSS/MIL specifications for high-temperature wires.`,
  };
}

interface StandardContent {
  title: string;
  scope: string;
  mapping: string;
  ratingsHeaders: string[];
  ratingsRows: string[][];
  body1: string;
  body2: string;
  recommendedProduct: { name: string; url: string };
  articleLink?: string;
}

const STANDARD_DATA: Record<string, StandardContent> = {
  "mil-w-16878e": {
    title: "MIL-W-16878E Specification Sheet",
    scope: "US Military standard covering unshielded, single-conductor electrical hook-up and lead wires for electronic equipment and avionics.",
    mapping: "Equates directly to NEMA HP3 (commercial) and matches the testing profiles of JSS 51004 (Indian Defence specification).",
    ratingsHeaders: ["Type Designation", "Voltage Rating (AC RMS)", "Insulation Thickness", "Dielectric Test (AC)"],
    ratingsRows: [
      ["Type ET", "250 V", "0.15 mm", "1,500 V"],
      ["Type E", "600 V", "0.25 mm", "2,000 V"],
      ["Type EE", "1,000 V", "0.38 mm", "3,000 V"]
    ],
    body1: "MIL-W-16878E (now maintained under NEMA HP3) defines the standard specifications for high-temperature hook-up wires used in flight computers, weapon systems, and military instrumentation. The specification classifies wires based on their insulation wall thickness, which determines the maximum operational voltage class (ET, E, or EE).",
    body2: "It requires conductors to be silver-plated (SPC) for environments up to +200°C and nickel-plated (NPC) for up to +260°C. Conductor stranding must meet specific counts (e.g. 7-strand or 19-strand structures) to verify flexibility and flex-life under military flight vibrations.",
    recommendedProduct: { name: "View PTFE Hook-Up Wires Catalog", url: "/products/ptfe-wires" },
    articleLink: "/resources/mil-w-16878-jss-51004-explained"
  },
  "jss-51004": {
    title: "JSS 51004 Specification Sheet",
    scope: "Indian Defence standard (Joint Services Specification) defining equipment wires, hook-up wires, and electrical wires with PTFE insulation.",
    mapping: "Matches the construction, dimensional tolerances, and electrical stress limits of US standard MIL-W-16878E.",
    ratingsHeaders: ["JSS Type", "Voltage Class (RMS)", "Insulation Nominal Wall", "Spark Test (AC)"],
    ratingsRows: [
      ["Type ET", "250 V", "0.15 mm", "2,500 V"],
      ["Type E", "600 V", "0.25 mm", "3,400 V"],
      ["Type EE", "1,000 V", "0.38 mm", "5,000 V"]
    ],
    body1: "JSS 51004 is maintained by the Directorate of Standardisation, Ministry of Defence, Government of India. This standard is mandatory for all procurement loops inside the Indian Army, Air Force, and Navy. It classifies single-core PTFE hook-up wires into Types ET, E, and EE, matching the MIL-W-16878 series.",
    body2: "JSS 51004 demands rigorous post-sintering electrical tests, including continuous inline spark testing and dielectric water bath immersion tests. Wires must pass these tests without breakdown to be certified for defense supply chains.",
    recommendedProduct: { name: "View PTFE Hook-Up Wires Catalog", url: "/products/ptfe-wires" },
    articleLink: "/resources/mil-w-16878-jss-51004-explained"
  },
  "mil-c-17": {
    title: "MIL-C-17 Specification Sheet",
    scope: "US Military standard covering high-frequency coaxial, triaxial, and multi-core cables with low dielectric loss for RF transmission.",
    mapping: "Equates to JSS 51100 (Indian Defence specification) for military radio frequency communication cables.",
    ratingsHeaders: ["RG Designation", "Nominal Impedance", "Dielectric O.D.", "Max Operating Frequency"],
    ratingsRows: [
      ["RG-196 A/U", "50 Ω", "0.86 mm", "10 GHz"],
      ["RG-188 A/U", "50 Ω", "1.52 mm", "10 GHz"],
      ["RG-115 U", "50 Ω", "4.70 mm", "10 GHz"]
    ],
    body1: "MIL-C-17 defines the mechanical and electrical parameters for radio frequency coaxial cables. It requires the dielectric to be made of high-purity solid PTFE or extruded FEP, which maintains a stable dielectric constant (2.1) and low attenuation levels across microwave frequencies up to 10 GHz.",
    body2: "The standard also regulates shielding braid coverage (such as silver-plated copper braids) and outer jacket materials (such as FEP or glass braids) to protect cables from humidity, mechanical stress, and chemical solvents.",
    recommendedProduct: { name: "View Coaxial & Multicore Cables", url: "/products/cables" }
  },
  "mil-i-22129": {
    title: "MIL-I-22129 Specification Sheet",
    scope: "Military specification covering flexible, high-temperature PTFE electrical insulating tubing (sleevings).",
    mapping: "Equates to JSS 54802 (Indian Defence specification) for military electronics and cable harness insulation.",
    ratingsHeaders: ["Tubing Grade", "Bore Diameter Range", "Wall Thickness", "Dielectric Strength"],
    ratingsRows: [
      ["Thin Wall", "0.30 to 30.0 mm", "0.15 to 0.38 mm", "15 kV/mm"],
      ["Standard Wall", "0.30 to 30.0 mm", "0.20 to 0.50 mm", "17 kV/mm"],
      ["Light Wall", "0.30 to 30.0 mm", "0.10 to 0.25 mm", "12 kV/mm"]
    ],
    body1: "MIL-I-22129 (associated with ASTM D3295) covers flexible, non-shrinkable PTFE tubing used for insulating wire splices, stator leads, and components inside high-temperature machinery. The tubing must withstand a continuous temperature range of -65 °C to +260 °C.",
    body2: "It requires the tubing to be chemically inert, flame-resistant, and free from micro-pinholes. Post-extrusion testing includes measuring breakdown voltage and assessing mechanical flexibility under thermal aging.",
    recommendedProduct: { name: "View PTFE Sleevings Catalog", url: "/products/ptfe-sleevings" }
  }
};

export default async function StandardPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const std = STANDARDS.find(s => s.slug === slug);
  const content = STANDARD_DATA[slug];

  if (!std || !content) {
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
        "name": "Standards",
        "item": `${siteUrl}/standards/${slug}`
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
            <span className="text-ink font-bold">{std.name} Standard Specification</span>
          </div>

          {/* Heading */}
          <div className="border-b border-ink/10 pb-8 space-y-4">
            <div className="flex items-center gap-2 text-cobalt">
              <Award className="w-5 h-5 text-swan-red" />
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold">
                MILITARY STANDARDS // CONFORMANCE SPECIFICATION SHEET
              </span>
            </div>
            <h1 className="font-display font-black text-3xl md:text-4xl text-ink uppercase tracking-tight leading-none">
              {content.title}
            </h1>
            <p className="text-sm text-ink/75 leading-relaxed font-sans max-w-3xl pt-2">
              <strong>Scope:</strong> {content.scope}
            </p>
            <p className="text-xs text-cobalt font-mono uppercase font-bold mt-1">
              <strong>Equivalencies:</strong> {content.mapping}
            </p>
          </div>

          {/* Ratings table */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40">Specification Ratings Matrix</h3>
            <div className="overflow-x-auto border border-ink/10 rounded-xs bg-white shadow-3xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-ink text-paper font-mono uppercase tracking-wider text-[10px] border-b border-ink/15">
                    {content.ratingsHeaders.map((h, idx) => (
                      <th key={idx} className="p-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/5 font-mono">
                  {content.ratingsRows.map((row, rIdx) => (
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
                Conductor & Material Criteria
              </h3>
              <p className="text-xs text-ink/75 leading-relaxed font-sans">
                {content.body1}
              </p>
            </div>
            <div className="bg-white border border-ink/10 p-6 rounded-xs space-y-3 shadow-3xs">
              <h3 className="font-display font-bold text-sm uppercase text-cobalt tracking-wider border-b border-ink/5 pb-2">
                Testing Protocols & Quality
              </h3>
              <p className="text-xs text-ink/75 leading-relaxed font-sans">
                {content.body2}
              </p>
            </div>
          </div>

          {/* Actions & Hub Links */}
          <div className="pt-8 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            {content.articleLink ? (
              <div className="space-y-1">
                <span className="block text-[9px] font-mono text-ink/40 uppercase">Related Technical Resource</span>
                <Link
                  href={content.articleLink}
                  className="inline-flex items-center gap-2 text-xs font-mono text-swan-red hover:underline font-bold uppercase"
                >
                  <span>Read JSS & MIL-SPEC detailed guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-1">
                <span className="block text-[9px] font-mono text-ink/40 uppercase">Related Technical Sheet</span>
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-2 text-xs font-mono text-cobalt hover:underline font-bold uppercase"
                >
                  <span>Browse all technical guides</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            <div className="flex gap-3">
              <Link
                href={content.recommendedProduct.url}
                className="border border-ink/20 hover:border-ink bg-white text-ink font-mono text-xs uppercase tracking-widest py-3 px-6 rounded-xs flex items-center gap-2 cursor-pointer font-bold transition-all"
              >
                <span>View Products</span>
              </Link>
              <Link
                href="/contact"
                className="bg-ink hover:bg-cobalt text-paper font-mono text-xs uppercase tracking-widest py-3 px-6 rounded-xs flex items-center gap-2 cursor-pointer font-bold shadow-md transition-all"
              >
                <span>Submit Spec Quote</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
