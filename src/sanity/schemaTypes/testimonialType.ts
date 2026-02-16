import { defineField, defineType } from 'sanity';

export const testimonialType = defineType({
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Client Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'company',
            title: 'Company / Role',
            type: 'string',
        }),
        defineField({
            name: 'quote',
            title: 'Quote (Serbian)',
            type: 'text',
            rows: 4,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'quoteHu',
            title: 'Quote (Hungarian)',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'rating',
            title: 'Rating',
            type: 'number',
            options: {
                list: [1, 2, 3, 4, 5],
            },
            validation: (Rule) => Rule.min(1).max(5),
        }),
        defineField({
            name: 'image',
            title: 'Client Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'quote',
            media: 'image',
        },
    },
});
