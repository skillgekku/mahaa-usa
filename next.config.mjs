import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  eslint: {
    // Only run ESLint on specific directories during build
    dirs: ['src/app', 'src/components'],
    // Or ignore during builds (not recommended for production)
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      new URL('https://raw.githubusercontent.com/skillgekku/media-assets/refs/heads/main/**'),
    ],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
