import React from 'react';
import Image from 'next/image';
import { History, ShieldCheck, Factory, Award } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PTFE Wire & Cable Manufacturer | Jain Polymer Co. Heritage',
  description: 'Established in 1991 by Shri S.K. Jain, Jain Polymer Co. manufactures premium high-temperature PTFE/Teflon and FEP wires and cables in Rohtak, Haryana.',
};

export default function AboutPage() {
  const milestones = [
    { year: '1991', title: 'FOUNDATION', desc: 'Jain Polymer Co. established in Rohtak, Haryana by Shri S.K. Jain, initiating high-temperature wire compounding.' },
    { year: '1996', title: 'MoD TYPE APPROVAL', desc: 'Awarded formal Electronic Components Standardization Organisation (L.C.S.O) Type Approval for PTFE Equipment Wires under JSS 51004.' },
    { year: '2002', title: 'C-DOT APPROVED STATUS', desc: 'Certified by the Centre for Development of Telematics (C-DOT) for high-density telecom switching exchange cabling.' },
    { year: '2010', title: 'FEP EXTRUSION CAPACITY', desc: 'Commissioned specialized melt-extrusion machinery to manufacture continuous long-length FEP wires up to 10 GHz.' },
    { year: '2018', title: 'AEROSPACE EXPANSION', desc: 'Began custom manufacturing of shielded multicore and coaxial cables (MIL-C-17) for aerospace defense contractors.' },
    { year: '2026', title: 'DIGITAL RFQ ECOSYSTEM', desc: 'Launched direct digital procurement interface for design engineers and defense procurement officers worldwide.' }
  ];

  return (
    <div className="relative bg-paper py-16 md:py-24 font-sans">
      {/* Blueprint grid dots background */}
      <div className="absolute inset-0 bg-grid-dots opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-20">
        
        {/* Page Header */}
        <div className="border-b border-ink/10 pb-8 space-y-4 max-w-3xl">
          <span className="text-[10px] font-mono tracking-widest text-cobalt uppercase font-bold bg-sky/35 px-2 py-1 rounded-xs inline-block">
            CORPORATE HERITAGE // ESTABLISHED 1991
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-ink uppercase tracking-tight leading-none">
            ENGINEERED TO PERFECTION SINCE 1991.
          </h1>
          <p className="text-sm md:text-base text-ink/75 leading-relaxed font-medium">
            Jain Polymer Co. was founded on a singular core principle: "No compromise on quality at any cost." For over three decades, we have engineered high-performance cabling components that defend signal integrity where failure means catastrophe.
          </p>
        </div>

        {/* Section 2: Narrative & Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Narrative copy */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-display font-black text-xl md:text-2xl text-ink uppercase tracking-wider">
              The Heritage of Shri S.K. Jain
            </h2>
            <p className="text-sm text-ink/70 leading-relaxed font-sans">
              Promoted in 1991 by proprietor Shri S.K. Jain, the company emerged as a specialized manufacturer of PTFE/Teflon based wires and sleevings. Utilizing Shri Jain's extensive R&D background in polymer extrusion, the firm successfully completed testing routines to earn prestigious defense approvals.
            </p>
            <p className="text-sm text-ink/70 leading-relaxed font-sans">
              Unlike massive retail wire manufacturers, Jain Polymer Co. remains a highly focused B2B manufacturer. Every order goes through custom batch mixing, precise laser sizing checks, and rigorous spark testing to verify compliance.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-ink/10">
              <div className="space-y-1">
                <span className="block text-2xl font-display font-black text-cobalt">35+ YEARS</span>
                <span className="block text-[10px] font-mono text-ink/50 uppercase">Extrusion R&D Experience</span>
              </div>
              <div className="space-y-1">
                <span className="block text-2xl font-display font-black text-cobalt">100% OWNED</span>
                <span className="block text-[10px] font-mono text-ink/50 uppercase">Private Infrastructure</span>
              </div>
              <div className="space-y-1">
                <span className="block text-2xl font-display font-black text-cobalt">0 DEFECTS</span>
                <span className="block text-[10px] font-mono text-ink/50 uppercase">Target Tolerances</span>
              </div>
            </div>
          </div>

          {/* Scanned crop panel photo */}
          <div className="lg:col-span-5 relative bg-white border border-ink/10 rounded-xs overflow-hidden aspect-[4/3] shadow-md">
            <Image
              src="/brand/crops/photo_three_strip.jpg"
              alt="Range of PTFE wires, cables and sleeves"
              fill
              priority
              className="object-cover filter saturate-[0.8] contrast-[1.02]"
              sizes="(max-w-7xl) 100vw, 400px"
            />
          </div>

        </div>

        {/* Section 3: Chronological Milestone Timeline */}
        <div className="space-y-10 pt-8 border-t border-ink/10">
          <div className="space-y-2">
            <span className="text-[9px] font-mono text-cobalt font-bold uppercase block">CHRONOLOGY</span>
            <h2 className="font-display font-black text-xl md:text-2xl text-ink uppercase tracking-wider">
              Company Milestone Timeline
            </h2>
          </div>

          {/* Timeline Grid */}
          <div className="relative border-l border-ink/10 pl-6 space-y-10 md:space-y-0 md:pl-0 md:grid md:grid-cols-6 md:gap-6">
            {milestones.map((stone, idx) => (
              <div key={idx} className="relative space-y-3 md:border-t md:border-ink/10 md:pt-6">
                {/* Timeline node marker */}
                <div className="absolute top-1 -left-[31px] md:top-[-6px] md:left-0 bg-swan-red h-2 w-2 rounded-full" />
                
                <span className="block text-lg font-display font-black text-cobalt">
                  {stone.year}
                </span>
                <div className="space-y-1">
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-ink font-bold">
                    {stone.title}
                  </h4>
                  <p className="text-xs text-ink/70 leading-relaxed font-sans">
                    {stone.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Infrastructure Capability */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-ink/10">
          <div className="flex gap-4 p-6 bg-white border border-ink/10 rounded-xs shadow-3xs">
            <Factory className="w-8 h-8 text-cobalt shrink-0" />
            <div className="space-y-1">
              <h3 className="font-display font-bold uppercase text-ink text-sm">Extrusion Facilities</h3>
              <p className="text-xs text-ink/70 leading-relaxed">
                Equipped with vertical paste-extrusion systems for PTFE sleevings and hook-up wires, plus continuous melt-extrusion facilities for FEP layouts.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-6 bg-white border border-ink/10 rounded-xs shadow-3xs">
            <Award className="w-8 h-8 text-cobalt shrink-0" />
            <div className="space-y-1">
              <h3 className="font-display font-bold uppercase text-ink text-sm">Testing Infrastructure</h3>
              <p className="text-xs text-ink/70 leading-relaxed">
                Equipped with high-voltage spark testers, dielectric test bath tubs, micro-analyzers for wall thickness concentricity, and thermal stress ovens.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-6 bg-white border border-ink/10 rounded-xs shadow-3xs">
            <History className="w-8 h-8 text-cobalt shrink-0" />
            <div className="space-y-1">
              <h3 className="font-display font-bold uppercase text-ink text-sm">Custom Engineering Lab</h3>
              <p className="text-xs text-ink/70 leading-relaxed">
                Dedicated testing line to compound custom insulating colors and configure specialized multi-core shielded configurations for aerospace telemetry.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
