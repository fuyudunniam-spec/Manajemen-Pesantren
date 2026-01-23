import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'academyClass',
    title: 'Academy Class',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Class Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'curriculum',
            title: 'Curriculum',
            type: 'reference',
            to: [{ type: 'curriculum' }],
        }),

        defineField({
            name: 'level',
            title: 'Level/Jilid',
            type: 'string',
            description: 'e.g., "Jilid 1", "Level 2"',
        }),

        defineField({
            name: 'order',
            title: 'Order in Curriculum',
            type: 'number',
            description: 'Urutan pelajaran dalam kurikulum',
        }),

        // TAB 1: QIRA'AH (Reading + Audio)
        defineField({
            name: 'qiraahContent',
            title: 'Qira\'ah (Reading)',
            type: 'object',
            fields: [
                {
                    name: 'arabicText',
                    title: 'Arabic Text',
                    type: 'text',
                    rows: 10,
                    description: 'Teks Arab untuk dibaca (gunakan Unicode Arab)',
                },
                {
                    name: 'transliteration',
                    title: 'Transliteration (Optional)',
                    type: 'text',
                    rows: 5,
                },
                {
                    name: 'translation',
                    title: 'Translation (Terjemahan)',
                    type: 'text',
                    rows: 5,
                },
                {
                    name: 'audioUrl',
                    title: 'Audio URL',
                    type: 'url',
                    description: 'Link ke file audio MP3 (bisa dari CDN atau Sanity asset)',
                },
                {
                    name: 'audioFile',
                    title: 'Audio File (Alternative)',
                    type: 'file',
                    options: {
                        accept: 'audio/*',
                    },
                },
            ],
        }),

        // TAB 2: QAWAID (Grammar/Rules - Video)
        defineField({
            name: 'qawaidContent',
            title: 'Qawa\'id (Grammar)',
            type: 'object',
            fields: [
                {
                    name: 'videoUrl',
                    title: 'Video URL',
                    type: 'url',
                    description: 'Link ke video pembelajaran (YouTube, Vimeo, dll)',
                },
                {
                    name: 'videoEmbed',
                    title: 'Video Embed Code (Alternative)',
                    type: 'text',
                    rows: 3,
                },
                {
                    name: 'explanation',
                    title: 'Written Explanation',
                    type: 'array',
                    of: [{ type: 'block' }],
                    description: 'Penjelasan tertulis tentang qawaid',
                },
                {
                    name: 'pdfAttachment',
                    title: 'PDF Attachment (Optional)',
                    type: 'file',
                    options: {
                        accept: 'application/pdf',
                    },
                },
            ],
        }),

        // TAB 3: TAMRINAT (Exercises)
        defineField({
            name: 'tamrinatContent',
            title: 'Tamrinat (Exercises)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'question', title: 'Question', type: 'text', rows: 3 },
                        {
                            name: 'questionType',
                            title: 'Question Type',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Multiple Choice', value: 'multiple_choice' },
                                    { title: 'True/False', value: 'true_false' },
                                    { title: 'Fill in the Blank', value: 'fill_blank' },
                                    { title: 'Essay', value: 'essay' },
                                ],
                            },
                            initialValue: 'multiple_choice',
                        },
                        {
                            name: 'options',
                            title: 'Options (For Multiple Choice)',
                            type: 'array',
                            of: [{ type: 'string' }],
                            hidden: ({ parent }) => parent?.questionType !== 'multiple_choice',
                        },
                        {
                            name: 'correctAnswer',
                            title: 'Correct Answer',
                            type: 'string',
                            description: 'Untuk multiple choice: index option (0, 1, 2, 3). Untuk lainnya: jawaban yang benar',
                        },
                        {
                            name: 'explanation',
                            title: 'Answer Explanation',
                            type: 'text',
                            rows: 2,
                        },
                    ],
                    preview: {
                        select: {
                            question: 'question',
                            type: 'questionType',
                        },
                        prepare({ question, type }) {
                            return {
                                title: question || 'Untitled Question',
                                subtitle: type || 'No type',
                            };
                        },
                    },
                },
            ],
        }),

        // METADATA
        defineField({
            name: 'duration',
            title: 'Estimated Duration (minutes)',
            type: 'number',
            description: 'Estimasi waktu belajar',
        }),

        defineField({
            name: 'isPublished',
            title: 'Is Published',
            type: 'boolean',
            initialValue: false,
            description: 'Tampilkan kelas ini ke santri?',
        }),

        defineField({
            name: 'requiresAuth',
            title: 'Requires Authentication',
            type: 'boolean',
            initialValue: true,
            description: 'Apakah perlu login untuk akses?',
        }),
    ],

    orderings: [
        {
            title: 'Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],

    preview: {
        select: {
            title: 'title',
            level: 'level',
            order: 'order',
        },
        prepare({ title, level, order }) {
            return {
                title: `${order || '?'}. ${title}`,
                subtitle: level || 'No level',
            };
        },
    },
});
