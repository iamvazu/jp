'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Plus, Check, FileText } from 'lucide-react';
import { useRfq } from '../context/RfqContext';
import { 
  WIRE_SPECS, 
  SLEEVING_SPECS, 
  CABLE_SPECS, 
  TAPE_SPECS 
} from '../data/content';
import { ProductFamily } from '../types';

interface ProductDetailClientProps {
  family: ProductFamily;
}

export default function ProductDetailClient({ family }: ProductDetailClientProps) {
  const { id } = family;
  const { addItem } = useRfq();

  // RFQ Configurator state
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedVoltage, setSelectedVoltage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('100'); // MOQ default
  const [selectedLength, setSelectedLength] = useState('50m Coils');
  const [isAddedLocal, setIsAddedLocal] = useState(false);

  // Specifications table filters (for wires)
  const [wireVoltageFilter, setWireVoltageFilter] = useState('ALL');
  const [wireSearchQuery, setWireSearchQuery] = useState('');

  // Pre-fill fields on mounting/changing product
  const defaultSize = useMemo(() => {
    if (id === 'ptfe-wires') return '22 AWG';
    if (id === 'ptfe-sleevings') return '1.00 mm';
    if (id === 'cables') return 'RG-196 A/U';
    if (id === 'ptfe-tapes') return 'JAIN FLON Tape';
    return 'Standard';
  }, [id]);

  // Set default size and color once if not set
  useEffect(() => {
    setSelectedSize(defaultSize);
    if (family.colors && family.colors.length > 0) {
      setSelectedColor(family.colors[0]);
    }
  }, [defaultSize, family]);

  // Filter wire specifications based on UI filters
  const filteredWireSpecs = useMemo(() => {
    return WIRE_SPECS.filter((spec) => {
      const matchesVoltage = wireVoltageFilter === 'ALL' || spec.voltageType === wireVoltageFilter;
      const matchesSearch = spec.awg.includes(wireSearchQuery) || 
                            spec.strands.includes(wireSearchQuery);
      return matchesVoltage && matchesSearch;
    });
  }, [wireVoltageFilter, wireSearchQuery]);

  // Add configuration to RFQ Basket
  const handleAddToBasket = (e: React.FormEvent) => {
    e.preventDefault();
    const itemId = `${id}-${selectedSize}-${selectedVoltage}-${selectedColor}`.replace(/\s+/g, '-').toLowerCase();
    
    addItem({
      id: itemId,
      productName: family.name,
      specs: {
        awgOrBore: selectedSize,
        voltageClass: selectedVoltage || undefined,
        color: selectedColor || undefined,
        quantity: selectedQuantity ? `${selectedQuantity} Meters` : undefined,
        length: selectedLength || undefined
      }
    });

    setIsAddedLocal(true);
    setTimeout(() => setIsAddedLocal(false), 2000);
  };

  return (
    <div className="relative bg-paper py-12 md:py-20 font-sans">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Back Link */}
        <div>
          <Link href="/products" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ink/60 hover:text-cobalt transition-colors focus:outline-none">
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </Link>
        </div>

        {/* Hero Product Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Product image */}
          <div className="lg:col-span-5 relative bg-white border border-ink/10 rounded-xs overflow-hidden aspect-square shadow-sm">
            <Image
              src={family.image}
              alt={family.name}
              fill
              priority
              className="object-cover filter saturate-[0.8] contrast-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 400px"
            />
            {/* Spec blueprint marker */}
            <div className="absolute bottom-3 left-3 bg-ink/75 text-paper text-[8px] font-mono px-2 py-1 uppercase tracking-widest">
              IMAGE: {family.id.toUpperCase()}_SPEC
            </div>
          </div>

          {/* Product description & stats */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <span className="text-[9px] font-mono uppercase tracking-widest bg-ink text-paper px-2 py-1">
                  MIL-SPEC: {family.standardMil}
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest bg-sky/35 text-cobalt px-2 py-1 font-bold">
                  JSS: {family.standardJss}
                </span>
              </div>
              <h1 className="font-display font-black text-3xl sm:text-4xl text-ink uppercase tracking-tight">
                {family.name}
              </h1>
              <p className="text-xs font-mono text-swan-red uppercase tracking-wider font-semibold">
                {family.tagline}
              </p>
            </div>
            
            <p className="text-sm text-ink/70 leading-relaxed">
              {family.description}
            </p>

            <div className="space-y-4 pt-4 border-t border-ink/10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40">Key Performance Safeties</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-ink/85">
                {family.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-swan-red shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Main interactive grid: Specs Table (Left) + RFQ Configurator (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-ink/10">
          
          {/* Dynamic Specs Tables */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-display font-black text-xl md:text-2xl text-ink uppercase tracking-wider">
              Technical Specification Sheets
            </h2>

            {/* A. PTFE Hookup Wires Spec Table */}
            {id === 'ptfe-wires' && (
              <div className="space-y-4">
                {/* Filters */}
                <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 border border-ink/10 rounded-xs">
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-mono uppercase text-ink/60">Voltage Class:</span>
                    <select
                      value={wireVoltageFilter}
                      onChange={(e) => setWireVoltageFilter(e.target.value)}
                      className="bg-paper border border-ink/10 rounded-xs px-2.5 py-1 text-xs text-ink focus:outline-none focus:border-cobalt font-mono uppercase"
                    >
                      <option value="ALL">All Classes</option>
                      <option value="ET">Type ET (250V)</option>
                      <option value="E">Type E (600V)</option>
                      <option value="EE">Type EE (1000V)</option>
                    </select>
                  </div>
                  <div className="w-full sm:w-auto flex-1">
                    <input
                      type="text"
                      placeholder="Filter by AWG size or strand structure..."
                      value={wireSearchQuery}
                      onChange={(e) => setWireSearchQuery(e.target.value)}
                      className="w-full bg-paper border border-ink/10 rounded-xs px-3 py-1 text-xs text-ink focus:outline-none focus:border-cobalt font-mono"
                    />
                  </div>
                </div>

                {/* Table wrapper */}
                <div className="overflow-x-auto border border-ink/10 rounded-xs bg-white">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-ink text-paper font-mono uppercase tracking-wider border-b border-ink/15 text-[10px]">
                        <th className="p-3">AWG</th>
                        <th className="p-3">Strands</th>
                        <th className="p-3">Conductor Dia.</th>
                        <th className="p-3">Area</th>
                        <th className="p-3">Max O.D. (EE)</th>
                        <th className="p-3">Resistance</th>
                        <th className="p-3">Current</th>
                        <th className="p-3 text-right">Class</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink/5 font-mono">
                      {filteredWireSpecs.map((spec) => (
                        <tr
                          key={spec.awg}
                          className="hover:bg-sky/15 transition-colors group cursor-pointer"
                          onClick={() => {
                            setSelectedSize(`${spec.awg} AWG`);
                            setSelectedVoltage(`Type ${spec.voltageType}`);
                          }}
                        >
                          <td className="p-3 font-bold text-cobalt group-hover:text-swan-red">{spec.awg}</td>
                          <td className="p-3">{spec.strands}</td>
                          <td className="p-3">{spec.condDia.toFixed(2)} mm</td>
                          <td className="p-3">{spec.area.toFixed(3)} mm²</td>
                          <td className="p-3">{spec.eeDiaMax.toFixed(2)} mm</td>
                          <td className="p-3">{spec.resistance} Ω/km</td>
                          <td className="p-3 text-swan-red font-bold">{spec.current} A</td>
                          <td className="p-3 text-right font-bold text-ink/60">{spec.voltageType}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* B. PTFE Sleevings Spec Table */}
            {id === 'ptfe-sleevings' && (
              <div className="overflow-x-auto border border-ink/10 rounded-xs bg-white">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-ink text-paper font-mono uppercase tracking-wider border-b border-ink/15 text-[10px]">
                      <th className="p-3">Nominal Bore</th>
                      <th className="p-3">Bore Tolerance</th>
                      <th className="p-3">Nominal Wall</th>
                      <th className="p-3">Wall Tolerance</th>
                      <th className="p-3 text-right">Breakdown Voltage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/5 font-mono">
                    {SLEEVING_SPECS.map((spec, index) => (
                      <tr
                        key={index}
                        className="hover:bg-sky/15 transition-colors group cursor-pointer"
                        onClick={() => setSelectedSize(`${spec.nominalBore.toFixed(2)} mm Bore`)}
                      >
                        <td className="p-3 font-bold text-cobalt group-hover:text-swan-red">{spec.nominalBore.toFixed(2)} mm</td>
                        <td className="p-3 text-ink/75">{spec.boreTolerance} mm</td>
                        <td className="p-3">{spec.nominalWall.toFixed(2)} mm</td>
                        <td className="p-3 text-ink/75">{spec.wallTolerance} mm</td>
                        <td className="p-3 text-right font-bold text-swan-red">{spec.breakdownVoltage.toFixed(1)} kV</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* C. Multi-core & Coaxial Cables Spec Table */}
            {id === 'cables' && (
              <div className="overflow-x-auto border border-ink/10 rounded-xs bg-white">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-ink text-paper font-mono uppercase tracking-wider border-b border-ink/15 text-[10px]">
                      <th className="p-3">RG Designation</th>
                      <th className="p-3">Nominal Impedance</th>
                      <th className="p-3">Dielectric</th>
                      <th className="p-3">Shielding Braid</th>
                      <th className="p-3 text-right">Outer Jacket</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/5 font-mono">
                    {CABLE_SPECS.map((spec, index) => (
                      <tr
                        key={index}
                        className="hover:bg-sky/15 transition-colors group cursor-pointer"
                        onClick={() => setSelectedSize(spec.rgDesignation)}
                      >
                        <td className="p-3 font-bold text-cobalt group-hover:text-swan-red">{spec.rgDesignation}</td>
                        <td className="p-3 text-swan-red font-bold">{spec.impedance}</td>
                        <td className="p-3 text-ink/75">{spec.dielectric}</td>
                        <td className="p-3 text-ink/75">{spec.shield}</td>
                        <td className="p-3 text-right text-ink/60">{spec.jacket}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* D. PTFE Tapes Spec Table */}
            {id === 'ptfe-tapes' && (
              <div className="overflow-x-auto border border-ink/10 rounded-xs bg-white">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-ink text-paper font-mono uppercase tracking-wider border-b border-ink/15 text-[10px]">
                      <th className="p-3">Tape Product</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Dimensions</th>
                      <th className="p-3">Thickness</th>
                      <th className="p-3 text-right">Primary Application</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/5 font-sans">
                    {TAPE_SPECS.map((spec, index) => (
                      <tr
                        key={index}
                        className="hover:bg-sky/15 transition-colors group cursor-pointer text-xs"
                        onClick={() => setSelectedSize(spec.name.replace(' Tape', ''))}
                      >
                        <td className="p-3 font-bold text-cobalt group-hover:text-swan-red font-display uppercase">{spec.name}</td>
                        <td className="p-3 text-ink/75 font-mono text-[11px]">{spec.type}</td>
                        <td className="p-3 font-mono text-[11px]">{spec.width}</td>
                        <td className="p-3 font-mono text-[11px]">{spec.thickness}</td>
                        <td className="p-3 text-right text-ink/60 leading-tight">{spec.application}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* E. Silicon Products (Narrative specifications) */}
            {id === 'silicon-products' && (
              <div className="bg-white border border-ink/10 p-6 rounded-xs space-y-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-swan-red" />
                  <h4 className="font-display font-bold text-sm uppercase text-ink">Silicon Mechanical Resilience</h4>
                </div>
                <p className="text-xs text-ink/70 leading-relaxed">
                  Unlike PTFE which exhibits higher hardness and rigidity, silicon rubber acts as a true elastomer. Our silicon cables offer an unmatched fatigue-life against repeated dynamic bending cycles. Perfect for high-stress motor lead feeds and industrial furnace headers.
                </p>
                <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-4 border-t border-ink/5">
                  <div>
                    <span className="block text-ink/40 text-[10px] uppercase">Service Temp Limit</span>
                    <span className="block text-cobalt font-bold">-60°C to +200°C</span>
                  </div>
                  <div>
                    <span className="block text-ink/40 text-[10px] uppercase">Ozone / UV Endurance</span>
                    <span className="block text-cobalt font-bold">100% Corona Proof</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RFQ Configurator / Quote Selector Panel */}
          <div className="lg:col-span-4">
            <div className="bg-ink text-paper p-6 rounded-xs border border-white/10 space-y-6 sticky top-24">
              <div className="space-y-1">
                <h3 className="font-display font-black text-lg uppercase text-white tracking-wider">
                  RFQ CONFIGURATOR
                </h3>
                <p className="text-[10px] font-mono text-white/50 uppercase">
                  Select specs and add to quote basket
                </p>
              </div>

              <form onSubmit={handleAddToBasket} className="space-y-4">
                {/* Size Selector */}
                <div>
                  <label htmlFor="sizeSelect" className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                    Conductor Size / Standard
                  </label>
                  <input
                    type="text"
                    id="sizeSelect"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    required
                    placeholder="e.g. 22 AWG or 1.00 mm Bore"
                    className="w-full bg-white/5 border border-white/15 rounded-xs px-3 py-2 text-xs text-white focus:outline-none focus:border-cobalt font-mono"
                  />
                </div>

                {/* Voltage Selector (if applicable) */}
                {id === 'ptfe-wires' && (
                  <div>
                    <label htmlFor="voltageSelect" className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                      Voltage Class
                    </label>
                    <select
                      id="voltageSelect"
                      value={selectedVoltage}
                      onChange={(e) => setSelectedVoltage(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-xs px-3 py-2 text-xs text-white focus:outline-none focus:border-cobalt font-mono uppercase"
                    >
                      <option value="Type ET (250V)" className="bg-ink text-paper">Type ET (250V)</option>
                      <option value="Type E (600V)" className="bg-ink text-paper">Type E (600V)</option>
                      <option value="Type EE (1000V)" className="bg-ink text-paper">Type EE (1000V)</option>
                    </select>
                  </div>
                )}

                {/* Color Selector */}
                {family.colors && family.colors.length > 0 && (
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-white/60 mb-2">
                      Insulation Color: {selectedColor}
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {family.colors.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`px-2.5 py-1 text-[10px] font-mono border rounded-xs uppercase transition-colors ${
                            selectedColor === color
                              ? 'bg-swan-red border-swan-red text-white'
                              : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* MOQ / Quantity */}
                <div>
                  <label htmlFor="qtySelect" className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                    Required Quantity (Meters)
                  </label>
                  <input
                    type="number"
                    id="qtySelect"
                    min="100"
                    value={selectedQuantity}
                    onChange={(e) => setSelectedQuantity(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-xs px-3 py-2 text-xs text-white focus:outline-none focus:border-cobalt font-mono"
                  />
                  <span className="block text-[9px] font-mono text-white/40 mt-1 uppercase">
                    * Minimum order run: 100 meters per size/color
                  </span>
                </div>

                {/* Coil length style */}
                <div>
                  <label htmlFor="lenSelect" className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                    Coil Configuration
                  </label>
                  <select
                    id="lenSelect"
                    value={selectedLength}
                    onChange={(e) => setSelectedLength(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xs px-3 py-2 text-xs text-white focus:outline-none focus:border-cobalt font-mono"
                  >
                    <option value="50m Coils (nominal pieces)" className="bg-ink text-paper">50m Coils (nominal pieces)</option>
                    <option value="100m Spools" className="bg-ink text-paper">100m Spools</option>
                    <option value="Custom Length Bundles" className="bg-ink text-paper">Custom Length Bundles</option>
                  </select>
                </div>

                {/* Add to Basket Action */}
                <button
                  type="submit"
                  className="w-full mt-4 bg-swan-red hover:bg-swan-red/90 text-white font-mono text-xs uppercase tracking-widest py-3 px-4 rounded-xs transition-all flex items-center justify-center gap-2 cursor-pointer font-bold shadow-md"
                >
                  {isAddedLocal ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>ADDED TO BASKET</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 text-white" />
                      <span>ADD TO RFQ BASKET</span>
                    </>
                  )
                  }
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Applications detailed segment */}
        <div className="pt-8 border-t border-ink/10 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <span className="text-[9px] font-mono text-cobalt font-bold uppercase block mb-1">STRESS SUITABILITY</span>
            <h3 className="font-display font-black text-xl text-ink uppercase tracking-wider">
              AUTHORIZED OPERATIONS
            </h3>
          </div>
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {family.applications.map((app, index) => (
              <div key={index} className="flex gap-2 text-xs text-ink/80 bg-white p-3 border border-ink/5 rounded-xs shadow-3xs">
                <FileText className="w-4 h-4 text-swan-red shrink-0" />
                <span>{app}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Resources & Guides Segment */}
        <div className="pt-12 border-t border-ink/10 space-y-6">
          <div>
            <span className="text-[9px] font-mono text-cobalt font-bold uppercase block mb-1">REFERENCE LIBRARY</span>
            <h3 className="font-display font-black text-xl text-ink uppercase tracking-wider">
              Technical Resources & Guides
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Guide 1: Material Comparison */}
            <div className="bg-white border border-ink/10 p-5 rounded-xs flex flex-col justify-between hover:border-cobalt transition-colors">
              <div className="space-y-2">
                <span className="text-[9px] font-mono uppercase bg-cobalt/10 text-cobalt px-2 py-0.5 rounded-full font-bold">
                  Material Guide
                </span>
                <h4 className="font-display font-bold text-sm uppercase text-ink leading-tight">
                  PTFE vs PVC vs FEP vs Silicone
                </h4>
                <p className="text-xs text-ink/60 leading-relaxed line-clamp-3">
                  A comprehensive insulation material comparison guide for aerospace and defense electronics engineering.
                </p>
              </div>
              <Link href="/resources/ptfe-vs-pvc-vs-fep-vs-silicone" className="inline-flex items-center gap-1.5 text-xs font-mono text-swan-red hover:underline mt-4 focus:outline-none">
                Read Guide →
              </Link>
            </div>

            {/* Guide 2: Standards Explainer */}
            <div className="bg-white border border-ink/10 p-5 rounded-xs flex flex-col justify-between hover:border-cobalt transition-colors">
              <div className="space-y-2">
                <span className="text-[9px] font-mono uppercase bg-cobalt/10 text-cobalt px-2 py-0.5 rounded-full font-bold">
                  Compliance Guide
                </span>
                <h4 className="font-display font-bold text-sm uppercase text-ink leading-tight">
                  MIL-SPEC & JSS Standards Explained
                </h4>
                <p className="text-xs text-ink/60 leading-relaxed line-clamp-3">
                  Understanding military standard MIL-W-16878E and joint services specification JSS 51004 for electronic wiring.
                </p>
              </div>
              <Link href="/resources/mil-w-16878-jss-51004-explained" className="inline-flex items-center gap-1.5 text-xs font-mono text-swan-red hover:underline mt-4 focus:outline-none">
                Read Guide →
              </Link>
            </div>

            {/* Guide 3: Gauge Selection or Product specific reference */}
            {id === 'ptfe-wires' || id === 'fep-wires' ? (
              <div className="bg-white border border-ink/10 p-5 rounded-xs flex flex-col justify-between hover:border-cobalt transition-colors">
                <div className="space-y-2">
                  <span className="text-[9px] font-mono uppercase bg-cobalt/10 text-cobalt px-2 py-0.5 rounded-full font-bold">
                    Selection Guide
                  </span>
                  <h4 className="font-display font-bold text-sm uppercase text-ink leading-tight">
                    How to Select the Right Wire Gauge
                  </h4>
                  <p className="text-xs text-ink/60 leading-relaxed line-clamp-3">
                    Calculations and structural considerations for selecting conductor sizes and insulation thicknesses.
                  </p>
                </div>
                <Link href="/resources/how-to-select-ptfe-hook-up-wire" className="inline-flex items-center gap-1.5 text-xs font-mono text-swan-red hover:underline mt-4 focus:outline-none">
                  Read Guide →
                </Link>
              </div>
            ) : (
              <div className="bg-white border border-ink/10 p-5 rounded-xs flex flex-col justify-between hover:border-cobalt transition-colors">
                <div className="space-y-2">
                  <span className="text-[9px] font-mono uppercase bg-cobalt/10 text-cobalt px-2 py-0.5 rounded-full font-bold">
                    Catalog File
                  </span>
                  <h4 className="font-display font-bold text-sm uppercase text-ink leading-tight">
                    Download Technical Catalogue
                  </h4>
                  <p className="text-xs text-ink/60 leading-relaxed line-clamp-3">
                    Access complete technical drawings, testing data tables, and certification reports.
                  </p>
                </div>
                <a 
                  href="/brand/jain-polymer-wire-sleeve-catalogue.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-swan-red hover:underline mt-4 focus:outline-none"
                >
                  Download PDF (1.2MB) →
                </a>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
