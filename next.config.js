/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove standalone output for Railway deployment
  // output: 'standalone',
  
  // Skip type checking and linting during build for now
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Additional build optimizations
  swcMinify: true,
  experimental: {
    esmExternals: false,
  },
  
  images: {
    domains: [
      'guionix-brain-production.up.railway.app',
      'guionix-ai-orchestrator-production.up.railway.app',
      'guionix-script-engine-production.up.railway.app',
      'guionix-export-engine-production.up.railway.app'
    ]
  },
  
  async rewrites() {
    return [
      // Proxy para servicios backend
      {
        source: '/api/backend/brain/:path*',
        destination: 'https://guionix-brain-production.up.railway.app/api/:path*'
      },
      {
        source: '/api/backend/ai-orchestrator/:path*',
        destination: 'https://guionix-ai-orchestrator-production.up.railway.app/api/:path*'
      },
      {
        source: '/api/backend/script-engine/:path*',
        destination: 'https://guionix-script-engine-production.up.railway.app/api/:path*'
      },
      {
        source: '/api/backend/export-engine/:path*',
        destination: 'https://guionix-export-engine-production.up.railway.app/api/:path*'
      },
      // Legacy external API route
      {
        source: '/api/external/:path*',
        destination: '/api/external/:path*'
      }
    ];
  },
  
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
      // Headers específicos para servicios backend
      {
        source: '/api/backend/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization, X-API-Key' },
          { key: 'X-Guionix-Frontend', value: 'true' },
        ],
      },
    ];
  },

  // Variables de entorno para el build
  env: {
    GUIONIX_BRAIN_URL: process.env.GUIONIX_BRAIN_URL,
    GUIONIX_AI_ORCHESTRATOR_URL: process.env.GUIONIX_AI_ORCHESTRATOR_URL,
    GUIONIX_SCRIPT_ENGINE_URL: process.env.GUIONIX_SCRIPT_ENGINE_URL,
    GUIONIX_EXPORT_ENGINE_URL: process.env.GUIONIX_EXPORT_ENGINE_URL,
  }
}

module.exports = nextConfig
