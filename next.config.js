const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  // Disable filesystem cache in dev — prevents the pack.gz race condition
  // errors on Windows when .next is cleared between restarts
  ...(process.env.NODE_ENV === 'development' && {
    experimental: {
      webpackBuildWorker: false,
    },
  }),

  webpack: (config, { dev }) => {
    if (dev) {
      // Use memory cache in dev — no .pack.gz files written to disk
      config.cache = { type: 'memory' };
    }
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media.dev.to',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media2.dev.to',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'play-lh.googleusercontent.com',
        pathname: '**',
      },
    ],
  },
}
