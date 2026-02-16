import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
    S.list()
        .title('Content')
        .items([
            // Singleton for Site Settings
            S.listItem()
                .title('Podešavanja sajta')
                .child(
                    S.document()
                        .schemaType('siteSettings')
                        .documentId('siteSettings')
                ),

            // Singleton for About
            S.listItem()
                .title('O nama')
                .child(
                    S.document()
                        .schemaType('about')
                        .documentId('about')
                ),

            // Certificates
            S.listItem()
                .title('Sertifikati i Licence')
                .child(
                    S.documentTypeList('certificate')
                        .title('Sertifikati i Licence')
                ),

            // Divider
            S.divider(),

            // Regular document types
            ...S.documentTypeListItems().filter(
                (item) => item.getId() !== 'siteSettings' && item.getId() !== 'about'
            ),
        ])
