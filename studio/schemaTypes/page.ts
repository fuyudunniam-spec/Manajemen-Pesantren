import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'page',
    title: 'Halaman Statis',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Judul Halaman',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Alamat URL (Slug)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'sections',
            title: 'Susunan Section (Page Builder)',
            type: 'array',
            of: [
                { type: 'hero' },
                { type: 'aboutSection' },
                { type: 'impactFundSection' },
                { type: 'partnershipsSection' },
                { type: 'testimonialsSection' },
                // Nanti kita bisa tambah section lain di sini seperti 'gallery', 'contact', dll
            ],
        }),
    ],
});
