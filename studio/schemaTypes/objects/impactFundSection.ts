import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'impactFundSection',
    title: 'Impact Fund Section',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Section Title',
            type: 'string',
            initialValue: 'Transparansi Dana',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            initialValue: 'Kami mengelola dana amanah Anda dengan standar akuntansi profesional. Setiap Rupiah yang Anda investasikan tercatat dan terukur dampaknya.',
        }),
        defineField({
            name: 'auditReportLink',
            title: 'Audit Report Link (URL)',
            type: 'url',
        }),
        defineField({
            name: 'allocationStats',
            title: 'Allocation Stats (Donut Chart)',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    defineField({ name: 'label', type: 'string', title: 'Label' }),
                    defineField({ name: 'percentage', type: 'number', title: 'Percentage' }),
                    defineField({ name: 'color', type: 'string', title: 'Color Hex' }),
                ]
            }]
        }),
        defineField({
            name: 'scholarshipStats',
            title: 'Scholarship Stats',
            type: 'object',
            fields: [
                defineField({ name: 'count', type: 'string', title: 'Total Count (e.g. 450+)' }),
                defineField({ name: 'label', type: 'string', title: 'Label' }),
                defineField({ name: 'description', type: 'text', title: 'Description' }),
            ]
        }),
        defineField({
            name: 'umkmStats',
            title: 'UMKM Stats',
            type: 'object',
            fields: [
                defineField({ name: 'count', type: 'string', title: 'Total Count (e.g. 85)' }),
                defineField({ name: 'label', type: 'string', title: 'Label' }),
                defineField({ name: 'description', type: 'text', title: 'Description' }),
            ]
        }),
        defineField({
            name: 'economicGraph',
            title: 'Economic Transformation Graph',
            type: 'image',
            description: 'Upload the graph image for simplicity',
        })
    ],
    preview: {
        select: {
            title: 'title'
        },
        prepare({ title }) {
            return {
                title: title || 'Impact Fund Section'
            }
        }
    }
});
