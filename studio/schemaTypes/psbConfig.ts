import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'psbConfig',
    title: 'PSB Configuration',
    type: 'document',
    fields: [
        defineField({
            name: 'registrationStatus',
            title: 'Registration Status',
            type: 'object',
            fields: [
                {
                    name: 'isOpen',
                    title: 'Registration Open',
                    type: 'boolean',
                    initialValue: true,
                },
                {
                    name: 'openDate',
                    title: 'Opening Date',
                    type: 'datetime',
                },
                {
                    name: 'closeDate',
                    title: 'Closing Date',
                    type: 'datetime',
                },
                {
                    name: 'closedMessage',
                    title: 'Message When Closed',
                    type: 'text',
                    rows: 2,
                },
            ],
        }),

        defineField({
            name: 'educationLevels',
            title: 'Education Levels (Jenjang)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', title: 'Level Name', type: 'string' },
                        { name: 'code', title: 'Code', type: 'string', description: 'e.g., SD, SMP, SMA' },
                        { name: 'description', title: 'Description', type: 'text', rows: 2 },
                        { name: 'fee', title: 'Registration Fee (Rp)', type: 'number' },
                        { name: 'monthlyFee', title: 'Monthly Fee (Rp)', type: 'number' },
                    ],
                    preview: {
                        select: {
                            title: 'name',
                            fee: 'fee',
                        },
                        prepare({ title, fee }) {
                            return {
                                title,
                                subtitle: `Rp ${fee?.toLocaleString('id-ID')}`,
                            };
                        },
                    },
                },
            ],
        }),

        defineField({
            name: 'entryPaths',
            title: 'Entry Paths (Jalur Masuk)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', title: 'Path Name', type: 'string' },
                        { name: 'code', title: 'Code', type: 'string', description: 'e.g., reguler, beasiswa' },
                        { name: 'description', title: 'Description', type: 'text', rows: 3 },
                        {
                            name: 'requirements',
                            title: 'Requirements',
                            type: 'array',
                            of: [{ type: 'string' }],
                        },
                        {
                            name: 'discountPercentage',
                            title: 'Discount Percentage',
                            type: 'number',
                            description: 'Untuk beasiswa, berapa % potongan',
                        },
                    ],
                    preview: {
                        select: {
                            title: 'name',
                            subtitle: 'description',
                        },
                    },
                },
            ],
        }),

        defineField({
            name: 'requiredDocuments',
            title: 'Required Documents',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', title: 'Document Name', type: 'string' },
                        { name: 'description', title: 'Description', type: 'text', rows: 2 },
                        {
                            name: 'isRequired',
                            title: 'Is Required',
                            type: 'boolean',
                            initialValue: true,
                        },
                        {
                            name: 'allowedFormats',
                            title: 'Allowed File Formats',
                            type: 'array',
                            of: [{ type: 'string' }],
                            description: 'e.g., PDF, JPG, PNG',
                        },
                        {
                            name: 'maxFileSize',
                            title: 'Max File Size (MB)',
                            type: 'number',
                        },
                    ],
                    preview: {
                        select: {
                            title: 'name',
                            required: 'isRequired',
                        },
                        prepare({ title, required }) {
                            return {
                                title,
                                subtitle: required ? 'Required' : 'Optional',
                            };
                        },
                    },
                },
            ],
        }),

        defineField({
            name: 'selectionSteps',
            title: 'Selection Steps',
            type: 'array',
            description: 'Tahapan seleksi PSB',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'stepNumber', title: 'Step Number', type: 'number' },
                        { name: 'name', title: 'Step Name', type: 'string' },
                        { name: 'description', title: 'Description', type: 'text', rows: 2 },
                    ],
                    preview: {
                        select: {
                            step: 'stepNumber',
                            title: 'name',
                        },
                        prepare({ step, title }) {
                            return {
                                title: `${step}. ${title}`,
                            };
                        },
                    },
                },
            ],
        }),

        defineField({
            name: 'contactInfo',
            title: 'Contact Information',
            type: 'object',
            fields: [
                { name: 'whatsappNumber', title: 'WhatsApp Number', type: 'string' },
                { name: 'email', title: 'Email', type: 'string' },
                { name: 'phone', title: 'Phone', type: 'string' },
                { name: 'address', title: 'Address', type: 'text', rows: 2 },
            ],
        }),
    ],

    preview: {
        prepare() {
            return {
                title: 'PSB Configuration',
                subtitle: 'Pendaftaran Santri Baru - Settings',
            };
        },
    },
});
