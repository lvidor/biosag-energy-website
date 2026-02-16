import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
    name: 'siteSettings',
    title: 'Podešavanja sajta',
    type: 'document',
    fields: [
        defineField({
            name: 'siteName',
            title: 'Naziv sajta',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
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
            ],
            description: 'Logo kompanije koji se prikazuje u navigaciji'
        }),
        defineField({
            name: 'tagline',
            title: 'Slogan',
            type: 'string',
        }),
        defineField({
            name: 'taglineHu',
            title: 'Slogan (Mađarski)',
            type: 'string',
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
            name: 'contactEmail',
            title: 'Kontakt email',
            type: 'string',
        }),
        defineField({
            name: 'contactPhone',
            title: 'Kontakt telefon',
            type: 'string',
        }),
        defineField({
            name: 'address',
            title: 'Adresa',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'socialLinks',
            title: 'Društvene mreže',
            type: 'object',
            fields: [
                {
                    name: 'facebook',
                    type: 'url',
                    title: 'Facebook'
                },
                {
                    name: 'instagram',
                    type: 'url',
                    title: 'Instagram'
                },
                {
                    name: 'linkedin',
                    type: 'url',
                    title: 'LinkedIn'
                },
            ]
        }),
    ],
    preview: {
        select: {
            title: 'siteName',
            media: 'logo',
        },
    },
})
