import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'partner',
    title: 'Mitra',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nama Mitra',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'type',
            title: 'Jenis Mitra',
            type: 'string',
            options: {
                list: [
                    { title: 'Institusi Pendidikan', value: 'education' },
                    { title: 'Perusahaan', value: 'corporate' },
                    { title: 'Komunitas', value: 'community' },
                    { title: 'Pemerintah', value: 'government' },
                    { title: 'Lainnya', value: 'other' },
                ],
            },
        }),
        defineField({
            name: 'website',
            title: 'Website',
            type: 'url',
        }),
        defineField({
            name: 'description',
            title: 'Deskripsi Kemitraan',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'order',
            title: 'Urutan Tampilan',
            type: 'number',
            description: 'Semakin kecil angka, semakin awal ditampilkan',
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'type',
            media: 'logo',
        },
    },
});
