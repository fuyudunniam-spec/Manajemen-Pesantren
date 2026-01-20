import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'hero',
    title: 'Hero Section',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            initialValue: 'Membangun Peradaban Melalui Kemandirian',
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'text',
            initialValue: 'Platform filantropi Islam yang transparan, menggabungkan pendidikan pesantren modern dengan akuntabilitas digital.',
        }),
        defineField({
            name: 'ctaText',
            title: 'CTA Text',
            type: 'string',
            initialValue: 'Lihat Impact Fund',
        }),
        defineField({
            name: 'ctaLink',
            title: 'CTA Link',
            type: 'string',
            initialValue: '#impact-fund',
        }),
        defineField({
            name: 'secondaryCtaText',
            title: 'Secondary CTA Text',
            type: 'string',
        }),
        defineField({
            name: 'secondaryCtaLink',
            title: 'Secondary CTA Link',
            type: 'string',
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: 'Image displayed on the right for Split layout, or background for Center layout.',
        }),
        defineField({
            name: 'layout',
            title: 'Layout Style',
            type: 'string',
            options: {
                list: [
                    { title: 'Split (Text Left, Image Right)', value: 'split-right' },
                    { title: 'Center (Text Center, Image Background)', value: 'center' },
                    { title: 'Split (Text Right, Image Left)', value: 'split-left' },
                ],
                layout: 'radio',
            },
            initialValue: 'split-right',
        })
    ],
    preview: {
        select: {
            title: 'title',
            media: 'heroImage'
        },
        prepare({ title, media }) {
            return {
                title: title || 'Hero Section',
                subtitle: 'Hero',
                media
            };
        },
    },
});
