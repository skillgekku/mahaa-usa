import { CollectionConfig } from 'payload'

export const Channels: CollectionConfig = {
  slug: 'channels',
  admin: {
    useAsTitle: 'name',
    group: 'Media',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unique identifier for the channel (e.g., "tana-conference")',
      },
    },
    {
      name: 'color',
      type: 'select',
      required: true,
      options: [
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' },
        { label: 'Pink', value: 'pink' },
        { label: 'Indigo', value: 'indigo' },
        { label: 'Teal', value: 'teal' },
        { label: 'Amber', value: 'amber' },
        { label: 'Purple', value: 'purple' },
        { label: 'Red', value: 'red' },
      ],
    },
    {
      name: 'bgGradient',
      type: 'text',
      required: true,
      admin: {
        description: 'Tailwind gradient classes (e.g., "from-blue-600 to-blue-800")',
      },
    },
    {
      name: 'icon',
      type: 'text',
      required: true,
      admin: {
        description: 'Emoji icon for the channel',
      },
    },
    {
      name: 'isYoutube',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Is this a YouTube-based channel?',
      },
    },
    {
      name: 'streamUrl',
      type: 'text',
      admin: {
        condition: (data) => !data.isYoutube,
        description: 'HLS stream URL (for non-YouTube channels)',
      },
    },
    {
      name: 'youtubeVideoId',
      type: 'text',
      admin: {
        condition: (data) => data.isYoutube,
        description: 'Default YouTube video ID for this channel',
      },
    },
    {
      name: 'youtubePlaylist',
      type: 'relationship',
      relationTo: 'youtube-videos',
      hasMany: true,
      admin: {
        condition: (data) => data.isYoutube,
        description: 'YouTube videos for this channel',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this channel is active and should be displayed',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Display order (lower numbers appear first)',
      },
    },
  ],
  timestamps: true,
}
