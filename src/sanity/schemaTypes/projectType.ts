import { defineField, defineType } from 'sanity'

export const projectType = defineType({
    name: 'project',
    title: 'Projekti',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Naziv projekta',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'titleHu',
            title: 'Naziv projekta (Mađarski)',
            type: 'string',
        }),
        // ... (slug is shared)
        defineField({
            name: 'slug',
            title: 'URL slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        // ... (category is shared)
        // ... (mainImage is shared) 
        // ... (gallery is shared)

        defineField({
            name: 'description',
            title: 'Kratak opis',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'descriptionHu',
            title: 'Kratak opis (Mađarski)',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'fullDescription',
            title: 'Detaljan opis',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'fullDescriptionHu',
            title: 'Detaljan opis (Mađarski)',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'category',
            title: 'Kategorija',
            type: 'string',
            options: {
                list: [
                    { title: 'Automatizacija kuća', value: 'home-automation' },
                    { title: 'Poslovni prostori', value: 'commercial' },
                    { title: 'Spoljašnja automatizacija', value: 'outdoor' },
                    { title: 'Sigurnost i nadzor', value: 'security' },
                    { title: 'Energetska efikasnost', value: 'energy' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'mainImage',
            title: 'Glavna slika',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternativni tekst',
                }
            ]
        }),
        defineField({
            name: 'gallery',
            title: 'Galerija slika',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternativni tekst',
                        },
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Opis slike',
                        }
                    ]
                }
            ],
        }),
        defineField({
            name: 'location',
            title: 'Lokacija',
            type: 'string',
        }),
        defineField({
            name: 'completionDate',
            title: 'Datum završetka',
            type: 'date',
        }),
        defineField({
            name: 'client',
            title: 'Klijent',
            type: 'string',
        }),
        defineField({
            name: 'features',
            title: 'Karakteristike projekta',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'featured',
            title: 'Istaknut projekat',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
            category: 'category',
            date: 'completionDate',
        },
        prepare(selection) {
            const { title, media, category, date } = selection
            return {
                title: title,
                subtitle: `${category || 'Bez kategorije'} ${date ? `• ${date}` : ''}`,
                media: media,
            }
        },
    },
})
