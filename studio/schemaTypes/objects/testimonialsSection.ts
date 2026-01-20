import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'testimonialsSection',
    title: 'Testimonials Section',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Judul Section',
            type: 'string',
            initialValue: 'Suara Mereka'
        }),
        defineField({
            name: 'subtitle',
            title: 'Sub Judul',
            type: 'text',
            rows: 2,
            initialValue: 'Kesaksian dari para donatur dan wali santri yang telah menjadi bagian dari keluarga besar Al-Bisri.'
        }),
    ],
});
