import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'course',
    title: 'Course (Product)',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Course Title',
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
            name: 'tagline',
            title: 'Tagline / Short Description',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Full Description',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'thumbnail',
            title: 'Thumbnail Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'price',
            title: 'Price (IDR)',
            type: 'number',
        }),
        defineField({
            name: 'discountPrice',
            title: 'Discount Price (IDR)',
            type: 'number',
            description: 'Leave empty if no discount',
        }),
        defineField({
            name: 'previewVideoUrl',
            title: 'Preview Video URL',
            type: 'url',
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }],
        }),
        defineField({
            name: 'instructor',
            title: 'Instructor',
            type: 'reference',
            to: [{ type: 'instructor' }],
        }),
        // Curriculum Structure
        defineField({
            name: 'modules',
            title: 'Curriculum Modules',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Module',
                    fields: [
                        { name: 'title', title: 'Module Title', type: 'string' },
                        {
                            name: 'lessons',
                            title: 'Lessons',
                            type: 'array',
                            of: [{ type: 'reference', to: [{ type: 'lesson' }] }],
                        },
                    ],
                },
            ],
        }),
        defineField({
            name: 'benefits',
            title: 'Key Benefits (Why Us?)',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags'
            }
        })
    ],
})
