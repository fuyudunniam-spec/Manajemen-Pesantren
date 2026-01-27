import { StructureBuilder } from 'sanity/structure';

export const myStructure = (S: StructureBuilder) =>
    S.list()
        .title('Content')
        .items([
            // Academy Section (Primary Focus)
            S.listItem()
                .title('Academy Management')
                .icon(() => '🎓')
                .child(
                    S.list()
                        .title('Academy Content')
                        .items([
                            S.listItem()
                                .title('Courses (Program)')
                                .icon(() => '📚')
                                .child(S.documentTypeList('course').title('All Courses')),
                            S.listItem()
                                .title('Lessons (Materi)')
                                .icon(() => '📖')
                                .child(S.documentTypeList('lesson').title('All Lessons')),
                            S.divider(),
                            S.listItem()
                                .title('Instructors / Pengajar')
                                .icon(() => '👨‍🏫')
                                .child(S.documentTypeList('instructor').title('Instructors')),
                            S.listItem()
                                .title('Course Categories')
                                .icon(() => '🏷️')
                                .child(S.documentTypeList('category').title('Categories')),
                        ])
                ),

            S.divider(),

            // Website Management
            S.listItem()
                .title('Website Management')
                .icon(() => '🌐')
                .child(
                    S.list()
                        .title('Website Configuration')
                        .items([
                            S.listItem()
                                .title('Landing Page')
                                .icon(() => '🏠')
                                .child(
                                    S.document()
                                        .schemaType('landingPage')
                                        .documentId('landingPage')
                                        .title('Academy Landing Page')
                                ),
                            S.listItem()
                                .title('Global siteSettings')
                                .icon(() => '⚙️')
                                .child(
                                    S.document()
                                        .schemaType('siteSettings')
                                        .documentId('siteSettings')
                                        .title('Site Settings')
                                ),
                        ])
                ),

            S.divider(),

            // Blog / News Section
            S.listItem()
                .title('Berita & Artikel')
                .icon(() => '📰')
                .child(
                    S.list()
                        .title('Blog & Communication')
                        .items([
                            S.listItem()
                                .title('All Posts')
                                .icon(() => '📄')
                                .child(
                                    S.documentTypeList('blogPost')
                                        .title('All Blog Posts')
                                        .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                                ),
                            S.divider(),
                            S.listItem()
                                .title('Authors / Penulis')
                                .icon(() => '✍️')
                                .child(
                                    S.documentTypeList('author').title('Authors')
                                ),
                            S.listItem()
                                .title('Blog Categories')
                                .icon(() => '🏷️')
                                .child(
                                    S.documentTypeList('blogCategory').title('Blog Categories')
                                ),
                        ])
                ),
        ]);

