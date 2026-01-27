import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'lesson',
    title: 'Lesson (Materi)',
    type: 'document',
    groups: [
        { name: 'basic', title: 'Informasi Dasar', default: true },
        { name: 'content', title: 'Konten Materi' },
        { name: 'access', title: 'Akses & Infaq' },
    ],
    fields: [
        // === BASIC INFO ===
        defineField({
            name: 'title',
            title: 'Judul Sesi',
            type: 'string',
            group: 'basic',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'basic',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'order',
            title: 'Urutan Sesi',
            type: 'number',
            group: 'basic',
            description: 'Nomor urut dalam modul (1, 2, 3, dst)',
            initialValue: 1
        }),
        defineField({
            name: 'duration',
            title: 'Durasi (menit)',
            type: 'number',
            group: 'basic',
        }),

        // === CONTENT (BLOCK-BASED / LEGO) ===
        defineField({
            name: 'content',
            title: 'Isi Materi (Susun Blok)',
            type: 'array',
            group: 'content',
            description: 'Susun materi seperti Lego: Video → Teks → Kuis → dst.',
            of: [
                // 1. YouTube Video
                { type: 'youtubeEmbed' },
                // 2. Rich Text (Qawaid, Penjelasan)
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H2 (Judul Bab)', value: 'h2' },
                        { title: 'H3 (Sub-Bab)', value: 'h3' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Bold', value: 'strong' },
                            { title: 'Italic', value: 'em' },
                            { title: 'Underline', value: 'underline' },
                            { title: 'Arabic Text', value: 'arabic' },
                        ]
                    }
                },
                // 3. Image
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Caption'
                        }
                    ]
                },
                // 4. Vocabulary Block
                { type: 'vocabularyBlock' },
                // 5. Quiz / Tamrinat
                { type: 'quizBlock' },
            ],
        }),

        // === ACCESS CONTROL ===
        defineField({
            name: 'isFreePreview',
            title: 'Gratis Akses (Free Preview)?',
            type: 'boolean',
            group: 'access',
            initialValue: false,
            description: 'Jika YA, materi ini bisa diakses tanpa infaq'
        }),
        defineField({
            name: 'infaqRequired',
            title: 'Minimum Infaq (IDR)',
            type: 'number',
            group: 'access',
            description: 'Nominal infaq minimum untuk membuka materi ini. Kosongkan jika gratis.',
            hidden: ({ parent }) => parent?.isFreePreview === true
        }),

        // === RESOURCES ===
        defineField({
            name: 'resources',
            title: 'Materi Tambahan (Download)',
            type: 'array',
            group: 'content',
            of: [{
                type: 'object',
                fields: [
                    { name: 'title', title: 'Nama File', type: 'string' },
                    { name: 'file', title: 'File', type: 'file' },
                ],
                preview: {
                    select: { title: 'title' },
                    prepare({ title }) {
                        return { title, media: () => '📎' }
                    }
                }
            }],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            order: 'order',
            isFree: 'isFreePreview'
        },
        prepare({ title, order, isFree }) {
            return {
                title: `${order ? `#${order}. ` : ''}${title}`,
                subtitle: isFree ? '🆓 Free Preview' : '🔒 Infaq Required'
            }
        }
    }
})
