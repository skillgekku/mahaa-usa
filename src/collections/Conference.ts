import { CollectionConfig } from 'payload'

export const Conference: CollectionConfig = {
  slug: 'conferences',
  admin: {
    useAsTitle: 'name',
    group: 'Geography',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'id',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unique identifier for the state (e.g., "texas")',
      },
    },
    {
      name: 'color',
      type: 'select',
      required: true,
      options: [
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' },
        { label: 'Forest', value: 'forest' },
        { label: 'Orange', value: 'orange' },
        { label: 'Cyan', value: 'cyan' },
        { label: 'Teal', value: 'teal' },
        { label: 'Purple', value: 'purple' },
        { label: 'Yellow', value: 'yellow' },
        { label: 'Indigo', value: 'indigo' },
        { label: 'Amber', value: 'amber' },
        { label: 'Rose', value: 'rose' },
        { label: 'Gray', value: 'gray' },
      ],
    },
    {
      name: 'events',
      type: 'number',
      required: true,
      admin: {
        description: 'Number of events in this state',
      },
    },
    {
      name: 'type',
      type: 'text',
      required: true,
      admin: {
        description: 'Symbolic type representing the state (e.g., "star", "bear", "peach")',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this state is active and should be displayed',
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
