import { defineField, defineType } from 'sanity'

export const aboutType = defineType({
    name: 'about',
    title: 'O nama',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Naslov',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'titleHu',
            title: 'Naslov (Mađarski)',
            type: 'string',
        }),
        defineField({
            name: 'subtitle',
            title: 'Podnaslov',
            type: 'string',
        }),
        defineField({
            name: 'subtitleHu',
            title: 'Podnaslov (Mađarski)',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Opis kompanije',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'descriptionHu',
            title: 'Opis kompanije (Mađarski)',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'yearFounded',
            title: 'Godina osnivanja',
            type: 'number',
        }),
        defineField({
            name: 'teamImage',
            title: 'Slika tima',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'stats',
            title: 'Statistika',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'number', type: 'string', title: 'Broj' },
                        { name: 'label', type: 'string', title: 'Oznaka' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'certifications',
            title: 'Sertifikati i partneri',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', type: 'string', title: 'Naziv' },
                        { name: 'logo', type: 'image', title: 'Logo' },
                    ],
                },
            ],
        }),
    ],
})
