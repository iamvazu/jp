'use client';

import React, { useState } from 'react';
import { useRfq } from '../context/RfqContext';
import { X, Trash2, Send, CheckCircle2, ChevronRight, FileText } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function RfqSidebar() {
  const { basket, removeItem, clearBasket, isSidebarOpen, setSidebarOpen } = useRfq();
  const [form, setForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    location: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    if (!form.contactName.trim()) tempErrors.contactName = 'Contact person is required';
    if (!form.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = 'Invalid email address';
    }
    if (!form.phone.trim()) tempErrors.phone = 'Phone number is required';
    if (!form.location.trim()) tempErrors.location = 'Target location is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (basket.length === 0) return;
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // Mock API call to Next.js API route /api/quote
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: form,
          items: basket,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          clearBasket();
          setIsSuccess(false);
          setSidebarOpen(false);
          setForm({
            companyName: '',
            contactName: '',
            email: '',
            phone: '',
            location: '',
            message: '',
          });
        }, 3000);
      } else {
        throw new Error('RFQ submission failed');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while sending your RFQ. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-xs"
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-ink text-paper z-50 shadow-2xl flex flex-col font-sans"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-swan-red" />
                <h2 className="text-xl font-bold font-display uppercase tracking-wider">RFQ Quote Basket</h2>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <CheckCircle2 className="w-16 h-16 text-swan-red animate-bounce" />
                  <h3 className="text-2xl font-bold font-display uppercase tracking-wider text-white">RFQ Transmitted</h3>
                  <p className="text-white/60 max-w-xs text-sm">
                    Thank you. Your request for quote has been sent to our engineering team. We will review and contact you shortly.
                  </p>
                </div>
              ) : (
                <>
                  {/* Items List */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 border-b border-white/5 pb-2">
                      Selected Specifications ({basket.length})
                    </h3>

                    {basket.length === 0 ? (
                      <div className="py-8 text-center text-white/40 text-sm">
                        No products in your basket. Add specifications from the product pages to configure your RFQ.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {basket.map((item) => (
                          <div
                            key={item.id}
                            className="bg-white/5 p-4 rounded-xs border border-white/10 flex items-start justify-between gap-4"
                          >
                            <div className="space-y-1">
                              <h4 className="font-semibold text-sm text-white">{item.productName}</h4>
                              <div className="flex flex-wrap gap-2 text-xs font-mono text-white/60">
                                {item.specs.awgOrBore && (
                                  <span className="bg-white/10 px-2 py-0.5 rounded-xs">
                                    Size: {item.specs.awgOrBore}
                                  </span>
                                )}
                                {item.specs.voltageClass && (
                                  <span className="bg-white/10 px-2 py-0.5 rounded-xs">
                                    Voltage: {item.specs.voltageClass}
                                  </span>
                                )}
                                {item.specs.color && (
                                  <span className="bg-white/10 px-2 py-0.5 rounded-xs">
                                    Color: {item.specs.color}
                                  </span>
                                )}
                                {item.specs.quantity && (
                                  <span className="bg-white/10 px-2 py-0.5 rounded-xs">
                                    Qty: {item.specs.quantity}
                                  </span>
                                )}
                                {item.specs.length && (
                                  <span className="bg-white/10 px-2 py-0.5 rounded-xs">
                                    Length: {item.specs.length}
                                  </span>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1 text-white/40 hover:text-swan-red rounded-sm transition-colors mt-0.5"
                              aria-label={`Remove ${item.productName}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Contact Form */}
                  {basket.length > 0 && (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 border-b border-white/5 pb-2">
                        Procurement Information
                      </h3>

                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label htmlFor="companyName" className="block text-xs font-mono uppercase text-white/60 mb-1">
                            Company Name <span className="text-swan-red">*</span>
                          </label>
                          <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={form.companyName}
                            onChange={handleInputChange}
                            className={`w-full bg-white/5 border ${
                              errors.companyName ? 'border-swan-red' : 'border-white/10'
                            } rounded-xs px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cobalt transition-colors`}
                          />
                          {errors.companyName && (
                            <p className="text-swan-red text-[11px] mt-1 font-mono">{errors.companyName}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="contactName" className="block text-xs font-mono uppercase text-white/60 mb-1">
                            Contact Person Name <span className="text-swan-red">*</span>
                          </label>
                          <input
                            type="text"
                            id="contactName"
                            name="contactName"
                            value={form.contactName}
                            onChange={handleInputChange}
                            className={`w-full bg-white/5 border ${
                              errors.contactName ? 'border-swan-red' : 'border-white/10'
                            } rounded-xs px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cobalt transition-colors`}
                          />
                          {errors.contactName && (
                            <p className="text-swan-red text-[11px] mt-1 font-mono">{errors.contactName}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-xs font-mono uppercase text-white/60 mb-1">
                            Email Address <span className="text-swan-red">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleInputChange}
                            className={`w-full bg-white/5 border ${
                              errors.email ? 'border-swan-red' : 'border-white/10'
                            } rounded-xs px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cobalt transition-colors`}
                          />
                          {errors.email && (
                            <p className="text-swan-red text-[11px] mt-1 font-mono">{errors.email}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-xs font-mono uppercase text-white/60 mb-1">
                            Phone / Mobile Number <span className="text-swan-red">*</span>
                          </label>
                          <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleInputChange}
                            placeholder="e.g. +91 98100-46627"
                            className={`w-full bg-white/5 border ${
                              errors.phone ? 'border-swan-red' : 'border-white/10'
                            } rounded-xs px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cobalt transition-colors`}
                          />
                          {errors.phone && (
                            <p className="text-swan-red text-[11px] mt-1 font-mono">{errors.phone}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="location" className="block text-xs font-mono uppercase text-white/60 mb-1">
                            Delivery Destination (City/Country) <span className="text-swan-red">*</span>
                          </label>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            value={form.location}
                            onChange={handleInputChange}
                            className={`w-full bg-white/5 border ${
                              errors.location ? 'border-swan-red' : 'border-white/10'
                            } rounded-xs px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cobalt transition-colors`}
                          />
                          {errors.location && (
                            <p className="text-swan-red text-[11px] mt-1 font-mono">{errors.location}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-xs font-mono uppercase text-white/60 mb-1">
                            Additional Requirements / Custom Dimensions
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={form.message}
                            onChange={handleInputChange}
                            rows={3}
                            placeholder="Specify shielding parameters, insulation wall tolerances, or packaging details..."
                            className="w-full bg-white/5 border border-white/10 rounded-xs px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cobalt transition-colors resize-none"
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-6 bg-swan-red hover:bg-swan-red/90 text-white font-bold py-3 px-6 rounded-xs flex items-center justify-center gap-2 transition-all uppercase tracking-wider text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isSubmitting ? (
                          'Processing RFQ...'
                        ) : (
                          <>
                            Send RFQ to Engineering Team
                            <ChevronRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
