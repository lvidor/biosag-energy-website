import { defineField, defineType } from 'sanity'

export const faqType = defineType({
    name: 'faq',
    title: 'Česta pitanja (FAQ)',
    type: 'document',
    fields: [
        defineField({
            name: 'question',
            title: 'Pitanje',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'questionHu',
            title: 'Pitanje (Mađarski)',
            type: 'string',
        }),
        defineField({
            name: 'answer',
            title: 'Odgovor',
            type: 'text',
            rows: 4,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'answerHu',
            title: 'Odgovor (Mađarski)',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'category',
            title: 'Kategorija',
            type: 'string',
            options: {
                list: [
                    { title: 'Opšte', value: 'general' },
                    { title: 'Loxone sistem', value: 'loxone' },
                    { title: 'Instalacija', value: 'installation' },
                    { title: 'Cene i plaćanje', value: 'pricing' },
                    { title: 'Održavanje', value: 'maintenance' },
                    { title: 'Solarne elektrane', value: 'solar' },
                    { title: 'Električne instalacije', value: 'electrical' },
                ],
            },
        }),
        defineField({
            name: 'order',
            title: 'Redosled prikaza',
            type: 'number',
            initialValue: 0,
        }),
    ],
    preview: {
        select: {
            title: 'question',
            subtitle: 'category',
        },
    },
    orderings: [
        {
            title: 'Redosled',
            name: 'orderAsc',
            by: [
                { field: 'order', direction: 'asc' }
            ]
        },
    ],
})
