import { defineField, defineType } from 'sanity'

export const galleryType = defineType({
    name: 'gallery',
    title: 'Galerija slika',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Naziv (Srpski)',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'titleHu',
            title: 'Naziv (Mađarski)',
            type: 'string',
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
                            title: 'Opis slike (Srpski)',
                        },
                        {
                            name: 'captionHu',
                            type: 'string',
                            title: 'Opis slike (Mađarski)',
                        }
                    ]
                }
            ],
        }),
        defineField({
            name: 'description',
            title: 'Opis (Srpski)',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'descriptionHu',
            title: 'Opis (Mađarski)',
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
