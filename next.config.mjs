/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['gsap'],
  reactStrictMode: true,
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      // Mantén cualquier otro dominio que ya tengas configurado aquí
    ],
  },
  async rewrites() {
    return [
      {
        // Redirige la ruta dinámica basada en el subdominio
        source: '/:subdomain',  // Captura cualquier subdominio
        destination: '/:subdomain',  // Redirige a la ruta correspondiente (ej. /personal o /ecommerce)
      },
    ];
  },
  async headers() {
    return [
      {
        // Aplica cabeceras específicas para el subdominio
        source: '/:subdomain',  // Ruta dinámica que captura el subdominio
        headers: [
          {
            key: 'x-subdomain',
            value: ':subdomain',  // Pasa el subdominio como un encabezado
          },
        ],
      },
    ];
  },
};

export default nextConfig;