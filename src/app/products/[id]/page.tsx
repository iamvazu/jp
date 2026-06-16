import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCT_FAMILIES } from '../../../data/content';
import ProductDetailClient from '../../../components/ProductDetailClient';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return PRODUCT_FAMILIES.map((family) => ({
    id: family.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  
  if (id === 'ptfe-wires') {
    return {
      title: 'PTFE Hook-Up Wire (MIL-W-16878E / JSS 51004) | AWG 30–8',
      description: 'MoD and C-DOT approved high-temperature tape-wrapped PTFE hook-up wire (AWG 30 to 8, Types ET, E, EE). Built strictly to MIL-W-16878E & JSS 51004 specs.',
    };
  }
  if (id === 'cables') {
    return {
      title: 'PTFE Coaxial, Triaxial & Multicore Cables (MIL-C-17)',
      description: 'High-frequency PTFE insulated coaxial and triaxial cables conforming to MIL-C-17 and JSS 51100. Double shielded configurations up to 10 GHz capacity.',
    };
  }
  if (id === 'fep-wires') {
    return {
      title: 'FEP Extruded High-Temperature Wire (−65 to +200 °C)',
      description: 'Melt-extruded fluorinated ethylene propylene (FEP) insulated wires for high-density wiring systems. Thermal resistance from −65 to +200 °C.',
    };
  }
  if (id === 'ptfe-sleevings') {
    return {
      title: 'PTFE Sleeving 0.3–30 mm (MIL-I-22129 / JSS 54802)',
      description: 'Flexible thin-wall, standard, and heavy-duty PTFE sleevings. Bore sizes 0.3 mm to 30 mm, dielectric strength up to 17 kV/mm. JSS 54802 conforming.',
    };
  }
  if (id === 'ptfe-tapes') {
    return {
      title: 'PTFE Cable-Wrap & JAIN FLON Thread-Seal Tape',
      description: 'Sintered/unsintered PTFE tapes for aerospace wire insulation, chemical sealing, and high-performance thread sealants. JAIN FLON brand quality.',
    };
  }
  
  const family = PRODUCT_FAMILIES.find((f) => f.id === id);
  return {
    title: family ? `${family.name} Specs` : 'Product Details',
    description: family ? family.description.slice(0, 150) : 'Technical specifications for Jain Polymer Co. products.',
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const family = PRODUCT_FAMILIES.find((f) => f.id === id);
  if (!family) {
    notFound();
  }

  const siteUrl = process.env.SITE_URL || 'https://www.jainpolymers.com';

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": family.name,
    "image": `${siteUrl}${family.image}`,
    "description": family.description,
    "brand": {
      "@type": "Brand",
      "name": "Jain Polymer Co."
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "price": "100.00",
      "lowPrice": "10.00",
      "highPrice": "1000.00",
      "offerCount": "10",
      "seller": {
        "@type": "Organization",
        "name": "Jain Polymer Co."
      }
    }
  };

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
        "name": "Products",
        "item": `${siteUrl}/products`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": family.name,
        "item": `${siteUrl}/products/${id}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetailClient family={family} />
    </>
  );
}
