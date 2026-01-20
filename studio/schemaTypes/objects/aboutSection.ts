import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'aboutSection',
    title: 'About Section',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Judul',
            type: 'string',
        }),
        defineField({
            name: 'content',
            title: 'Isi Konten',
            type: 'text',
            rows: 5,
        }),
        defineField({
            name: 'stats',
            title: 'Statistik (Misal: 500+ Santri)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', title: 'Label' },
                        { name: 'value', type: 'string', title: 'Nilai/Angka' }
                    ]
                }
            ]
        }),
        defineField({
            name: 'image',
            title: 'Gambar Utama',
            type: 'image',
            options: { hotspot: true }
        }),
    ],
});
