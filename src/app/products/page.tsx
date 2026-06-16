'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { PRODUCT_FAMILIES } from '../../data/content';

export default function ProductsPage() {
  return (
    <div className="relative bg-paper py-16 md:py-24">
      {/* Blueprint grid dots background */}
      <div className="absolute inset-0 bg-grid-dots opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
        {/* Page Header */}
        <div className="border-b border-ink/10 pb-8 space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-cobalt uppercase font-bold">
            JAIN POLYMER CO. // COMPLETE PRODUCT SYSTEM
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-ink uppercase tracking-tight">
            MATCHLESS RANGE. ENGINEERED PRECISION.
          </h1>
          <p className="text-sm md:text-base text-ink/70 max-w-2xl leading-relaxed">
            Our high-performance PTFE (Teflon), FEP, and Silicon insulated cables, wires, and sleeves are designed for zero-defect operation in demanding military, telecommunication, and high-temperature industrial environments.
          </p>
        </div>

        {/* Product Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {PRODUCT_FAMILIES.map((family) => (
            <div
              key={family.id}
              className="bg-white border border-ink/10 rounded-xs overflow-hidden flex flex-col justify-between hover:border-cobalt transition-colors duration-300 shadow-xs hover:shadow-md"
            >
              <div>
                {/* Photo Header */}
                <div className="relative w-full h-64 bg-ink/5 border-b border-ink/10">
                  <Image
                    src={family.image}
                    alt={family.name}
                    fill
                    className="object-cover filter saturate-[0.8] contrast-[1.02]"
                    sizes="(max-w-7xl) 100vw, 500px"
                  />
                  <div className="absolute top-4 left-4 bg-ink text-paper text-[9px] font-mono px-2 py-1 uppercase tracking-widest">
                    {family.standardMil} // {family.standardJss}
                  </div>
                </div>

                {/* Text Details */}
                <div className="p-8 space-y-6">
                  <div className="space-y-2">
                    <h2 className="font-display font-black text-xl md:text-2xl uppercase tracking-wider text-ink">
                      {family.name}
                    </h2>
                    <p className="text-xs font-mono text-cobalt tracking-wider uppercase font-semibold">
                      {family.tagline}
                    </p>
                  </div>
                  
                  <p className="text-xs md:text-sm text-ink/70 leading-relaxed">
                    {family.description}
                  </p>

                  {/* Bullet features */}
                  <ul className="space-y-2 pt-2 border-t border-ink/5">
                    {family.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-ink/75 leading-tight">
                        <Check className="w-3.5 h-3.5 text-swan-red shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-8 pb-8 pt-4 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/products/${family.id}`}
                  className="flex-1 bg-ink hover:bg-cobalt text-paper font-mono text-xs uppercase tracking-widest py-3 px-4 rounded-xs text-center flex items-center justify-center gap-2 group transition-all cursor-pointer"
                >
                  <span>Technical Data Sheet</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="border border-ink/20 hover:border-ink text-ink font-mono text-xs uppercase tracking-widest py-3 px-4 rounded-xs text-center transition-all cursor-pointer"
                >
                  Request RFQ
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Custom capabilities callout */}
        <div className="border border-cobalt/20 bg-sky/10 p-8 rounded-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h3 className="font-display font-bold text-lg md:text-xl uppercase text-cobalt tracking-wider">
              HAVE SPECIFIC DESIGN BLUEPRINTS?
            </h3>
            <p className="text-xs md:text-sm text-ink/70 leading-relaxed">
              We possess the engineering capability and manufacturing infrastructure to build customized cables, multicore bundles, and shielding solutions conforming to custom dimensions, tolerances, and color configurations.
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-swan-red hover:bg-swan-red/90 text-white font-mono text-xs uppercase tracking-widest px-6 py-3.5 rounded-xs shrink-0 transition-all cursor-pointer"
          >
            Consult R&D Team
          </Link>
        </div>
      </div>
    </div>
  );
}
