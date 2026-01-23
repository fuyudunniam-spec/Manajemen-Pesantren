import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'transparencyReport',
    title: 'Transparency Report',
    type: 'document',
    fields: [
        defineField({
            name: 'period',
            title: 'Period',
            type: 'string',
            description: 'e.g., "2025 Q1", "Tahun 2024"',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'publishedAt',
            title: 'Published Date',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'isActive',
            title: 'Is Current/Active Report',
            type: 'boolean',
            initialValue: false,
            description: 'Hanya satu report yang boleh active (ditampilkan sebagai laporan terkini)',
        }),

        // SUMMARY CARDS
        defineField({
            name: 'summary',
            title: 'Summary Cards',
            type: 'object',
            fields: [
                {
                    name: 'totalAssets',
                    title: 'Total Aset (Rp)',
                    type: 'number',
                    description: 'Total aset pesantren',
                },
                {
                    name: 'totalDisbursement',
                    title: 'Total Penyaluran (Rp)',
                    type: 'number',
                    description: 'Total dana yang disalurkan',
                },
                {
                    name: 'totalBeneficiaries',
                    title: 'Total Penerima Manfaat',
                    type: 'number',
                    description: 'Jumlah santri/orang yang menerima manfaat',
                },
            ],
        }),

        // FUND ALLOCATION (CHART 1: Alokasi Dana)
        defineField({
            name: 'fundAllocation',
            title: 'Fund Allocation (Pie Chart)',
            type: 'array',
            description: 'Distribusi penyaluran dana berdasarkan program',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'program', title: 'Program Name', type: 'string' },
                        { name: 'percentage', title: 'Percentage', type: 'number' },
                        { name: 'amount', title: 'Amount (Rp)', type: 'number' },
                    ],
                    preview: {
                        select: {
                            title: 'program',
                            percentage: 'percentage',
                        },
                        prepare({ title, percentage }) {
                            return {
                                title,
                                subtitle: `${percentage}%`,
                            };
                        },
                    },
                },
            ],
        }),

        // FUND COMPOSITION (CHART 2: Komposisi Sumber Dana)
        defineField({
            name: 'fundComposition',
            title: 'Fund Composition (Bar Chart)',
            type: 'array',
            description: 'Komposisi sumber dana (dari mana dana berasal)',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'source', title: 'Source Name', type: 'string' },
                        { name: 'percentage', title: 'Percentage', type: 'number' },
                        { name: 'amount', title: 'Amount (Rp)', type: 'number' },
                    ],
                    preview: {
                        select: {
                            title: 'source',
                            percentage: 'percentage',
                        },
                        prepare({ title, percentage }) {
                            return {
                                title,
                                subtitle: `${percentage}%`,
                            };
                        },
                    },
                },
            ],
        }),

        // STRATEGIC PROGRAMS (Realisasi Program)
        defineField({
            name: 'strategicPrograms',
            title: 'Strategic Programs Realization',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', title: 'Program Name', type: 'string' },
                        { name: 'target', title: 'Target (Rp)', type: 'number' },
                        { name: 'realization', title: 'Realization (Rp)', type: 'number' },
                        {
                            name: 'percentage',
                            title: 'Percentage',
                            type: 'number',
                            description: 'Auto-calculate atau manual input',
                        },
                    ],
                    preview: {
                        select: {
                            title: 'name',
                            target: 'target',
                            realization: 'realization',
                        },
                        prepare({ title, target, realization }) {
                            const pct = target ? Math.round((realization / target) * 100) : 0;
                            return {
                                title,
                                subtitle: `${pct}% (${realization?.toLocaleString('id-ID')} / ${target?.toLocaleString('id-ID')})`,
                            };
                        },
                    },
                },
            ],
        }),

        // CASH FLOW (Arus Kas)
        defineField({
            name: 'cashFlow',
            title: 'Cash Flow Table',
            type: 'array',
            description: 'Tabel arus kas (debit, kredit, saldo)',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'date', title: 'Date', type: 'date' },
                        { name: 'description', title: 'Description', type: 'string' },
                        { name: 'debit', title: 'Debit (Masuk)', type: 'number' },
                        { name: 'credit', title: 'Credit (Keluar)', type: 'number' },
                        { name: 'balance', title: 'Balance (Saldo)', type: 'number' },
                    ],
                    preview: {
                        select: {
                            title: 'description',
                            date: 'date',
                            balance: 'balance',
                        },
                        prepare({ title, date, balance }) {
                            return {
                                title,
                                subtitle: `${date} - Saldo: Rp ${balance?.toLocaleString('id-ID')}`,
                            };
                        },
                    },
                },
            ],
        }),

        // NOTES/HIGHLIGHTS
        defineField({
            name: 'highlights',
            title: 'Report Highlights',
            type: 'array',
            of: [{ type: 'block' }],
            description: 'Catatan penting atau highlight dari laporan ini',
        }),

        // ATTACHMENTS
        defineField({
            name: 'attachments',
            title: 'Attachments (PDF/Documents)',
            type: 'array',
            of: [
                {
                    type: 'file',
                    fields: [
                        { name: 'title', title: 'File Title', type: 'string' },
                        { name: 'description', title: 'Description', type: 'text', rows: 2 },
                    ],
                },
            ],
        }),
    ],

    orderings: [
        {
            title: 'Latest First',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
    ],

    preview: {
        select: {
            period: 'period',
            publishedAt: 'publishedAt',
            isActive: 'isActive',
        },
        prepare({ period, publishedAt, isActive }) {
            const date = new Date(publishedAt);
            const formattedDate = date.toLocaleDateString('id-ID');
            return {
                title: `Laporan Transparansi: ${period}`,
                subtitle: `${formattedDate}${isActive ? ' (ACTIVE)' : ''}`,
            };
        },
    },
});
