/** @type {import('next').NextConfig} */
const nextConfig = {
  
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
    ];
  }
}

module.exports = nextConfig
