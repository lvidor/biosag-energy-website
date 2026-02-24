export const certificateType = {
    name: 'certificate',
    title: 'Sertifikat / Licenca',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Naziv Sertifikata',
            type: 'string',
            description: 'Npr. "Loxone Silver Partner", "Električna Licenca", itd.',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'titleHu',
            title: 'Naziv (Mađarski)',
            type: 'string',
            description: 'Naziv na mađarskom jeziku',
        },
        {
            name: 'issuer',
            title: 'Izdavač',
            type: 'string',
            description: 'Ko je izdao sertifikat (npr. "Loxone", "Ministarstvo energetike")',
        },
        {
            name: 'issuerHu',
            title: 'Izdavač (Mađarski)',
            type: 'string',
        },
        {
            name: 'issueDate',
            title: 'Datum Izdavanja',
            type: 'date',
        },
        {
            name: 'expiryDate',
            title: 'Datum Isteka',
            type: 'date',
            description: 'Ostavite prazno ako sertifikat ne ističe',
        },
        {
            name: 'certificateNumber',
            title: 'Broj Sertifikata',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Slika Sertifikata',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'logo',
            title: 'Logo Partnera (Opciono)',
            type: 'image',
            description: 'Logo kompanije koja je izdala sertifikat (npr. Loxone logo)',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'pdfDocument',
            title: 'PDF Dokument (Opciono)',
            type: 'file',
            description: 'Otpremite PDF verziju sertifikata ako postoji',
            options: {
                accept: '.pdf'
            }
        },
        {
            name: 'description',
            title: 'Opis',
            type: 'text',
            rows: 3,
            description: 'Kratak opis sertifikata',
        },
        {
            name: 'descriptionHu',
            title: 'Opis (Mađarski)',
            type: 'text',
            rows: 3,
        },
        {
            name: 'category',
            title: 'Kategorija',
            type: 'string',
            options: {
                list: [
                    { title: 'Partner Sertifikat', value: 'partner' },
                    { title: 'Električna Licenca', value: 'electrical' },
                    { title: 'ISO Sertifikat', value: 'iso' },
                    { title: 'Obuka', value: 'training' },
                    { title: 'Ostalo', value: 'other' },
                ],
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'displayOrder',
            title: 'Redosled Prikaza',
            type: 'number',
            description: 'Manji broj = viši prioritet',
            initialValue: 0,
        },
        {
            name: 'featured',
            title: 'Istaknut Sertifikat',
            type: 'boolean',
            description: 'Prikazati na početnoj strani?',
            initialValue: false,
        },
    ],
    preview: {
        select: {
            title: 'title',
            issuer: 'issuer',
            media: 'image',
            category: 'category',
        },
        prepare(selection: any) {
            const { title, issuer, category } = selection;
            return {
                title: title,
                subtitle: `${issuer} - ${category}`,
                media: selection.media,
            };
        },
    },
    orderings: [
        {
            title: 'Redosled Prikaza',
            name: 'displayOrder',
            by: [{ field: 'displayOrder', direction: 'asc' }],
        },
        {
            title: 'Datum Izdavanja',
            name: 'issueDate',
            by: [{ field: 'issueDate', direction: 'desc' }],
        },
    ],
};
