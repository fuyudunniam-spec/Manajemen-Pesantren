import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'donationPage',
    title: 'Donation Page Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'subtitle', title: 'Subtitle', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 3 },
            ],
        }),

        defineField({
            name: 'whatsappNumber',
            title: 'WhatsApp Number for Donation Confirmation',
            type: 'string',
            description: 'Format: 628123456789 (tanpa +)',
            validation: (Rule) =>
                Rule.required().regex(/^62\d{9,13}$/, {
                    name: 'indonesian-phone',
                    invert: false,
                }),
        }),

        defineField({
            name: 'paymentMethods',
            title: 'Payment Methods',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', title: 'Method Name', type: 'string' },
                        { name: 'accountNumber', title: 'Account Number', type: 'string' },
                        { name: 'accountName', title: 'Account Name', type: 'string' },
                        {
                            name: 'logo',
                            title: 'Bank/Payment Logo',
                            type: 'image',
                            options: { hotspot: false },
                        },
                        {
                            name: 'instructions',
                            title: 'Transfer Instructions',
                            type: 'text',
                            rows: 3,
                        },
                    ],
                    preview: {
                        select: {
                            title: 'name',
                            subtitle: 'accountNumber',
                            media: 'logo',
                        },
                    },
                },
            ],
        }),

        defineField({
            name: 'predefinedAmounts',
            title: 'Predefined Amounts',
            type: 'array',
            of: [{ type: 'number' }],
            description: 'Pilihan nominal donasi (e.g., 50000, 100000, 500000)',
        }),

        defineField({
            name: 'featuredPrograms',
            title: 'Featured Programs (Manual Selection)',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'donationProgram' }] }],
            description: 'Kosongkan untuk otomatis tampilkan semua program aktif',
        }),

        defineField({
            name: 'donationUpdates',
            title: 'Donation Updates (Tab)',
            type: 'object',
            fields: [
                { name: 'title', title: 'Tab Title', type: 'string', initialValue: 'Update Terkini' },
                {
                    name: 'updates',
                    title: 'Updates List',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'date', title: 'Date', type: 'datetime' },
                                { name: 'title', title: 'Update Title', type: 'string' },
                                { name: 'description', title: 'Description', type: 'text', rows: 2 },
                                { name: 'image', title: 'Image (Optional)', type: 'image' },
                            ],
                            preview: {
                                select: {
                                    title: 'title',
                                    subtitle: 'date',
                                },
                            },
                        },
                    ],
                },
            ],
        }),

        defineField({
            name: 'topDonors',
            title: 'Top Donors Display Settings',
            type: 'object',
            fields: [
                { name: 'title', title: 'Tab Title', type: 'string', initialValue: 'Donatur Utama' },
                {
                    name: 'showTopDonors',
                    title: 'Show Top Donors',
                    type: 'boolean',
                    initialValue: true,
                },
                {
                    name: 'displayCount',
                    title: 'Number of Top Donors to Show',
                    type: 'number',
                    initialValue: 10,
                },
            ],
        }),

        defineField({
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                { name: 'metaTitle', title: 'Meta Title', type: 'string' },
                { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 },
                { name: 'ogImage', title: 'Open Graph Image', type: 'image' },
            ],
        }),
    ],

    preview: {
        prepare() {
            return {
                title: 'Donation Page Settings',
                subtitle: 'Halaman Donasi - Programs, Payment Methods, WhatsApp',
            };
        },
    },
});
