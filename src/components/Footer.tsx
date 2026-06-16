import React from 'react';
import Link from 'next/link';
import SvgSwan from './SvgSwan';
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-ink text-paper pt-16 pb-8 font-sans border-t border-white/10 z-10 relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/10 pb-16">
        {/* Column 1: Corporate Hub & Branding */}
        <div className="md:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
            <SvgSwan className="w-10 h-10" fillColor="#F2602F" />
            <div className="flex flex-col">
              <span className="font-display font-black tracking-wider text-lg uppercase leading-none text-white">
                Jain Polymer Co.
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase mt-1 text-white/40">
                PTFE & FEP Cables · Established 1991
              </span>
            </div>
          </div>
          <p className="text-white/60 text-sm max-w-sm leading-relaxed">
            Ministry of Defence (L.C.S.O) and C-DOT approved manufacturer of high-performance PTFE / Teflon and FEP wires, cables, sleeves, and tapes. Engineered for extreme-temperature defense and aerospace wiring applications.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* MoD Approved Badge */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xs">
              <div className="relative w-8 h-10 filter brightness-0 invert shrink-0">
                <Image
                  src="/brand/crops/emblem_of_india.svg"
                  alt="Ministry of Defence Emblem"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-mono tracking-widest text-white/40 leading-none">APPROVED BY</span>
                <span className="text-xs font-bold text-white tracking-wide uppercase mt-0.5">MoD (L.C.S.O)</span>
              </div>
            </div>

            {/* C-DOT Approved Badge */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xs">
              <div className="relative w-10 h-8 shrink-0">
                <Image
                  src="/brand/crops/cdot_logo.png"
                  alt="C-DOT Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-mono tracking-widest text-white/40 leading-none">APPROVED BY</span>
                <span className="text-xs font-bold text-white tracking-wide uppercase mt-0.5">C-DOT INDIA</span>
              </div>
            </div>

            {/* Make in India Badge */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xs">
              <div className="relative w-16 h-8 filter brightness-0 invert shrink-0">
                <Image
                  src="/brand/crops/make_in_india.png"
                  alt="Make in India Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-mono tracking-widest text-white/40 leading-none">MANUFACTURED IN</span>
                <span className="text-xs font-bold text-white tracking-wide uppercase mt-0.5">INDIA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links / Sitemap */}
        <div className="md:col-span-3 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 border-b border-white/5 pb-2">
            Navigation
          </h3>
          <ul className="space-y-2.5 text-sm font-mono uppercase tracking-wider text-white/70">
            <li>
              <Link href="/products" className="hover:text-swan-red transition-colors focus:outline-none">
                Product Catalog
              </Link>
            </li>
            <li>
              <Link href="/quality" className="hover:text-swan-red transition-colors focus:outline-none">
                Quality & Compliance
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-swan-red transition-colors focus:outline-none">
                Our Heritage
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-swan-red transition-colors focus:outline-none">
                Request a Quote
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Direct Channels / Contacts */}
        <div className="md:col-span-4 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 border-b border-white/5 pb-2">
            Direct Channels
          </h3>
          <ul className="space-y-3.5 text-sm text-white/70">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-swan-red shrink-0 mt-0.5" />
              <span className="leading-tight">
                565/32, Circular Road, Rohtak – 124001, Haryana, India
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-swan-red shrink-0 mt-0.5" />
              <div className="font-mono text-xs space-y-1">
                <div>Tel/Fax: 01262-259727 / 248679</div>
                <div>Mobile: 98100-46627 / 99999-95556</div>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-swan-red shrink-0" />
              <a href="mailto:sales@jainpolymers.com" className="font-mono text-xs hover:text-white transition-colors underline focus:outline-none">
                sales@jainpolymers.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-white/40">
        <div>
          © 2026 Jain Polymer Co. All Rights Reserved.
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
          <span>*Teflon is a registered trademark of DuPont.</span>
          <Link href="/quality" className="hover:text-white transition-colors">
            L.C.S.O Approval Records
          </Link>
          <Link href="/quality" className="hover:text-white transition-colors">
            MIL/JSS Compliance Matrices
          </Link>
        </div>
      </div>
    </footer>
  );
}
