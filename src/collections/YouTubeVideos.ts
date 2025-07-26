import { CollectionConfig } from 'payload'

export const YouTubeVideos: CollectionConfig = {
  slug: 'youtube-videos',
  admin: {
    useAsTitle: 'title',
    group: 'Media',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'youtubeId',
      type: 'text',
      required: true,
      label: 'YouTube Video ID',
      admin: {
        description: 'The YouTube video ID (e.g., "Izd-SLokbPY")',
      },
    },
    {
      name: 'duration',
      type: 'text',
      required: true,
      admin: {
        description: 'Video duration in format like "2:45:30"',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Opening Ceremony', value: 'Opening Ceremony' },
        { label: 'Cultural', value: 'Cultural' },
        { label: 'Youth Event', value: 'Youth Event' },
        { label: 'Business', value: 'Business' },
        { label: 'Conference', value: 'Conference' },
        { label: 'Awards', value: 'Awards' },
        { label: 'Political', value: 'Political' },
        { label: 'Convention', value: 'Convention' },
        { label: 'Professional', value: 'Professional' },
        { label: 'Education', value: 'Education' },
        { label: 'Awards Ceremony', value: 'Awards Ceremony' },
        { label: 'Celebrity Interview', value: 'Celebrity Interview' },
        { label: 'Movie Promotion', value: 'Movie Promotion' },
        { label: 'Beauty Pageant', value: 'Beauty Pageant' },
        { label: 'Business Interview', value: 'Business Interview' },
        { label: 'Pageant', value: 'Pageant' },
        { label: 'Entertainment', value: 'Entertainment' },
        { label: 'Music Festival', value: 'Music Festival' },
        { label: 'Comedy', value: 'Comedy' },
        { label: 'Interview', value: 'Interview' },
      ],
    },
    {
      name: 'scheduledTime',
      type: 'text',
      admin: {
        description: 'Scheduled time in 24-hour format (e.g., "09:00")',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this video is active and should be displayed',
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
