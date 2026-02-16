import { defineField, defineType } from 'sanity'

export const productType = defineType({
    name: 'product',
    title: 'Proizvodi',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Naziv proizvoda',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'titleHu',
            title: 'Naziv proizvoda (Mađarski)',
            type: 'string',
        }),
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
        defineField({
            name: 'price',
            title: 'Cena',
            type: 'string',
            description: 'Npr. "45.000 RSD" ili "Cena na upit"',
        }),
        defineField({
            name: 'category',
            title: 'Kategorija',
            type: 'string',
            options: {
                list: [
                    { title: 'Loxone Control', value: 'control' },
                    { title: 'Senzori', value: 'sensors' },
                    { title: 'Naperőművek', value: 'solar' },
                    { title: 'Osvetljenje', value: 'lighting' },
                    { title: 'Audio', value: 'audio' },
                    { title: 'Pribor', value: 'accessories' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Opis',
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
                        }
                    ]
                }
            ],
        }),
        defineField({
            name: 'specifications',
            title: 'Specifikacije',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', title: 'Labela (npr. Napajanje)' },
                        { name: 'labelHu', type: 'string', title: 'Labela (Mađarski)' },
                        { name: 'value', type: 'string', title: 'Vrednost' },
                        { name: 'valueHu', type: 'string', title: 'Vrednost (Mađarski)' },
                    ],
                }
            ],
        }),
        defineField({
            name: 'featured',
            title: 'Istaknut proizvod',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
            category: 'category',
            price: 'price',
        },
        prepare(selection) {
            const { title, media, category, price } = selection
            return {
                title: title,
                subtitle: `${category || 'Bez kategorije'} ${price ? `• ${price}` : ''}`,
                media: media,
            }
        },
    },
})
