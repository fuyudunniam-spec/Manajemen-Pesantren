import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'blogPost',
    title: 'Blog Post / Berita',
    type: 'document',
    icon: () => '📰',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'excerpt',
            title: 'Excerpt / Ringkasan',
            type: 'text',
            rows: 3,
            description: 'Short summary for cards and meta description',
            validation: (Rule) => Rule.max(300),
        }),

        defineField({
            name: 'featuredImage',
            title: 'Featured Image',
            type: 'image',
            options: { hotspot: true },
            fields: [
                { name: 'alt', title: 'Alt Text', type: 'string' },
                { name: 'caption', title: 'Caption', type: 'string' },
            ],
        }),

        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'blogCategory' }],
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{ type: 'author' }],
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'publishedAt',
            title: 'Published Date',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'readingTime',
            title: 'Reading Time (minutes)',
            type: 'number',
            description: 'Estimated reading time in minutes',
            initialValue: 5,
        }),

        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'Heading 2', value: 'h2' },
                        { title: 'Heading 3', value: 'h3' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Bold', value: 'strong' },
                            { title: 'Italic', value: 'em' },
                            { title: 'Underline', value: 'underline' },
                        ],
                        annotations: [
                            {
                                title: 'Link',
                                name: 'link',
                                type: 'object',
                                fields: [
                                    { name: 'href', type: 'url', title: 'URL' },
                                ],
                            },
                        ],
                    },
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        { name: 'alt', type: 'string', title: 'Alt Text' },
                        { name: 'caption', type: 'string', title: 'Caption' },
                    ],
                },
            ],
        }),

        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
        }),

        defineField({
            name: 'isFeatured',
            title: 'Featured Post?',
            type: 'boolean',
            description: 'Show as featured/headline on blog archive',
            initialValue: false,
        }),

        defineField({
            name: 'isPublished',
            title: 'Published?',
            type: 'boolean',
            description: 'Uncheck to save as draft',
            initialValue: true,
        }),

        defineField({
            name: 'relatedPosts',
            title: 'Related Posts',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'blogPost' }],
                },
            ],
            validation: (Rule) => Rule.max(3),
        }),
    ],

    orderings: [
        {
            title: 'Published Date, Newest',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
        {
            title: 'Published Date, Oldest',
            name: 'publishedAtAsc',
            by: [{ field: 'publishedAt', direction: 'asc' }],
        },
    ],

    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            category: 'category.name',
            media: 'featuredImage',
            publishedAt: 'publishedAt',
        },
        prepare({ title, author, category, media, publishedAt }) {
            const date = publishedAt
                ? new Date(publishedAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                })
                : 'Draft';
            return {
                title,
                subtitle: `${category || 'No category'} • ${author || 'No author'} • ${date}`,
                media,
            };
        },
    },
});
