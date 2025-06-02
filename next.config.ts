/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client']
  },
  
  images: {
    domains: [
      'guionix-brain-production.up.railway.app',
      'res.cloudinary.com',
      'images.unsplash.com'
    ]
  },
  
  async rewrites() {
    return [
      {
        source: '/api/external/brain/:path*',
        destination: 'https://guionix-brain-production.up.railway.app/:path*'
      },
      {
        source: '/api/external/ai/:path*',
        destination: 'https://guionix-ai-orchestrator-production.up.railway.app/:path*'
      },
      {
        source: '/api/external/script/:path*',
        destination: 'https://guionix-script-engine-production.up.railway.app/:path*'
      },
      {
        source: '/api/external/export/:path*',
        destination: 'https://guionix-export-engine-production.up.railway.app/:path*'
      }
    ]
  }
}

export default nextConfig
