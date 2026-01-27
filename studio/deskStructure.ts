import { StructureBuilder } from 'sanity/structure';

export const myStructure = (S: StructureBuilder) =>
    S.list()
        .title('Content')
        .items([
            // Academy Section (Top Priority)
            S.listItem()
                .title('Academy Management')
                .icon(() => '🎓')
                .child(
                    S.list()
                        .title('Academy Content')
                        .items([
                            S.listItem()
                                .title('Courses (Products)')
                                .icon(() => '📚')
                                .child(S.documentTypeList('course').title('All Courses')),
                            S.listItem()
                                .title('Lessons (Materi)')
                                .icon(() => '📖')
                                .child(S.documentTypeList('lesson').title('All Lessons')),
                            S.listItem()
                                .title('Instructors / Pengajar')
                                .icon(() => '👨‍🏫')
                                .child(S.documentTypeList('instructor').title('Instructors')),
                            S.listItem()
                                .title('Categories')
                                .icon(() => '🏷️')
                                .child(S.documentTypeList('category').title('Course Categories')),
                        ])
                ),
            S.divider(),

            // Landing Page & Configuration
            S.listItem()
                .title('Landing Page')
                .icon(() => '🏠')
                .child(
                    S.document()
                        .schemaType('landingPage')
                        .documentId('landingPage')
                ),
            S.listItem()
                .title('PSB Configuration')
                .icon(() => '📝')
                .child(
                    S.document()
                        .schemaType('psbConfig')
                        .documentId('psbConfig')
                ),
            S.listItem()
                .title('Site Settings')
                .icon(() => '⚙️')
                .child(
                    S.document()
                        .schemaType('siteSettings')
                        .documentId('siteSettings')
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
                                .title('Authors / Penulis')
                                .icon(() => '✍️')
                                .child(
                                    S.documentTypeList('author').title('Authors')
                                ),
                            S.listItem()
                                .title('Categories')
                                .icon(() => '🏷️')
                                .child(
                                    S.documentTypeList('blogCategory').title('Blog Categories')
                                ),
                        ])
                ),
        ]);
