import React from 'react';
import Link from 'next/link';
import { getAllArticles } from '../../utils/markdown';
import { ArrowRight, BookOpen, Calendar, Tag } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technical Resources & Engineering Guides | Jain Polymer Co.',
  description: 'Access our engineering guides, standards breakdown sheets (MIL-SPEC / JSS), and comparison reports for PTFE, FEP, and silicone insulation.',
};

export default function ResourcesPage() {
  const articles = getAllArticles();

  return (
    <div className="relative bg-paper py-16 md:py-24 font-sans">
      {/* Blueprint grid lines background */}
      <div className="absolute inset-0 bg-grid-lines opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="border-b border-ink/10 pb-8 space-y-4 max-w-3xl">
          <span className="text-[10px] font-mono tracking-widest text-cobalt uppercase font-bold bg-sky/35 px-2 py-1 rounded-xs inline-block">
            ENGINEERING DIVISION // LIBRARY
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-ink uppercase tracking-tight leading-none">
            Technical Resources & Guides
          </h1>
          <p className="text-sm md:text-base text-ink/75 leading-relaxed font-medium">
            Browse our technical articles, material comparison sheets, and military specification breakdowns written by our R&D specialists to help you choose the correct wiring solutions.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <div
              key={art.slug}
              className="bg-white border border-ink/10 rounded-xs p-6 flex flex-col justify-between hover:border-cobalt transition-colors duration-300 shadow-3xs hover:shadow-xs group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px] font-mono text-ink/40">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-swan-red" />
                    {art.category.toUpperCase()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    JUNE 2026
                  </span>
                </div>
                
                <h2 className="font-display font-black text-lg uppercase tracking-wider text-ink group-hover:text-cobalt transition-colors leading-snug">
                  <Link href={`/resources/${art.slug}`}>
                    {art.title}
                  </Link>
                </h2>
                
                <p className="text-xs text-ink/70 leading-relaxed font-sans line-clamp-3">
                  {art.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-ink/5 mt-6">
                <Link
                  href={`/resources/${art.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-mono text-swan-red hover:text-ink transition-colors uppercase font-bold tracking-widest"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Quick Help Box */}
        <div className="border border-ink/15 bg-white p-8 rounded-xs space-y-4 max-w-2xl">
          <div className="flex items-center gap-2 text-cobalt">
            <BookOpen className="w-5 h-5" />
            <h3 className="font-display font-bold uppercase text-sm tracking-wider">Need Custom Spec Sheets?</h3>
          </div>
          <p className="text-xs text-ink/75 leading-relaxed">
            Our engineering lab compiles bespoke specification reports for defense, aerospace, and telemetry programs. If you need dedicated testing data (e.g. shielding coefficients, thermal profiles, or corona endurance), speak with our office.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-block bg-ink hover:bg-cobalt text-paper font-mono text-xs uppercase tracking-widest px-6 py-3 rounded-xs transition-colors"
            >
              Consult an R&D Specialist
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
