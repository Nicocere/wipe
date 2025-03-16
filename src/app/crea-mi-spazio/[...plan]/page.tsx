import { Metadata } from 'next';
import PlanesPage from '@/Client/CrearSpazio/PlanesSpazio/PlanesSpazio';

interface Props {
  params: Promise<{
    plan: string;
  }>;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const decodePlan = decodeURIComponent(resolvedParams.plan);
  
  const formatCategory = (text: string) => {
    return text
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, str => str.toUpperCase());
  };

  const plan = formatCategory(decodePlan);

  const siteUrl = `https://spazio-digital.vercel.app/soluciones/${plan}`;
  const siteImage = "https://spazio-digital.vercel.app/imagenes/spazio-preview.png";

  return {
    title: `${plan} - Spazio Digital Solutions`,
    description: `Crea tu presencia digital con nuestras soluciones de ${plan}. Sitios web modernos, e-commerce personalizado, blogs y aplicaciones web. Tu Spazio en internet.`,
    keywords: [`desarrollo ${plan}`, `diseño web ${plan}`, `soluciones digitales ${plan}`, `${plan} personalizado`, 'desarrollo web', 'e-commerce', 'aplicaciones web', 'diseño responsive'],
    alternates: {
      canonical: siteUrl,
      languages: {
        'es': siteUrl,
      },
    },
    openGraph: {
      type: 'website',
      url: siteUrl,
      title: `${plan} - Spazio Digital Solutions`,
      description: `Crea tu presencia digital con nuestras soluciones de ${plan}. Sitios web modernos, e-commerce personalizado, blogs y aplicaciones web. Tu Spazio en internet.`,
      siteName: 'Spazio Digital Solutions',
      images: [{
        url: siteImage,
        width: 800,
        height: 600,
        alt: `Soluciones ${plan} - Spazio Digital Solutions`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@SpazioDigital',
      creator: '@SpazioDigital',
      images: [siteImage],
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
      'format-detection': 'telephone=no',
      'language': 'es',
    }
  };
}

export default async function CrearSpazio({ params }: Props) {
  const resolvedParams = await params;
  const decodePlan = decodeURIComponent(resolvedParams.plan);
  
  const formatCategory = (text: string) => {
    return text
      // Inserta un espacio entre minúscula y mayúscula
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      // Capitaliza la primera letra
      .replace(/^./, str => str.toUpperCase());
  };

  const plan = formatCategory(decodePlan);

  return <PlanesPage plan={plan}/>;
}
