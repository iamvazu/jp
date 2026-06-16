import type { Metadata, Viewport } from 'next';
import { Archivo, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { RfqProvider } from '../context/RfqContext';
import SmoothScroll from '../components/SmoothScroll';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RfqSidebar from '../components/RfqSidebar';
import { Analytics } from '@vercel/analytics/next';

const archivo = Archivo({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://www.jainpolymers.com'),
  title: {
    default: 'PTFE & Teflon Wire Manufacturer in India | MoD-Approved | Jain Polymer Co.',
    template: '%s | Jain Polymer Co.',
  },
  description: 'Ministry of Defence (L.C.S.O) and C-DOT approved manufacturer of high-performance PTFE/Teflon and FEP wires, cables, sleeves, and tapes since 1991.',
  authors: [{ name: 'Jain Polymer Co.' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = process.env.SITE_URL || 'https://www.jainpolymers.com';
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "Jain Polymer Co.",
        "url": siteUrl,
        "logo": `${siteUrl}/brand/crops/emblem_of_india.svg`,
        "description": "Ministry of Defence (L.C.S.O) and C-DOT approved manufacturer of high-performance PTFE/Teflon and FEP wires, cables, sleeves, and tapes."
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#localbusiness`,
        "name": "Jain Polymer Co.",
        "image": `${siteUrl}/brand/crops/photo_wire_coils_bundles.jpg`,
        "telephone": "+91-1262-259727",
        "url": siteUrl,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "565/32, Circular Road",
          "addressLocality": "Rohtak",
          "addressRegion": "Haryana",
          "postalCode": "124001",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.89,
          "longitude": 76.60
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "09:00",
          "closes": "18:00"
        }
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink selection:bg-cobalt selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <RfqProvider>
          <SmoothScroll>
            <Header />
            <main className="flex-grow pt-[64px] md:pt-[76px]">
              {children}
            </main>
            <Footer />
            <RfqSidebar />
            <Analytics />
          </SmoothScroll>
        </RfqProvider>
      </body>
    </html>
  );
}
