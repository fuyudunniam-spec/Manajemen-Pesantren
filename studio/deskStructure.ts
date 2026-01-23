import { StructureBuilder } from 'sanity/structure';

export const myStructure = (S: StructureBuilder) =>
    S.list()
        .title('Content')
        .items([
            // Singleton Documents
            S.listItem()
                .title('Site Settings')
                .icon(() => '⚙️')
                .child(
                    S.document()
                        .schemaType('siteSettings')
                        .documentId('siteSettings')
                ),
            S.divider(),

            // Royal Gold Pages
            S.listItem()
                .title('Landing Page')
                .icon(() => '🏠')
                .child(
                    S.document()
                        .schemaType('landingPage')
                        .documentId('landingPage')
                ),
            S.listItem()
                .title('About Page')
                .icon(() => '📖')
                .child(
                    S.document()
                        .schemaType('aboutPage')
                        .documentId('aboutPage')
                ),
            S.listItem()
                .title('Donation Page')
                .icon(() => '💝')
                .child(
                    S.document()
                        .schemaType('donationPage')
                        .documentId('donationPage')
                ),
            S.listItem()
                .title('PSB Configuration')
                .icon(() => '📝')
                .child(
                    S.document()
                        .schemaType('psbConfig')
                        .documentId('psbConfig')
                ),
            S.divider(),

            // Blog / Berita Section
            S.listItem()
                .title('Berita & Artikel')
                .icon(() => '📰')
                .child(
                    S.list()
                        .title('Berita & Artikel')
                        .items([
                            S.listItem()
                                .title('All Posts')
                                .icon(() => '📄')
                                .child(
                                    S.documentTypeList('blogPost')
                                        .title('All Blog Posts')
                                        .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                                ),
                            S.listItem()
                                .title('By Category')
                                .icon(() => '📁')
                                .child(
                                    S.documentTypeList('blogCategory')
                                        .title('Categories')
                                        .child((categoryId) =>
                                            S.documentList()
                                                .title('Posts')
                                                .filter('_type == "blogPost" && category._ref == $categoryId')
                                                .params({ categoryId })
                                        )
                                ),
                            S.listItem()
                                .title('Authors / Penulis')
                                .icon(() => '✍️')
                                .child(
                                    S.documentTypeList('author').title('Authors')
                                ),
                            S.divider(),
                            S.listItem()
                                .title('Categories')
                                .icon(() => '🏷️')
                                .child(
                                    S.documentTypeList('blogCategory').title('Blog Categories')
                                ),
                        ])
                ),
            S.divider(),

            // Academy Section
            S.listItem()
                .title('Academy')
                .icon(() => '🎓')
                .child(
                    S.list()
                        .title('Academy Content')
                        .items([
                            S.listItem()
                                .title('Curriculum')
                                .icon(() => '📚')
                                .child(S.documentTypeList('curriculum').title('Curricula')),
                            S.listItem()
                                .title('Classes / Pelajaran')
                                .icon(() => '📖')
                                .child(S.documentTypeList('academyClass').title('Academy Classes')),
                        ])
                ),
            S.divider(),

            // Other document types (filtered)
            S.listItem()
                .title('Donation Programs')
                .icon(() => '💰')
                .child(S.documentTypeList('donationProgram').title('Donation Programs')),
            S.listItem()
                .title('Transparency Reports')
                .icon(() => '📊')
                .child(S.documentTypeList('transparencyReport').title('Transparency Reports')),
        ]);
