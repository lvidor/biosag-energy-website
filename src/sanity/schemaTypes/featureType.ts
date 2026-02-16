export const featureType = {
    name: 'feature',
    title: 'Service Feature',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'titleHu',
            title: 'Title (Hungarian)',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'descriptionHu',
            title: 'Description (Hungarian)',
            type: 'text',
        },
        {
            name: 'icon',
            title: 'Icon Name (Lucide)',
            type: 'string',
            description: 'Name of the Lucide icon to use (e.g., "Home", "Zap", "Shield")',
        },
        {
            name: 'image',
            title: 'Feature Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
    ],
}
