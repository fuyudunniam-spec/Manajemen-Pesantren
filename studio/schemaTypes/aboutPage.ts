import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'aboutPage',
    title: 'About Page (Tentang Kami)',
    type: 'document',
    fields: [
        // HERO
        defineField({
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'subtitle', title: 'Subtitle', type: 'string' },
                {
                    name: 'backgroundImage',
                    title: 'Background Image',
                    type: 'image',
                    options: { hotspot: true },
                    fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
                },
            ],
        }),

        // HISTORY (SEJARAH)
        defineField({
            name: 'history',
            title: 'History Section',
            type: 'object',
            fields: [
                { name: 'title', title: 'Section Title', type: 'string' },
                { name: 'introduction', title: 'Introduction', type: 'text', rows: 4 },
                {
                    name: 'timeline',
                    title: 'Historical Timeline',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'year', title: 'Year', type: 'string' },
                                { name: 'event', title: 'Event Title', type: 'string' },
                                { name: 'description', title: 'Description', type: 'text', rows: 2 },
                            ],
                            preview: {
                                select: {
                                    title: 'year',
                                    subtitle: 'event',
                                },
                            },
                        },
                    ],
                },
            ],
        }),

        // VISION & MISSION
        defineField({
            name: 'visionMission',
            title: 'Vision & Mission',
            type: 'object',
            fields: [
                { name: 'sectionTitle', title: 'Section Title', type: 'string' },
                {
                    name: 'vision',
                    title: 'Vision',
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Vision Title', type: 'string' },
                        { name: 'description', title: 'Vision Statement', type: 'text', rows: 3 },
                    ],
                },
                {
                    name: 'mission',
                    title: 'Mission',
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Mission Title', type: 'string' },
                        {
                            name: 'items',
                            title: 'Mission Points',
                            type: 'array',
                            of: [{ type: 'string' }],
                        },
                    ],
                },
                {
                    name: 'values',
                    title: 'Core Values',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'icon', title: 'Lucide Icon Name', type: 'string' },
                                { name: 'title', title: 'Value Title', type: 'string' },
                                { name: 'description', title: 'Description', type: 'text', rows: 2 },
                            ],
                            preview: {
                                select: {
                                    title: 'title',
                                    subtitle: 'description',
                                },
                            },
                        },
                    ],
                },
            ],
        }),

        // LEADERSHIP (PENGURUS/PIMPINAN)
        defineField({
            name: 'leadership',
            title: 'Leadership Team',
            type: 'object',
            fields: [
                { name: 'sectionTitle', title: 'Section Title', type: 'string' },
                { name: 'description', title: 'Section Description', type: 'text', rows: 2 },
                {
                    name: 'members',
                    title: 'Leadership Members',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'name', title: 'Name', type: 'string' },
                                { name: 'position', title: 'Position/Title', type: 'string' },
                                {
                                    name: 'photo',
                                    title: 'Photo',
                                    type: 'image',
                                    options: { hotspot: true },
                                    fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
                                },
                                { name: 'bio', title: 'Short Bio', type: 'text', rows: 3 },
                            ],
                            preview: {
                                select: {
                                    title: 'name',
                                    subtitle: 'position',
                                    media: 'photo',
                                },
                            },
                        },
                    ],
                },
            ],
        }),

        // FACILITIES (FASILITAS)
        defineField({
            name: 'facilities',
            title: 'Facilities Section',
            type: 'object',
            fields: [
                { name: 'sectionTitle', title: 'Section Title', type: 'string' },
                { name: 'description', title: 'Section Description', type: 'text', rows: 2 },
                {
                    name: 'facilityList',
                    title: 'Facilities',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'name', title: 'Facility Name', type: 'string' },
                                { name: 'description', title: 'Description', type: 'text', rows: 2 },
                                {
                                    name: 'image',
                                    title: 'Image',
                                    type: 'image',
                                    options: { hotspot: true },
                                    fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
                                },
                                {
                                    name: 'features',
                                    title: 'Features/Specs',
                                    type: 'array',
                                    of: [{ type: 'string' }],
                                },
                            ],
                            preview: {
                                select: {
                                    title: 'name',
                                    subtitle: 'description',
                                    media: 'image',
                                },
                            },
                        },
                    ],
                },
            ],
        }),

        // SEO
        defineField({
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                { name: 'metaTitle', title: 'Meta Title', type: 'string' },
                { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 },
                { name: 'ogImage', title: 'Open Graph Image', type: 'image' },
            ],
        }),
    ],

    preview: {
        prepare() {
            return {
                title: 'About Page',
                subtitle: 'Tentang Kami - Sejarah, Visi/Misi, Kepemimpinan',
            };
        },
    },
});
