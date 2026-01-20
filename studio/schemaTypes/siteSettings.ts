import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Site Title',
            type: 'string',
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'mainNavigation',
            title: 'Main Navigation',
            description: 'Select items for the top menu',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'navItem',
                    title: 'Navigation Item',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Title',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'link',
                            title: 'Link URL',
                            type: 'string',
                            description: 'e.g., #about, /psb, https://...',
                        }),
                        defineField({
                            name: 'isDropdown',
                            title: 'Is Dropdown?',
                            type: 'boolean',
                            initialValue: false,
                        }),
                        defineField({
                            name: 'dropdownItems',
                            title: 'Dropdown Items',
                            type: 'array',
                            hidden: ({ parent }) => !parent?.isDropdown,
                            of: [
                                {
                                    type: 'object',
                                    name: 'subItem',
                                    fields: [
                                        defineField({ name: 'title', type: 'string', title: 'Title' }),
                                        defineField({ name: 'link', type: 'string', title: 'Link URL' }),
                                    ],
                                },
                            ],
                        }),
                        defineField({
                            name: 'isButton',
                            title: 'Render as Button?',
                            type: 'boolean',
                            initialValue: false,
                        })
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            link: 'link',
                            isDropdown: 'isDropdown',
                        },
                        prepare({ title, link, isDropdown }) {
                            return {
                                title: title,
                                subtitle: isDropdown ? 'Dropdown Menu' : link,
                            };
                        },
                    },
                },
            ],
        }),
        defineField({
            name: 'footerNavigation',
            title: 'Footer Navigation',
            type: 'array',
            of: [{ type: 'string' }], // Or more complex if needed, simplifying for now
            description: 'List of links or sections for the footer',
        }),
        defineField({
            name: 'contactInfo',
            title: 'Contact Information',
            type: 'object',
            fields: [
                defineField({ name: 'address', type: 'text', title: 'Address' }),
                defineField({ name: 'email', type: 'string', title: 'Email' }),
                defineField({ name: 'phone', type: 'string', title: 'Phone' }),
            ]
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'platform', type: 'string', title: 'Platform Name' }),
                        defineField({ name: 'url', type: 'url', title: 'URL' }),
                    ]
                }
            ]
        }),
    ],
});
