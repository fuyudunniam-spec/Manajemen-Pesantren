import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'author',
    title: 'Author / Penulis',
    type: 'document',
    icon: () => '✍️',
    fields: [
        defineField({
            name: 'name',
            title: 'Full Name',
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
            name: 'avatar',
            title: 'Avatar / Photo',
            type: 'image',
            options: { hotspot: true },
            fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
        }),

        defineField({
            name: 'role',
            title: 'Role / Title',
            type: 'string',
            description: 'e.g., "Pengasuh Pesantren", "Peneliti Senior", "Editor"',
        }),

        defineField({
            name: 'bio',
            title: 'Biography',
            type: 'text',
            rows: 4,
            description: 'Short bio about the author',
        }),

        defineField({
            name: 'socialLinks',
            title: 'Social Media Links',
            type: 'object',
            fields: [
                defineField({
                    name: 'email',
                    title: 'Email',
                    type: 'string',
                }),
                defineField({
                    name: 'twitter',
                    title: 'Twitter/X URL',
                    type: 'url',
                }),
                defineField({
                    name: 'instagram',
                    title: 'Instagram URL',
                    type: 'url',
                }),
                defineField({
                    name: 'linkedin',
                    title: 'LinkedIn URL',
                    type: 'url',
                }),
                defineField({
                    name: 'website',
                    title: 'Personal Website',
                    type: 'url',
                }),
            ],
        }),
    ],

    preview: {
        select: {
            title: 'name',
            subtitle: 'role',
            media: 'avatar',
        },
    },
});
