'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SvgSwan from './SvgSwan';
import { useRfq } from '../context/RfqContext';
import { FileText, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const pathname = usePathname();
  const { basket, setSidebarOpen } = useRfq();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/products', label: 'Products' },
    { href: '/quality', label: 'Quality & Approvals' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  const totalBasketItems = basket.length;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-sans border-b ${
          isScrolled
            ? 'bg-ink/95 text-paper py-3 border-white/10 backdrop-blur-md shadow-md'
            : 'bg-transparent text-ink py-5 border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo & Live Text Wordmark */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <SvgSwan
              className="w-9 h-9 transition-transform duration-500 group-hover:scale-110"
              fillColor={isScrolled ? '#F2602F' : '#1F4FA3'}
            />
            <div className="flex flex-col">
              <span
                className={`font-display font-black tracking-wider text-base uppercase leading-none transition-colors duration-300 ${
                  isScrolled ? 'text-white' : 'text-cobalt'
                }`}
              >
                Jain Polymer Co.
              </span>
              <span className={`text-[9px] font-mono tracking-widest uppercase mt-0.5 ${
                isScrolled ? 'text-white/40' : 'text-ink/40'
              }`}>
                PTFE & FEP Cables · Estd 1991
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-mono uppercase tracking-widest">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 transition-colors hover:text-swan-red focus:outline-none ${
                    isActive
                      ? isScrolled ? 'text-swan-red font-semibold' : 'text-cobalt font-semibold'
                      : isScrolled ? 'text-white/70' : 'text-ink/70'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeHeaderLine"
                      className={`absolute bottom-0 left-0 right-0 h-[1.5px] ${
                        isScrolled ? 'bg-swan-red' : 'bg-cobalt'
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-4">
            {/* Basket Quick-Access */}
            {totalBasketItems > 0 && (
              <button
                onClick={() => setSidebarOpen(true)}
                className={`p-2 rounded-xs border transition-colors flex items-center gap-2 font-mono text-xs focus:outline-none cursor-pointer ${
                  isScrolled
                    ? 'border-white/10 hover:border-white/30 text-white bg-white/5'
                    : 'border-ink/10 hover:border-ink/20 text-ink bg-ink/5'
                }`}
                aria-label="Open Quote Basket"
              >
                <FileText className="w-4 h-4 text-swan-red" />
                <span>BASKET</span>
                <span className="bg-swan-red text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {totalBasketItems}
                </span>
              </button>
            )}

            {/* Quote Action CTA */}
            <button
              onClick={() => {
                if (totalBasketItems > 0) {
                  setSidebarOpen(true);
                } else {
                  // Direct to Contact/RFQ Form
                  window.location.href = '/contact';
                }
              }}
              className={`font-mono text-xs uppercase tracking-widest px-5 py-2.5 rounded-xs border transition-all duration-300 focus:outline-none cursor-pointer ${
                isScrolled
                  ? 'bg-swan-red border-swan-red hover:bg-swan-red/90 text-white hover:border-swan-red/90 font-bold'
                  : 'border-ink hover:bg-ink hover:text-paper text-ink'
              }`}
            >
              Request a Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            {totalBasketItems > 0 && (
              <button
                onClick={() => setSidebarOpen(true)}
                className={`p-1.5 rounded-xs border flex items-center gap-1 font-mono text-[10px] focus:outline-none cursor-pointer ${
                  isScrolled
                    ? 'border-white/10 text-white bg-white/5'
                    : 'border-ink/10 text-ink bg-ink/5'
                }`}
                aria-label="Open Quote Basket"
              >
                <FileText className="w-4 h-4 text-swan-red" />
                <span className="bg-swan-red text-white text-[9px] px-1 rounded-full font-bold">
                  {totalBasketItems}
                </span>
              </button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-xs focus:outline-none cursor-pointer ${
                isScrolled ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-ink/5'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[60px] bg-ink text-paper z-30 shadow-xl border-b border-white/10 font-sans md:hidden"
          >
            <div className="p-6 flex flex-col gap-5 text-sm font-mono uppercase tracking-wider">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-2 border-b border-white/5 ${
                    pathname === link.href ? 'text-swan-red' : 'text-white/70'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (totalBasketItems > 0) {
                    setSidebarOpen(true);
                  } else {
                    window.location.href = '/contact';
                  }
                }}
                className="w-full mt-2 border border-white/20 hover:border-white text-center py-3 text-xs tracking-widest text-white uppercase focus:outline-none cursor-pointer"
              >
                Request a Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
