/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  
  serverExternalPackages: ['@prisma/client'],
  
  // Deshabilitar experimentos que pueden causar problemas
  experimental: {
    craCompat: false,
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
  },
  
  webpack(config) {
    // Deshabilitar next-flight-loader que causa problemas con TypeScript
    config.module.rules = config.module.rules.map((rule) => {
      if (rule.use && Array.isArray(rule.use)) {
        rule.use = rule.use.filter((loader) => {
          if (typeof loader === 'object' && loader.loader) {
            return !loader.loader.includes('next-flight-loader');
          }
          return true;
        });
      }
      return rule;
    });
    
    return config;
  },
}

module.exports = nextConfig