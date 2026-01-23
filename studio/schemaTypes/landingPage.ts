import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'landingPage',
    title: 'Landing Page',
    type: 'document',
    fields: [
        // HERO SECTION
        defineField({
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                {
                    name: 'badge',
                    title: 'Achievement Badge',
                    type: 'string',
                    description: 'e.g., "100% Lulusan Dhuafa Masuk PTN/Timur Tengah"',
                },
                {
                    name: 'title',
                    title: 'Main Title',
                    type: 'array',
                    of: [
                        {
                            type: 'block',
                            styles: [],
                            lists: [],
                            marks: {
                                decorators: [
                                    { title: 'Strong', value: 'strong' },
                                    { title: 'Emphasis (Italic)', value: 'em' },
                                    { title: 'Highlight (Gold)', value: 'highlight' },
                                ],
                            },
                        },
                    ],
                    description: 'Main hero title with rich text (e.g., "Memuliakan Yatim, Membangun Peradaban")',
                },
                {
                    name: 'description',
                    title: 'Description',
                    type: 'text',
                    rows: 3,
                },
                {
                    name: 'ctaPrimary',
                    title: 'Primary CTA',
                    type: 'object',
                    fields: [
                        { name: 'text', title: 'Button Text', type: 'string' },
                        { name: 'link', title: 'Link URL', type: 'string' },
                    ],
                },
                {
                    name: 'ctaSecondary',
                    title: 'Secondary CTA',
                    type: 'object',
                    fields: [
                        { name: 'text', title: 'Button Text', type: 'string' },
                        { name: 'link', title: 'Link URL', type: 'string' },
                    ],
                },
                {
                    name: 'heroImage',
                    title: 'Hero Image',
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        { name: 'alt', title: 'Alt Text', type: 'string' },
                        {
                            name: 'caption',
                            title: 'Overlay Caption',
                            type: 'object',
                            fields: [
                                { name: 'quote', title: 'Quote', type: 'string' },
                                { name: 'subtext', title: 'Subtext', type: 'string' },
                            ],
                        },
                    ],
                },
                {
                    name: 'impactBadge',
                    title: 'Impact Badge (Floating)',
                    type: 'object',
                    fields: [
                        { name: 'label', title: 'Label', type: 'string' },
                        { name: 'value', title: 'Value', type: 'string' },
                    ],
                },
            ],
        }),

        // ABOUT SECTION
        defineField({
            name: 'about',
            title: 'About Section (Filosofi Kemandirian)',
            type: 'object',
            fields: [
                { name: 'badge', title: 'Section Badge', type: 'string' },
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'subtitle', title: 'Subtitle (Italic)', type: 'string' },
                {
                    name: 'paragraphs',
                    title: 'Paragraphs',
                    type: 'array',
                    of: [{ type: 'text', rows: 3 }],
                },
                {
                    name: 'highlightedParagraph',
                    title: 'Highlighted Paragraph (Border Left)',
                    type: 'text',
                    rows: 3,
                },
                {
                    name: 'ctaText',
                    title: 'CTA Text',
                    type: 'string',
                },
                {
                    name: 'ctaLink',
                    title: 'CTA Link',
                    type: 'string',
                },
                {
                    name: 'images',
                    title: 'Images',
                    type: 'array',
                    of: [
                        {
                            type: 'image',
                            options: { hotspot: true },
                            fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
                        },
                    ],
                },
                {
                    name: 'floatingBadge',
                    title: 'Floating Badge',
                    type: 'object',
                    fields: [
                        { name: 'text', title: 'Main Text', type: 'string' },
                        { name: 'subtext', title: 'Subtext', type: 'string' },
                    ],
                },
            ],
        }),

        // TIMELINE (JEJAK LANGKAH)
        defineField({
            name: 'timeline',
            title: 'Timeline Section (Jejak Langkah Pengabdian)',
            type: 'object',
            fields: [
                { name: 'badge', title: 'Section Badge', type: 'string' },
                { name: 'title', title: 'Section Title', type: 'string' },
                {
                    name: 'milestones',
                    title: 'Milestones',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'year', title: 'Year', type: 'string' },
                                { name: 'title', title: 'Milestone Title', type: 'string' },
                                { name: 'description', title: 'Description', type: 'text', rows: 2 },
                            ],
                            preview: {
                                select: {
                                    title: 'year',
                                    subtitle: 'title',
                                    description: 'description',
                                },
                                prepare({ title, subtitle, description }) {
                                    return {
                                        title: `${title}: ${subtitle}`,
                                        subtitle: description,
                                    };
                                },
                            },
                        },
                    ],
                },
            ],
        }),

        // PARTNERSHIPS (MARQUEE)
        defineField({
            name: 'partnerships',
            title: 'Partnerships Section (Marquee)',
            type: 'object',
            fields: [
                { name: 'headline', title: 'Headline', type: 'string' },
                {
                    name: 'partners',
                    title: 'Partner Logos',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'name', title: 'Partner Name', type: 'string' },
                                {
                                    name: 'logo',
                                    title: 'Logo',
                                    type: 'image',
                                    options: { hotspot: false },
                                    fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
                                },
                            ],
                            preview: {
                                select: {
                                    title: 'name',
                                    media: 'logo',
                                },
                            },
                        },
                    ],
                },
            ],
        }),

        // E-LEARNING PROMOTION
        defineField({
            name: 'elearning',
            title: 'E-Learning Section',
            type: 'object',
            fields: [
                { name: 'badge', title: 'Badge', type: 'string' },
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'titleHighlight', title: 'Title Highlight (Italic)', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 3 },
                {
                    name: 'ctaText',
                    title: 'CTA Button Text',
                    type: 'string',
                },
                {
                    name: 'ctaLink',
                    title: 'CTA Button Link',
                    type: 'string',
                },
                {
                    name: 'previewImage',
                    title: 'Preview Image',
                    type: 'image',
                    options: { hotspot: true },
                    fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
                },
            ],
        }),

        // IMPACT FUND (TRANSPARANSI DANA)
        defineField({
            name: 'impactFund',
            title: 'Impact Fund Section (Laporan Penyaluran)',
            type: 'object',
            fields: [
                { name: 'badge', title: 'Section Badge', type: 'string' },
                { name: 'title', title: 'Section Title', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 2 },
                {
                    name: 'transparencyLink',
                    title: 'Link to Full Transparency Page',
                    type: 'string',
                },
                {
                    name: 'chartData',
                    title: 'Chart Data (Fokus Penyaluran)',
                    type: 'object',
                    fields: [
                        {
                            name: 'labels',
                            title: 'Labels',
                            type: 'array',
                            of: [{ type: 'string' }],
                            description: 'e.g., ["Beasiswa Yatim", "Wakaf Produktif", "Infrastruktur"]',
                        },
                        {
                            name: 'data',
                            title: 'Data Points',
                            type: 'array',
                            of: [{ type: 'number' }],
                            description: 'Percentages (e.g., [50, 30, 20])',
                        },
                    ],
                },
                {
                    name: 'productiveAssets',
                    title: 'Productive Assets Total',
                    type: 'string',
                    description: 'e.g., "Rp 12.5 M"',
                },
                {
                    name: 'programs',
                    title: 'Impact Programs',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'icon', title: 'Lucide Icon Name', type: 'string' },
                                { name: 'title', title: 'Program Title', type: 'string' },
                                { name: 'description', title: 'Description', type: 'text', rows: 1 },
                                {
                                    name: 'progress',
                                    title: 'Progress Percentage',
                                    type: 'number',
                                    validation: (Rule) => Rule.min(0).max(100),
                                },
                            ],
                            preview: {
                                select: {
                                    title: 'title',
                                    subtitle: 'description',
                                },
                            },
                        },
                    ],
                },
            ],
        }),

        // TESTIMONIALS
        defineField({
            name: 'testimonials',
            title: 'Testimonials Section',
            type: 'object',
            fields: [
                { name: 'badge', title: 'Section Badge', type: 'string' },
                { name: 'title', title: 'Section Title', type: 'string' },
                {
                    name: 'testimonialsList',
                    title: 'Testimonials',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'quote', title: 'Quote', type: 'text', rows: 3 },
                                { name: 'name', title: 'Name', type: 'string' },
                                { name: 'role', title: 'Role/Title', type: 'string' },
                                {
                                    name: 'avatar',
                                    title: 'Avatar',
                                    type: 'image',
                                    options: { hotspot: true },
                                    fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
                                },
                            ],
                            preview: {
                                select: {
                                    title: 'name',
                                    subtitle: 'role',
                                    media: 'avatar',
                                },
                            },
                        },
                    ],
                },
            ],
        }),

        // LATEST NEWS (Preview)
        defineField({
            name: 'latestNews',
            title: 'Latest News Section',
            type: 'object',
            fields: [
                { name: 'title', title: 'Section Title', type: 'string' },
                {
                    name: 'ctaText',
                    title: 'View All CTA Text',
                    type: 'string',
                },
                {
                    name: 'ctaLink',
                    title: 'View All Link',
                    type: 'string',
                },
                {
                    name: 'newsItems',
                    title: 'News Items',
                    type: 'array',
                    description: 'Manual news items untuk preview di landing page',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'category', title: 'Category Label', type: 'string' },
                                { name: 'title', title: 'News Title', type: 'string' },
                                { name: 'excerpt', title: 'Excerpt', type: 'text', rows: 2 },
                                { name: 'publishedAt', title: 'Published Date', type: 'date' },
                                {
                                    name: 'image',
                                    title: 'Featured Image',
                                    type: 'image',
                                    options: { hotspot: true },
                                    fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
                                },
                                { name: 'link', title: 'Link to Full Article', type: 'string' },
                            ],
                            preview: {
                                select: {
                                    title: 'title',
                                    subtitle: 'category',
                                    media: 'image',
                                },
                            },
                        },
                    ],
                    validation: (Rule) => Rule.max(6),
                },
            ],
        }),

        // DONATION CTA
        defineField({
            name: 'donationCTA',
            title: 'Donation CTA Section',
            type: 'object',
            fields: [
                { name: 'title', title: 'Section Title', type: 'string' },
                { name: 'subtitle', title: 'Subtitle', type: 'string' },
                {
                    name: 'zakatCalculator',
                    title: 'Zakat Calculator',
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Calculator Title', type: 'string' },
                        { name: 'inputLabel', title: 'Input Label', type: 'string' },
                        { name: 'buttonText', title: 'Submit Button Text', type: 'string' },
                    ],
                },
                {
                    name: 'wakafPackages',
                    title: 'Wakaf Packages',
                    type: 'object',
                    fields: [
                        { name: 'title', title: 'Packages Title', type: 'string' },
                        {
                            name: 'packages',
                            title: 'Package List',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    fields: [
                                        { name: 'name', title: 'Package Name', type: 'string' },
                                        { name: 'description', title: 'Description', type: 'string' },
                                        { name: 'amount', title: 'Amount', type: 'number' },
                                    ],
                                    preview: {
                                        select: {
                                            title: 'name',
                                            subtitle: 'amount',
                                        },
                                        prepare({ title, subtitle }) {
                                            return {
                                                title,
                                                subtitle: `Rp ${subtitle?.toLocaleString('id-ID')}`,
                                            };
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        }),

        // SEO & META
        defineField({
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                { name: 'metaTitle', title: 'Meta Title', type: 'string' },
                { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 },
                {
                    name: 'ogImage',
                    title: 'Open Graph Image',
                    type: 'image',
                    description: 'Image for social media sharing',
                },
            ],
        }),
    ],

    preview: {
        select: {
            title: 'hero.title',
        },
        prepare() {
            return {
                title: 'Landing Page',
                subtitle: 'Royal Gold Theme - Main Page',
            };
        },
    },
});
