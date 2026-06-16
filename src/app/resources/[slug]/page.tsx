import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticleSlugs } from '../../../utils/markdown';
import { ArrowLeft, BookOpen, ChevronRight, FileText, HelpCircle } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const parsed = getArticleBySlug(slug);
  if (!parsed) return {};
  
  return {
    title: parsed.metadata.meta_title || parsed.metadata.title,
    description: parsed.metadata.meta_description,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const parsed = getArticleBySlug(slug);

  if (!parsed) {
    notFound();
  }

  const siteUrl = process.env.SITE_URL || 'https://www.jainpolymers.com';

  // Breadcrumb List Schema
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
        "name": "Resources",
        "item": `${siteUrl}/resources`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": parsed.metadata.title,
        "item": `${siteUrl}/resources/${slug}`
      }
    ]
  };

  // FAQ Page Schema
  const faqJsonLd = parsed.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": parsed.faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <div className="relative bg-paper py-12 md:py-20 font-sans">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-ink/50 border-b border-ink/5 pb-4">
            <Link href="/" className="hover:text-cobalt">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/resources" className="hover:text-cobalt">Resources</Link>
            <ChevronRight className="w-3 h-3 text-swan-red" />
            <span className="text-ink truncate max-w-xs md:max-w-md">{parsed.metadata.title}</span>
          </div>

          {/* Page Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Content Side: TOC (Desktop) */}
            <div className="lg:col-span-3 lg:sticky lg:top-24 space-y-6 hidden lg:block">
              <div className="border border-ink/10 bg-white p-5 rounded-xs space-y-4 shadow-3xs">
                <span className="text-[9px] font-mono uppercase tracking-widest text-cobalt font-bold block border-b border-ink/5 pb-2">
                  TABLE OF CONTENTS
                </span>
                <ul className="space-y-3 text-[11px] font-mono">
                  {parsed.toc.map((item, idx) => (
                    <li 
                      key={idx} 
                      className={`hover:text-swan-red transition-colors leading-tight ${
                        item.level === 3 ? 'pl-3 text-ink/65' : 'font-bold text-ink'
                      }`}
                    >
                      <a href={`#${item.id}`}>{item.text.toUpperCase()}</a>
                    </li>
                  ))}
                  {parsed.faqs.length > 0 && (
                    <li className="font-bold text-ink hover:text-swan-red transition-colors pt-2 border-t border-ink/5 mt-2">
                      <a href="#faq">FAQ & SCHEMA</a>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Middle Content Side: Main Article */}
            <div className="lg:col-span-9 space-y-8 bg-white border border-ink/10 p-6 md:p-10 rounded-xs shadow-xs">
              
              {/* Header */}
              <div className="space-y-4 border-b border-ink/10 pb-6">
                <div className="flex items-center gap-3 text-[10px] font-mono text-ink/40">
                  <span className="bg-sky/35 text-cobalt px-2 py-0.5 font-bold uppercase rounded-xs">
                    {parsed.metadata.category}
                  </span>
                  <span>·</span>
                  <span>R&D DIVISION</span>
                  <span>·</span>
                  <span>JUNE 2026</span>
                </div>
                <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-ink uppercase tracking-tight leading-tight">
                  {parsed.metadata.title}
                </h1>
              </div>

              {/* Parsed Markdown Body */}
              <div 
                className="article-content"
                dangerouslySetInnerHTML={{ __html: parsed.contentHtml }}
              />

              {/* FAQ Section */}
              {parsed.faqs.length > 0 && (
                <div id="faq" className="pt-8 border-t border-ink/10 space-y-6">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-cobalt" />
                    <h3 className="font-display font-black text-lg text-ink uppercase tracking-wider">
                      Frequently Asked Questions
                    </h3>
                  </div>
                  
                  <div className="space-y-6">
                    {parsed.faqs.map((faq, idx) => (
                      <div key={idx} className="bg-paper p-5 border border-ink/5 rounded-xs space-y-2">
                        <h4 className="font-display font-bold text-sm text-ink uppercase tracking-wide">
                          {faq.question}
                        </h4>
                        <p className="text-xs text-ink/75 leading-relaxed font-sans">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related internal links */}
              {parsed.metadata.internal_links && parsed.metadata.internal_links.length > 0 && (
                <div className="pt-8 border-t border-ink/10 space-y-4">
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-ink/40">Related Products & Specifications</h4>
                  <div className="flex flex-wrap gap-3">
                    {parsed.metadata.internal_links.map((link) => {
                      // Get a clean name for the link
                      let label = link.replace('/products/', '').replace('-', ' ').toUpperCase();
                      if (link === '/quality') label = 'QUALITY & APPROVALS';
                      if (link === '/contact') label = 'REQUEST A QUOTE (RFQ)';
                      
                      return (
                        <Link
                          key={link}
                          href={link}
                          className="border border-ink/15 hover:border-cobalt bg-paper/30 hover:bg-paper text-ink font-mono text-xs uppercase tracking-widest px-4 py-2.5 rounded-xs transition-all font-bold"
                        >
                          {label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </div>
    </>
  );
}
