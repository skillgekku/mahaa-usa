import { CollectionConfig } from 'payload'

export const AdBanners: CollectionConfig = {
  slug: 'ad-banners',
  admin: {
    defaultColumns: ['title', 'subtitle', 'isActive', 'displayOrder'],
    useAsTitle: 'title',
    description: 'Manage rotating advertisement banners',
    group: 'Content',
  },
  access: {
    read: () => true, // Public read access
    create: ({ req: { user } }) => Boolean(user), // Only authenticated users can create
    update: ({ req: { user } }) => Boolean(user), // Only authenticated users can update
    delete: ({ req: { user } }) => Boolean(user), // Only authenticated users can delete
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 100,
      admin: {
        description: 'The main title/heading for the ad banner',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      maxLength: 200,
      admin: {
        description: 'Subtitle or description text for the ad banner',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media', // Assumes you have a media collection
      required: false,
      admin: {
        description: 'Logo image for the ad banner (recommended: 200x150px)',
      },
    },
    {
      name: 'logoUrl',
      type: 'text',
      admin: {
        condition: (data) => !data.logo,
        description: 'Alternative: Direct URL to logo image (used if no logo upload)',
      },
    },
    {
      name: 'clickUrl',
      type: 'text',
      admin: {
        description: 'Optional: URL to redirect when banner is clicked',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this banner should be displayed in rotation',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Order in which banners appear (lower numbers first)',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      admin: {
        description: 'Optional: Date when banner should start showing',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        description: 'Optional: Date when banner should stop showing',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'targetAudience',
      type: 'select',
      options: [
        {
          label: 'All Users',
          value: 'all',
        },
        {
          label: 'Mobile Only',
          value: 'mobile',
        },
        {
          label: 'Desktop Only',
          value: 'desktop',
        },
        {
          label: 'Tablet Only',
          value: 'tablet',
        },
      ],
      defaultValue: 'all',
      admin: {
        description: 'Target specific device types',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        {
          label: 'Financial Services',
          value: 'financial',
        },
        {
          label: 'Events',
          value: 'events',
        },
        {
          label: 'Organizations',
          value: 'organizations',
        },
        {
          label: 'General',
          value: 'general',
        },
      ],
      admin: {
        description: 'Category for better organization',
      },
    },
    {
      name: 'impressions',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        description: 'Number of times this banner has been displayed',
      },
    },
    {
      name: 'clicks',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        description: 'Number of times this banner has been clicked',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Ensure either logo upload or logoUrl is provided
        if (!data.logo && !data.logoUrl) {
          throw new Error('Either upload a logo or provide a logo URL')
        }
        return data
      },
    ],
  },
  timestamps: true,
}
