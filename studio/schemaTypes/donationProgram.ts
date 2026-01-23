import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'donationProgram',
    title: 'Donation Program',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Program Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Pendidikan', value: 'education' },
                    { title: 'Infrastruktur', value: 'infrastructure' },
                    { title: 'Operasional', value: 'operational' },
                    { title: 'Wakaf Produktif', value: 'productive_waqf' },
                    { title: 'Darurat', value: 'emergency' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'longDescription',
            title: 'Long Description',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'image',
            title: 'Program Image',
            type: 'image',
            options: { hotspot: true },
            fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
        }),
        defineField({
            name: 'targetAmount',
            title: 'Target Amount (Rp)',
            type: 'number',
            description: 'Total target dana yang ingin digalang',
        }),
        defineField({
            name: 'collectedAmount',
            title: 'Collected Amount (Rp)',
            type: 'number',
            description: 'Dana yang sudah terkumpul (update manual atau via integration)',
        }),
        defineField({
            name: 'isActive',
            title: 'Is Active',
            type: 'boolean',
            initialValue: true,
            description: 'Tampilkan program ini di halaman donasi?',
        }),
        defineField({
            name: 'priority',
            title: 'Display Priority',
            type: 'number',
            description: 'Urutan tampilan (semakin kecil, semakin atas)',
            initialValue: 0,
        }),
    ],

    orderings: [
        {
            title: 'Priority',
            name: 'priorityAsc',
            by: [{ field: 'priority', direction: 'asc' }],
        },
    ],

    preview: {
        select: {
            title: 'name',
            subtitle: 'category',
            media: 'image',
            collected: 'collectedAmount',
            target: 'targetAmount',
        },
        prepare({ title, subtitle, media, collected, target }) {
            const percentage = target ? Math.round((collected / target) * 100) : 0;
            return {
                title,
                subtitle: `${subtitle} - ${percentage}% terkumpul`,
                media,
            };
        },
    },
});
