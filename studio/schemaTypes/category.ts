import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'category',
    title: 'Kategori',
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
        }),
        defineField({
            name: 'description',
            title: 'Deskripsi',
            type: 'text',
        }),
    ],
});
