import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'achievement',
    title: 'Prestasi',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Judul Prestasi',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Kategori',
            type: 'string',
            options: {
                list: [
                    { title: 'Akademik', value: 'academic' },
                    { title: 'Tahfidz', value: 'tahfidz' },
                    { title: 'Olahraga', value: 'sports' },
                    { title: 'Seni & Budaya', value: 'arts' },
                    { title: 'Kepemimpinan', value: 'leadership' },
                    { title: 'Lainnya', value: 'other' },
                ],
            },
        }),
        defineField({
            name: 'image',
            title: 'Foto/Dokumentasi',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'description',
            title: 'Deskripsi',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'achievedBy',
            title: 'Diraih oleh',
            type: 'string',
            description: 'Nama santri atau tim',
        }),
        defineField({
            name: 'date',
            title: 'Tanggal',
            type: 'date',
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
            title: 'title',
            subtitle: 'category',
            media: 'image',
        },
    },
});
