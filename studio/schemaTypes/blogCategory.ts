import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'blogCategory',
    title: 'Blog Category',
    type: 'document',
    icon: () => '📁',
    fields: [
        defineField({
            name: 'name',
            title: 'Category Name',
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
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 2,
        }),

        defineField({
            name: 'color',
            title: 'Badge Color',
            type: 'string',
            options: {
                list: [
                    { title: 'Royal Green', value: 'royal' },
                    { title: 'Gold', value: 'gold' },
                    { title: 'Red (Video)', value: 'red' },
                    { title: 'Blue', value: 'blue' },
                    { title: 'Stone (Gray)', value: 'stone' },
                ],
            },
            initialValue: 'royal',
        }),

        defineField({
            name: 'icon',
            title: 'Lucide Icon Name',
            type: 'string',
            description: 'e.g., "trophy", "book", "video", "graduation-cap"',
        }),
    ],

    preview: {
        select: {
            title: 'name',
            subtitle: 'description',
        },
        prepare({ title, subtitle }) {
            return {
                title,
                subtitle: subtitle || 'No description',
            };
        },
    },
});
