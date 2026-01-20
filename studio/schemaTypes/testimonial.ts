import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'testimonial',
    title: 'Testimoni',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nama',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'role',
            title: 'Peran/Jabatan',
            type: 'string',
            description: 'Contoh: Donatur, Wali Santri, Tokoh Masyarakat',
        }),
        defineField({
            name: 'image',
            title: 'Foto',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'quote',
            title: 'Testimoni',
            type: 'text',
            rows: 4,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'rating',
            title: 'Rating',
            type: 'number',
            validation: (Rule) => Rule.min(1).max(5),
        }),
        defineField({
            name: 'featured',
            title: 'Tampilkan di Halaman Utama',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'role',
            media: 'image',
        },
    },
});
