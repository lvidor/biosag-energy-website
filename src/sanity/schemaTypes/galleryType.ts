import { defineField, defineType } from 'sanity'

export const galleryType = defineType({
    name: 'gallery',
    title: 'Galerija slika',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Naziv',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Kategorija',
            type: 'string',
            options: {
                list: [
                    { title: 'Projekti', value: 'projects' },
                    { title: 'Proizvodi', value: 'products' },
                    { title: 'Tim', value: 'team' },
                    { title: 'Sertifikati', value: 'certificates' },
                    { title: 'Ostalo', value: 'other' },
                ],
            },
        }),
        defineField({
            name: 'images',
            title: 'Slike',
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
            name: 'description',
            title: 'Opis',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'publishedAt',
            title: 'Datum objave',
            type: 'datetime',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'images.0',
            category: 'category',
        },
        prepare(selection) {
            const { title, media, category } = selection
            return {
                title: title,
                subtitle: category ? `Kategorija: ${category}` : 'Bez kategorije',
                media: media,
            }
        },
    },
})
