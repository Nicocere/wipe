import "./globals.css";
import 'swiper/css/bundle';
import { Inter } from "next/font/google";
import { Syne } from "next/font/google";
import { AuthUserProvider } from '@/context/AuthUserContext';
import Footer from "@/componentes/Footer/Footer";
import { Metadata } from 'next'
import Head from "next/head";
import ClientLayoutComponent from '@/Client/LayoutHome'
import { TransitionProvider } from "@/context/TransitionPageContext";
import {ThemeProvider} from '@/context/ThemeSwitchContext'


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ['300', '400', '500', '600'],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ['500', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://quickmenudigital.com'),
  title: {
    template: '%s | Wipe.',
    default: 'QuickMenu'
  },
  description: 'Wipe - Agiliza la dinámica comercial con cartas virtuales y QR para bares y restaurantes. Optimiza procesos de atención, compra y venta con soluciones digitales únicas para comercios y clientes.',
  keywords: ['cartas virtuales', 'QR', 'restaurantes', 'bares', 'gastronomía', 'entretenimiento', 'indumentaria', 'pedidos online', 'gestión de negocio', 'métricas', 'administración comercial', 'agilidad comercial', 'soluciones digitales'],
  openGraph: {
    type: 'website',
    title: 'QuickMenu',
    description: 'Wipe - Agiliza la dinámica comercial con cartas virtuales y QR para bares y restaurantes. Soluciones digitales únicas que optimizan procesos de atención, compra y venta.',
    url: 'https://quickmenudigital.com',
    siteName: 'QuickMenu',
    locale: 'es_AR',
    images: [{
      url: 'https://wipe-app.vercel.app/imagenes/wipe-preview.png',
      width: 800,
      height: 600,
      alt: 'QuickMenu - La solución digital para bares y restaurantes',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@WipeApp',
    creator: '@WipeApp',
    images: ['https://wipe-app.vercel.app/imagenes/wipe-preview.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'google-site-verification-code',
  },
  alternates: {
    canonical: 'https://quickmenudigital.com',
    languages: {
      'es-AR': 'https://quickmenudigital.com',
    },
  },
  authors: [{ name: 'QuickMenu' }],
  generator: 'QuickMenu',
  applicationName: 'QuickMenu Web',
  referrer: 'origin-when-cross-origin',
  creator: 'QuickMenu',
  publisher: 'QuickMenu',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    
        {/* <style>
          @import url('https://fonts.googleapis.com/css2?family=Encode+Sans+Expanded:wght@100;200;300;400;500;600;700;800;900&display=swap');
        </style> */}
      </Head>
      <body className={`${inter.variable} ${syne.variable}`}>
        <div id="global-gradient-bg">
          <div className="global-orb global-orb1" />
          <div className="global-orb global-orb2" />
          <div className="global-orb global-orb3" />
        </div>
        <AuthUserProvider>
          <ThemeProvider>
            <TransitionProvider>
              <ClientLayoutComponent >
                {children}
              </ClientLayoutComponent>
              <Footer />
            </TransitionProvider>
          </ThemeProvider>  
        </AuthUserProvider>
      </body>
    </html>
  );
}