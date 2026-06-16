'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    location: '',
    productCategory: 'ptfe-wires',
    standard: 'MIL-SPEC',
    sizeSpec: '',
    conductor: 'SPC (Silver Plated)',
    colorPref: 'Natural',
    quantity: '100',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!form.companyName.trim()) tempErrors.companyName = 'Company name is required';
    if (!form.contactName.trim()) tempErrors.contactName = 'Contact person name is required';
    if (!form.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = 'Invalid email address';
    }
    if (!form.phone.trim()) tempErrors.phone = 'Phone / mobile number is required';
    if (!form.location.trim()) tempErrors.location = 'Target delivery location is required';
    if (!form.sizeSpec.trim()) tempErrors.sizeSpec = 'Size / dimension parameter is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: {
            companyName: form.companyName,
            contactName: form.contactName,
            email: form.email,
            phone: form.phone,
            location: form.location,
          },
          items: [{
            productName: `Configurator: ${form.productCategory.toUpperCase()}`,
            specs: {
              awgOrBore: form.sizeSpec,
              voltageClass: `${form.standard} // Conductor: ${form.conductor}`,
              color: form.colorPref,
              quantity: `${form.quantity} Meters`,
              length: form.message
            }
          }]
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setForm({
            companyName: '',
            contactName: '',
            email: '',
            phone: '',
            location: '',
            productCategory: 'ptfe-wires',
            standard: 'MIL-SPEC',
            sizeSpec: '',
            conductor: 'SPC (Silver Plated)',
            colorPref: 'Natural',
            quantity: '100',
            message: ''
          });
        }, 3000);
      } else {
        throw new Error('API submission error');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to transmit RFQ. Please double check details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative bg-paper py-16 md:py-24 font-sans">
      {/* Blueprint grid dots background */}
      <div className="absolute inset-0 bg-grid-dots opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="border-b border-ink/10 pb-8 space-y-4 max-w-3xl">
          <span className="text-[10px] font-mono tracking-widest text-cobalt uppercase font-bold bg-sky/35 px-2 py-1 rounded-xs inline-block">
            PROCUREMENT GATEWAY // RFQ CHANNEL
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-ink uppercase tracking-tight leading-none">
            RFQ Gateway & Direct Channels
          </h1>
          <p className="text-sm md:text-base text-ink/75 leading-relaxed">
            Submit your custom dimensions and conductor parameters directly to our engineering division. Use our live B2B configurator form below or contact our office directly via mobile, landline, or email.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Configurator Form */}
          <div className="lg:col-span-8 bg-white border border-ink/10 p-8 rounded-xs shadow-xs">
            {isSuccess ? (
              <div className="py-16 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-swan-red mx-auto animate-bounce" />
                <h3 className="font-display font-black text-2xl uppercase tracking-wider text-ink">RFQ Transmitted Successfully</h3>
                <p className="text-xs text-ink/60 max-w-md mx-auto leading-relaxed">
                  Thank you. Your detailed sizing specifications have been sent to our plant office in Rohtak. An engineering specialist will compile and send pricing details within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Form Part 1: Product Specs */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-cobalt border-b border-ink/5 pb-2 font-bold">
                    01 // Technical Parameters Configuration
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Category */}
                    <div>
                      <label htmlFor="productCategory" className="block text-[10px] font-mono uppercase text-ink/50 mb-1 font-bold">
                        Product family
                      </label>
                      <select
                        id="productCategory"
                        name="productCategory"
                        value={form.productCategory}
                        onChange={handleInputChange}
                        className="w-full bg-paper border border-ink/10 rounded-xs px-3 py-2 text-xs text-ink focus:outline-none focus:border-cobalt font-mono uppercase"
                      >
                        <option value="ptfe-wires">PTFE Wires</option>
                        <option value="cables">Multi-core / Coax</option>
                        <option value="fep-wires">FEP Wires</option>
                        <option value="ptfe-sleevings">Sleevings</option>
                        <option value="ptfe-tapes">Tapes</option>
                        <option value="silicon-products">Silicon Rubber</option>
                      </select>
                    </div>

                    {/* Standard */}
                    <div>
                      <label htmlFor="standard" className="block text-[10px] font-mono uppercase text-ink/50 mb-1 font-bold">
                        Standard Conformance
                      </label>
                      <select
                        id="standard"
                        name="standard"
                        value={form.standard}
                        onChange={handleInputChange}
                        className="w-full bg-paper border border-ink/10 rounded-xs px-3 py-2 text-xs text-ink focus:outline-none focus:border-cobalt font-mono"
                      >
                        <option value="MIL-SPEC">MIL-W-16878E / MIL-C-17</option>
                        <option value="JSS-APPROVED">JSS 51004 / 54802 / 51100</option>
                        <option value="CUSTOM-SPEC">Custom Engineered Specs</option>
                      </select>
                    </div>

                    {/* Conductor type */}
                    <div>
                      <label htmlFor="conductor" className="block text-[10px] font-mono uppercase text-ink/50 mb-1 font-bold">
                        Conductor Plating
                      </label>
                      <select
                        id="conductor"
                        name="conductor"
                        value={form.conductor}
                        onChange={handleInputChange}
                        className="w-full bg-paper border border-ink/10 rounded-xs px-3 py-2 text-xs text-ink focus:outline-none focus:border-cobalt font-mono"
                      >
                        <option value="SPC (Silver Plated)">Silver-Plated Copper (SPC)</option>
                        <option value="NPC (Nickel Plated)">Nickel-Plated Copper (NPC)</option>
                        <option value="Copper-Weld">Copper-weld / Bare Copper</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Size Parameter */}
                    <div>
                      <label htmlFor="sizeSpec" className="block text-[10px] font-mono uppercase text-ink/50 mb-1 font-bold">
                        Conductor Size (AWG / Bore mm) <span className="text-swan-red">*</span>
                      </label>
                      <input
                        type="text"
                        id="sizeSpec"
                        name="sizeSpec"
                        value={form.sizeSpec}
                        onChange={handleInputChange}
                        placeholder="e.g. 24 AWG or 2.0 mm Bore"
                        className={`w-full bg-paper border ${
                          errors.sizeSpec ? 'border-swan-red' : 'border-ink/10'
                        } rounded-xs px-3 py-2 text-xs text-ink focus:outline-none focus:border-cobalt font-mono`}
                      />
                      {errors.sizeSpec && (
                        <p className="text-swan-red text-[10px] mt-1 font-mono">{errors.sizeSpec}</p>
                      )}
                    </div>

                    {/* Color Swatch Select */}
                    <div>
                      <label htmlFor="colorPref" className="block text-[10px] font-mono uppercase text-ink/50 mb-1 font-bold">
                        Color preference
                      </label>
                      <select
                        id="colorPref"
                        name="colorPref"
                        value={form.colorPref}
                        onChange={handleInputChange}
                        className="w-full bg-paper border border-ink/10 rounded-xs px-3 py-2 text-xs text-ink focus:outline-none focus:border-cobalt font-mono"
                      >
                        <option value="Natural">Natural / White</option>
                        <option value="Black">Black</option>
                        <option value="Red">Red</option>
                        <option value="Blue">Blue</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Green">Green</option>
                        <option value="Bi-Color Stripped">Custom Bi-Color Striping</option>
                      </select>
                    </div>

                    {/* Quantity */}
                    <div>
                      <label htmlFor="quantity" className="block text-[10px] font-mono uppercase text-ink/50 mb-1 font-bold">
                        Run Quantity (Meters)
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="100"
                        value={form.quantity}
                        onChange={handleInputChange}
                        className="w-full bg-paper border border-ink/10 rounded-xs px-3 py-2 text-xs text-ink focus:outline-none focus:border-cobalt font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Part 2: Procurement Contact */}
                <div className="space-y-4 pt-4 border-t border-ink/5">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-cobalt border-b border-ink/5 pb-2 font-bold">
                    02 // Purchasing Contact Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Company */}
                    <div>
                      <label htmlFor="companyName" className="block text-[10px] font-mono uppercase text-ink/50 mb-1 font-bold">
                        Company Name <span className="text-swan-red">*</span>
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={form.companyName}
                        onChange={handleInputChange}
                        className={`w-full bg-paper border ${
                          errors.companyName ? 'border-swan-red' : 'border-ink/10'
                        } rounded-xs px-3 py-2 text-xs text-ink focus:outline-none focus:border-cobalt`}
                      />
                      {errors.companyName && (
                        <p className="text-swan-red text-[10px] mt-1 font-mono">{errors.companyName}</p>
                      )}
                    </div>

                    {/* Contact Person */}
                    <div>
                      <label htmlFor="contactName" className="block text-[10px] font-mono uppercase text-ink/50 mb-1 font-bold">
                        Contact Person <span className="text-swan-red">*</span>
                      </label>
                      <input
                        type="text"
                        id="contactName"
                        name="contactName"
                        value={form.contactName}
                        onChange={handleInputChange}
                        className={`w-full bg-paper border ${
                          errors.contactName ? 'border-swan-red' : 'border-ink/10'
                        } rounded-xs px-3 py-2 text-xs text-ink focus:outline-none focus:border-cobalt`}
                      />
                      {errors.contactName && (
                        <p className="text-swan-red text-[10px] mt-1 font-mono">{errors.contactName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Email */}
                    <div className="sm:col-span-1">
                      <label htmlFor="email" className="block text-[10px] font-mono uppercase text-ink/50 mb-1 font-bold">
                        Email Address <span className="text-swan-red">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        className={`w-full bg-paper border ${
                          errors.email ? 'border-swan-red' : 'border-ink/10'
                        } rounded-xs px-3 py-2 text-xs text-ink focus:outline-none focus:border-cobalt font-mono`}
                      />
                      {errors.email && (
                        <p className="text-swan-red text-[10px] mt-1 font-mono">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-[10px] font-mono uppercase text-ink/50 mb-1 font-bold">
                        Phone / Mobile <span className="text-swan-red">*</span>
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleInputChange}
                        className={`w-full bg-paper border ${
                          errors.phone ? 'border-swan-red' : 'border-ink/10'
                        } rounded-xs px-3 py-2 text-xs text-ink focus:outline-none focus:border-cobalt font-mono`}
                      />
                      {errors.phone && (
                        <p className="text-swan-red text-[10px] mt-1 font-mono">{errors.phone}</p>
                      )}
                    </div>

                    {/* Delivery Destination */}
                    <div>
                      <label htmlFor="location" className="block text-[10px] font-mono uppercase text-ink/50 mb-1 font-bold">
                        Delivery Destination <span className="text-swan-red">*</span>
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={form.location}
                        onChange={handleInputChange}
                        className={`w-full bg-paper border ${
                          errors.location ? 'border-swan-red' : 'border-ink/10'
                        } rounded-xs px-3 py-2 text-xs text-ink focus:outline-none focus:border-cobalt`}
                      />
                      {errors.location && (
                        <p className="text-swan-red text-[10px] mt-1 font-mono">{errors.location}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[10px] font-mono uppercase text-ink/50 mb-1 font-bold">
                      Shielding construction or other comments
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full bg-paper border border-ink/10 rounded-xs px-3 py-2 text-xs text-ink focus:outline-none focus:border-cobalt resize-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-ink/5">
                  <div className="text-[10px] font-mono text-ink/40 flex items-start gap-1.5 leading-tight max-w-sm">
                    <AlertTriangle className="w-4 h-4 text-swan-red shrink-0" />
                    <span>SPECIFICATION SHEETS AND BLUEPRINTS CAN BE DETAILED DIRECTLY OR ATTACHED AS ADDITIONAL FILES IN CORE EMAIL.</span>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-swan-red hover:bg-swan-red/90 text-white font-mono text-xs uppercase tracking-widest px-8 py-3.5 rounded-xs flex items-center gap-2 cursor-pointer font-bold disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      'Submitting RFQ...'
                    ) : (
                      <>
                        Transmit RFQ Document
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}
          </div>

          {/* Right Column: Office Address & Styled Map */}
          <div className="lg:col-span-4 space-y-8">
            {/* Contact details */}
            <div className="bg-ink text-paper p-6 border border-white/10 rounded-xs space-y-6">
              <h3 className="font-display font-black text-lg uppercase tracking-wider text-white">
                ROHTAK DIVISION HEADQUARTERS
              </h3>
              
              <ul className="space-y-4 text-xs text-white/70">
                <li className="flex gap-3">
                  <MapPin className="w-4 h-4 text-swan-red shrink-0 mt-0.5" />
                  <span className="leading-tight">
                    565/32, Circular Road, Rohtak – 124001, Haryana, India
                  </span>
                </li>
                <li className="flex gap-3">
                  <Phone className="w-4 h-4 text-swan-red shrink-0 mt-0.5" />
                  <div className="font-mono space-y-1">
                    <div>Landline: 01262-259727 / 248679</div>
                    <div>Mobile: +91 98100-46627 / 99999-95556</div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Mail className="w-4 h-4 text-swan-red shrink-0" />
                  <a href="mailto:sales@jainpolymers.com" className="font-mono hover:text-white underline">
                    sales@jainpolymers.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Styled Map Placeholder */}
            <div className="bg-white border border-ink/10 p-6 rounded-xs space-y-4">
              <h4 className="font-display font-bold text-xs uppercase text-ink tracking-wider">
                Geographic Coordinate Reference
              </h4>
              
              {/* Technical SVG schematic representation of coordinates */}
              <div className="w-full aspect-[4/3] bg-paper border border-ink/10 rounded-xs relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-grid-dots opacity-40" />
                
                {/* SVG coordinate drawing */}
                <svg viewBox="0 0 200 150" className="w-full h-full text-ink/30 z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Grid lines */}
                  <line x1="100" y1="0" x2="100" y2="150" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                  <line x1="0" y1="75" x2="200" y2="75" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                  {/* Concentric target rings */}
                  <circle cx="100" cy="75" r="25" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
                  <circle cx="100" cy="75" r="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
                  {/* Pin location */}
                  <circle cx="100" cy="75" r="3.5" fill="#F2602F" />
                  <circle cx="100" cy="75" r="8" stroke="#F2602F" strokeWidth="0.75" className="animate-ping" />
                  {/* Coordinate text labels */}
                  <text x="110" y="80" fill="#16181D" fontSize="7" fontFamily="monospace" fontWeight="bold">ROHTAK.IN (28.89°N, 76.60°E)</text>
                </svg>

                {/* Map description labels */}
                <div className="absolute bottom-2 inset-x-2 flex justify-between text-[8px] font-mono text-ink/40 uppercase">
                  <span>SCALE: 1:25,000</span>
                  <span>ELEVATION: 220M</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
