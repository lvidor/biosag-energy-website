export const heroType = {
    name: 'hero',
    title: 'Hero Section',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Main Title',
            type: 'string',
        },
        {
            name: 'titleHu',
            title: 'Main Title (Hungarian)',
            type: 'string',
        },
        {
            name: 'subtitle',
            title: 'Subtitle',
            type: 'text',
        },
        {
            name: 'subtitleHu',
            title: 'Subtitle (Hungarian)',
            type: 'text',
        },
        {
            name: 'cta',
            title: 'Button Text',
            type: 'string',
        },
        {
            name: 'ctaHu',
            title: 'Button Text (Hungarian)',
            type: 'string',
        },
        {
            name: 'backgroundImage',
            title: 'Background Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
    ],
}
