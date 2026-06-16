'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldAlert, Award, Calendar, CheckSquare, ShieldCheck, HelpCircle } from 'lucide-react';
import { QUALITY_TIMELINE, DIELECTRIC_TESTS } from '../../data/content';

export default function QualityPage() {
  return (
    <div className="relative bg-paper py-16 md:py-24 font-sans">
      {/* Blueprint grid lines background */}
      <div className="absolute inset-0 bg-grid-lines opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-20">
        
        {/* Section 1: Philosophy Title */}
        <div className="border-b border-ink/10 pb-8 space-y-4 max-w-3xl">
          <span className="text-[10px] font-mono tracking-widest text-cobalt uppercase font-bold bg-sky/35 px-2 py-1 rounded-xs inline-block">
            QUALITY SYSTEM OVERVIEW // ZERO-DEFECT BENCHMARK
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-ink uppercase tracking-tight leading-none">
            WHERE SYSTEM FAILURE IS NOT AN OPTION.
          </h1>
          <p className="text-sm md:text-base text-ink/75 leading-relaxed font-medium">
            Because our custom-engineered PTFE and FEP components serve critical roles in higher-level aerospace, defense, and industrial control systems, our manufacturing facility operates under an absolute non-compromise quality policy.
          </p>
        </div>

        {/* Section 2: Institutional Approvals Grid */}
        <div className="space-y-6">
          <h2 className="font-display font-black text-xl md:text-2xl text-ink uppercase tracking-wider">
            Institutional Approvals & Standards Matrix
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Approval 1 */}
            <div className="bg-white p-6 border border-ink/10 rounded-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="relative w-8 h-10 shrink-0">
                  <Image
                    src="/brand/crops/emblem_of_india.svg"
                    alt="Ministry of Defence Emblem"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-[9px] font-mono text-ink/40 uppercase">DEFENSE CODES</span>
              </div>
              <h3 className="font-display font-bold text-base uppercase text-ink">
                L.C.S.O Certification
              </h3>
              <p className="text-xs text-ink/70 leading-relaxed">
                Type Approved by the Electronic Components Standardization Organisation (L.C.S.O), Ministry of Defence, Government of India.
              </p>
              <div className="text-[9px] font-mono text-ink/40 border-t border-ink/5 pt-2 uppercase">
                Scope: Defense electronics & aviation instrumentation
              </div>
            </div>

            {/* Approval 2 */}
            <div className="bg-white p-6 border border-ink/10 rounded-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="relative w-10 h-8 shrink-0">
                  <Image
                    src="/brand/crops/cdot_logo.png"
                    alt="C-DOT Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-[9px] font-mono text-ink/40 uppercase">TELECOM STANDARDS</span>
              </div>
              <h3 className="font-display font-bold text-base uppercase text-ink">
                C-DOT Approval
              </h3>
              <p className="text-xs text-ink/70 leading-relaxed">
                Formally certified by the Centre for Development of Telematics (C-DOT) for high-density switching exchanges and telecommunication switches.
              </p>
              <div className="text-[9px] font-mono text-ink/40 border-t border-ink/5 pt-2 uppercase">
                Scope: Switching grids & data feeds
              </div>
            </div>

            {/* Approval 3 */}
            <div className="bg-white p-6 border border-ink/10 rounded-xs space-y-4">
              <div className="flex items-center justify-between">
                <ShieldCheck className="w-8 h-8 text-swan-red" />
                <span className="text-[9px] font-mono text-ink/40 uppercase">JSS CONFORMANCE</span>
              </div>
              <h3 className="font-display font-bold text-base uppercase text-ink">
                Joint Services Specs
              </h3>
              <p className="text-xs text-ink/70 leading-relaxed">
                Manufacturing strictly adheres to JSS 51004 (Equipment Wires), JSS 54802 (PTFE Sleevings), and JSS 51100 (Coaxial Cables).
              </p>
              <div className="text-[9px] font-mono text-ink/40 border-t border-ink/5 pt-2 uppercase">
                Scope: Environmental resilience tests
              </div>
            </div>

            {/* Approval 4 */}
            <div className="bg-white p-6 border border-ink/10 rounded-xs space-y-4">
              <div className="flex items-center justify-between">
                <ShieldCheck className="w-8 h-8 text-swan-red" />
                <span className="text-[9px] font-mono text-ink/40 uppercase">MIL SPEC CODES</span>
              </div>
              <h3 className="font-display font-bold text-base uppercase text-ink">
                MIL-W / I / C Standard
              </h3>
              <p className="text-xs text-ink/70 leading-relaxed">
                Conforms fully to global standards MIL-W-16878E (hook-up wires), MIL-I-22129 (sleevings), and MIL-C-17 (shielded cables).
              </p>
              <div className="text-[9px] font-mono text-ink/40 border-t border-ink/5 pt-2 uppercase">
                Scope: Global interoperability arrays
              </div>
            </div>

          </div>
        </div>

        {/* Section 3: Multi-stage QA Timeline */}
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="text-[9px] font-mono text-cobalt font-bold uppercase block">GATEKEEPER PROCESS</span>
            <h2 className="font-display font-black text-xl md:text-2xl text-ink uppercase tracking-wider">
              The Multi-Stage Quality Assurance Pipeline
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
            {QUALITY_TIMELINE.map((step, index) => (
              <div
                key={index}
                className="bg-white border border-ink/10 p-6 rounded-xs space-y-4 relative flex flex-col justify-between"
              >
                {/* Step Counter Badge */}
                <div className="absolute -top-3 -left-3 bg-ink text-paper text-xs font-mono h-7 w-7 rounded-full flex items-center justify-center border border-white/10 font-bold">
                  0{index + 1}
                </div>

                <div className="space-y-2 pt-2">
                  <h3 className="font-display font-black text-base uppercase text-ink">
                    {step.phase}
                  </h3>
                  <p className="text-[11px] font-mono text-swan-red font-semibold uppercase">
                    Rule: "{step.rule}"
                  </p>
                </div>
                <p className="text-xs text-ink/70 leading-relaxed">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Testing & Dielectric Spark Limits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-ink/10">
          
          {/* Dielectric table (Left) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <h3 className="font-display font-black text-lg uppercase text-ink tracking-wider">
                Electrical Integrity Benchmarks
              </h3>
              <p className="text-xs text-ink/60">
                Dielectric and spark test values for PTFE insulated hook-up wires (Tested at AC RMS).
              </p>
            </div>

            <div className="overflow-x-auto border border-ink/10 rounded-xs bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-ink text-paper font-mono uppercase tracking-wider border-b border-ink/15 text-[10px]">
                    <th className="p-3">Voltage Class</th>
                    <th className="p-3">Dielectric Spark Test</th>
                    <th className="p-3 text-right">Dielectric strength (AC RMS)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/5 font-mono">
                  {DIELECTRIC_TESTS.map((test, index) => (
                    <tr key={index} className="hover:bg-sky/10 transition-colors">
                      <td className="p-3 font-bold text-cobalt uppercase">{test.type}</td>
                      <td className="p-3 text-ink/75">{test.sparkTest}</td>
                      <td className="p-3 text-right font-bold text-swan-red">{test.dielectricStrength}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Environmental controls (Right) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-display font-black text-lg uppercase text-ink tracking-wider">
              Stress & Environmental Proofs
            </h3>
            <div className="space-y-4 text-xs">
              <div className="bg-white border border-ink/10 p-4 rounded-xs">
                <h4 className="font-display font-bold uppercase text-cobalt text-xs mb-1">
                  1. High Frequency Stability
                </h4>
                <p className="text-ink/70 leading-relaxed">
                  Insulation maintains entirely stable dielectric constant (approx 2.1) and minimal dissipation factor (&lt;0.0004) across high ranges from D.C to 10,000 MHz.
                </p>
              </div>

              <div className="bg-white border border-ink/10 p-4 rounded-xs">
                <h4 className="font-display font-bold uppercase text-cobalt text-xs mb-1">
                  2. Absolute Inertness
                </h4>
                <p className="text-ink/70 leading-relaxed">
                  100% immune to moisture traps, water absorption, fungus growth, UV rays, ozone weathering, and continuous exposure to strong acids, fuels, or solvents.
                </p>
              </div>

              <div className="bg-white border border-ink/10 p-4 rounded-xs">
                <h4 className="font-display font-bold uppercase text-cobalt text-xs mb-1">
                  3. Self-Extinguishing Envelope
                </h4>
                <p className="text-ink/70 leading-relaxed">
                  Non-flammable under JSS 51004. Oxygen index exceeds 95%. Will not melt or release toxic fumes under sudden thermal overload.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Transit Protection & Free Replacement Policy */}
        <div className="border border-cobalt/20 bg-ink text-paper p-8 rounded-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-3 text-center md:text-left">
            <ShieldAlert className="w-16 h-16 text-swan-red mx-auto md:mx-0" />
          </div>
          <div className="md:col-span-9 space-y-4">
            <h3 className="font-display font-black text-xl uppercase tracking-wider text-white">
              Transit Protection & Material Guarantee
            </h3>
            <p className="text-xs text-white/70 leading-relaxed">
              We pack all custom lengths in specialized heavy-duty industrial rolls to prevent abrasion, moisture absorption, or deformation during transit. If any purchaser detects a variance from the approved pre-inspection report upon delivery, Jain Polymer Co. commits to replacing the material entirely free of cost.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
