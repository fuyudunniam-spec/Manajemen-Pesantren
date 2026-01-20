import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'partnershipsSection',
    title: 'Partnerships Section',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Judul Section',
            type: 'string',
            initialValue: 'Dipercaya Oleh Institusi & Komunitas'
        }),
    ],
});
