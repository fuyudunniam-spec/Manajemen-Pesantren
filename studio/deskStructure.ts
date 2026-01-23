import { StructureBuilder } from 'sanity/structure';

export const myStructure = (S: StructureBuilder) =>
    S.list()
        .title('Content')
        .items([
            // Singleton Documents
            S.listItem()
                .title('Site Settings')
                .child(
                    S.document()
                        .schemaType('siteSettings')
                        .documentId('siteSettings')
                ),
            S.divider(),

            // Royal Gold Pages
            S.listItem()
                .title('Landing Page')
                .child(
                    S.document()
                        .schemaType('landingPage')
                        .documentId('landingPage')
                ),
            S.listItem()
                .title('About Page')
                .child(
                    S.document()
                        .schemaType('aboutPage')
                        .documentId('aboutPage')
                ),
            S.listItem()
                .title('Donation Page')
                .child(
                    S.document()
                        .schemaType('donationPage')
                        .documentId('donationPage')
                ),
            S.listItem()
                .title('PSB Configuration')
                .child(
                    S.document()
                        .schemaType('psbConfig')
                        .documentId('psbConfig')
                ),
            S.divider(),

            // Other document types
            ...S.documentTypeListItems().filter(
                (listItem) => !['siteSettings', 'landingPage', 'aboutPage', 'donationPage', 'psbConfig'].includes(listItem.getId() as string)
            ),
        ]);
