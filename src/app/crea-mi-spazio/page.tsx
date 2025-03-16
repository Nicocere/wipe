import { Metadata } from 'next';
import CreaMiSpacioComponent from '@/Client/CrearSpazio/CrearSpazio';

export const metadata: Metadata = {
  title: "Crea tu Spazio Digital - Soluciones Web Personalizadas",
  description: "Desarrollamos tu presencia digital perfecta. Sitios web modernos, e-commerce, blogs personalizados y soluciones digitales innovadoras. Tu Spazio en la web.",
  keywords: ["desarrollo web", "diseño web personalizado", "e-commerce", "sitios web", "spazio digital", "desarrollo tienda online", "blogs", "landing pages", "aplicaciones web", "soluciones digitales"],
  alternates: {
    canonical: 'https://spazio-digital.vercel.app/productos/digital',
    languages: {
      'es': 'https://spazio-digital.vercel.app/productos/digital',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://spazio-digital.vercel.app/productos/digital',
    title: 'Crea tu Spazio Digital - Soluciones Web Personalizadas',
    description: 'Desarrollamos tu presencia digital perfecta. Sitios web modernos, e-commerce, blogs personalizados y soluciones digitales innovadoras. Tu Spazio en la web.',
    siteName: 'Spazio Digital Solutions',
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
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [{ name: 'Spazio Digital Solutions' }],
  other: {
    'geo.region': 'AR',
    'language': 'es',
  }
};

export default function CrearSpazio() {
  return <CreaMiSpacioComponent />;
}