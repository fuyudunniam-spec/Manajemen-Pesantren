import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'blogPost',
    title: 'Blog Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Judul',
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
            name: 'author',
            title: 'Penulis',
            type: 'reference',
            to: [{ type: 'author' }],
        }),
        defineField({
            name: 'mainImage',
            title: 'Gambar Utama',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Teks Alternatif',
                },
            ],
        }),
        defineField({
            name: 'categories',
            title: 'Kategori',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'category' } }],
        }),
        defineField({
            name: 'publishedAt',
            title: 'Tanggal Publikasi',
            type: 'datetime',
        }),
        defineField({
            name: 'excerpt',
            title: 'Ringkasan',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'body',
            title: 'Konten',
            type: 'array',
            of: [
                {
                    type: 'block',
                },
                {
                    type: 'image',
                    fields: [
                        {
                            type: 'text',
                            name: 'alt',
                            title: 'Teks Alternatif',
                        },
                    ],
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
        },
        prepare(selection) {
            const { author } = selection;
            return { ...selection, subtitle: author && `oleh ${author}` };
        },
    },
});
