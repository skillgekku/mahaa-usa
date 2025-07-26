import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { YouTubeVideos } from './collections/YouTubeVideos'
import { AdBanners } from './collections/Adbanners'
import { States } from './collections/State'
import { Conference } from './collections/Conference'
import { Media } from './collections/Media'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, YouTubeVideos, AdBanners, States, Conference, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
    // Disable auto-sync in production for safety
    push: process.env.NODE_ENV === 'development',
    // Enable migrations in production
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  // Production optimizations
  onInit: async (payload) => {
    if (process.env.NODE_ENV === 'production') {
      payload.logger.info('🚀 Payload CMS initialized in production mode')
    }
  },
})
