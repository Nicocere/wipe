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
  metadataBase: new URL('https://spazio-digital.vercel.app'),
  title: {
    template: '%s | SPAZIO.',
    default: 'SPAZIO. | Crea Tu Espacio Digital'
  },
  description: 'Spazio Digital Solutions - Desarrollamos sitios web personalizados, e-commerce y soluciones digitales innovadoras para tu negocio. Tu presencia digital, nuestro compromiso.',
  keywords: ['desarrollo web', 'diseño web', 'e-commerce', 'sitios web personalizados', 'spazio digital', 'soluciones digitales'],
  openGraph: {
    type: 'website',
    title: 'SPAZIO. | Crea Tu Espacio Digital',
    description: 'Spazio Digital Solutions - Desarrollamos sitios web personalizados, e-commerce y soluciones digitales innovadoras para tu negocio.',
    url: 'https://spazio-digital.vercel.app',
    siteName: 'Spazio Digital Solutions',
    locale: 'es_AR',
    images: [{
      url: 'https://spazio-digital.vercel.app/imagenes/spazio-preview.png',
      width: 800,
      height: 600,
      alt: 'Spazio Digital Solutions - Tu espacio en la web',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@SpazioDigital',
    creator: '@SpazioDigital',
    images: ['https://spazio-digital.vercel.app/imagenes/spazio-preview.png'],
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
    canonical: 'https://spazio-digital.vercel.app',
    languages: {
      'es-AR': 'https://spazio-digital.vercel.app',
    },
  },
  authors: [{ name: 'Spazio Digital Solutions' }],
  generator: 'Spazio Digital Solutions',
  applicationName: 'Spazio Digital',
  referrer: 'origin-when-cross-origin',
  creator: 'Spazio Digital Solutions',
  publisher: 'Spazio Digital Solutions',
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