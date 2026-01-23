import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'curriculum',
    title: 'Curriculum',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Curriculum Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
        }),

        defineField({
            name: 'level',
            title: 'Level',
            type: 'string',
            options: {
                list: [
                    { title: 'Beginner', value: 'beginner' },
                    { title: 'Intermediate', value: 'intermediate' },
                    { title: 'Advanced', value: 'advanced' },
                ],
            },
        }),

        defineField({
            name: 'structure',
            title: 'Curriculum Structure (Tree)',
            type: 'array',
            description: 'Struktur kurikulum bertingkat (e.g., Bab → Sub-Bab → Pelajaran)',
            of: [
                {
                    type: 'object',
                    name: 'chapter',
                    fields: [
                        { name: '_key', title: 'Key', type: 'string', hidden: true },
                        { name: 'title', title: 'Chapter Title', type: 'string' },
                        { name: 'order', title: 'Order', type: 'number' },
                        {
                            name: 'subchapters',
                            title: 'Sub-Chapters',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    name: 'subchapter',
                                    fields: [
                                        { name: '_key', title: 'Key', type: 'string', hidden: true },
                                        { name: 'title', title: 'Sub-Chapter Title', type: 'string' },
                                        { name: 'order', title: 'Order', type: 'number' },
                                        {
                                            name: 'lessons',
                                            title: 'Lessons',
                                            type: 'array',
                                            of: [
                                                {
                                                    type: 'reference',
                                                    to: [{ type: 'academyClass' }],
                                                },
                                            ],
                                        },
                                    ],
                                    preview: {
                                        select: {
                                            title: 'title',
                                            order: 'order',
                                        },
                                        prepare({ title, order }) {
                                            return {
                                                title: `${order}. ${title}`,
                                            };
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            order: 'order',
                        },
                        prepare({ title, order }) {
                            return {
                                title: `${order}. ${title}`,
                            };
                        },
                    },
                },
            ],
        }),
    ],

    preview: {
        select: {
            title: 'name',
            level: 'level',
        },
        prepare({ title, level }) {
            return {
                title,
                subtitle: level || 'No level set',
            };
        },
    },
});
