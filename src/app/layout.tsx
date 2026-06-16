import type { Metadata, Viewport } from 'next';
import { Archivo, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { RfqProvider } from '../context/RfqContext';
import SmoothScroll from '../components/SmoothScroll';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RfqSidebar from '../components/RfqSidebar';

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
  title: 'Jain Polymer Co. | High-Performance PTFE & FEP Cables',
  description: 'Ministry of Defence (L.C.S.O) and C-DOT approved manufacturer of PTFE/Teflon and FEP wires, cables, sleeves, and tapes. Premium engineering quality since 1991.',
  keywords: ['PTFE wire', 'Teflon cable', 'FEP extruded wires', 'PTFE sleeve', 'LCSO approved cables', 'JSS 51004', 'MIL-W-16878E'],
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
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink selection:bg-cobalt selection:text-white">
        <RfqProvider>
          <SmoothScroll>
            <Header />
            <main className="flex-grow pt-[64px] md:pt-[76px]">
              {children}
            </main>
            <Footer />
            <RfqSidebar />
          </SmoothScroll>
        </RfqProvider>
      </body>
    </html>
  );
}
