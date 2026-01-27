import { defineType, defineField } from 'sanity';

/**
 * Landing Page Schema - Isyraq Academy
 * 
 * Skema ini KHUSUS untuk halaman landing Academy.
 * Fokus pada: Kursus, Pengajar, Statistik, dan Testimoni.
 * 
 * Section yang tersedia:
 * 1. Hero - Headline utama & CTA
 * 2. Stats - Statistik angka pencapaian
 * 3. Featured Courses - Kursus unggulan
 * 4. Why Us - Keunggulan Academy
 * 5. Instructors - Pengajar/Mudaris
 * 6. Testimonials - Testimoni siswa
 * 7. SEO - Pengaturan meta tags
 */
export default defineType({
    name: 'landingPage',
    title: 'Landing Page (Academy)',
    type: 'document',
    groups: [
        { name: 'hero', title: '🏠 Hero Section' },
        { name: 'content', title: '📚 Content Sections' },
        { name: 'social', title: '💬 Social Proof' },
        { name: 'seo', title: '🔍 SEO Settings' },
    ],
    fields: [
        // ==========================================
        // HERO SECTION
        // ==========================================
        defineField({
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            group: 'hero',
            fields: [
                {
                    name: 'subtitle',
                    title: 'Brand Subtitle',
                    type: 'string',
                    description: 'Nama brand, e.g., "Isyraq Annur Academy"',
                    validation: (Rule) => Rule.required(),
                },
                {
                    name: 'title',
                    title: 'Headline',
                    type: 'string',
                    description: 'Judul utama, e.g., "Membangun Peradaban dengan Ilmu"',
                    validation: (Rule) => Rule.required(),
                },
                {
                    name: 'description',
                    title: 'Deskripsi',
                    type: 'text',
                    rows: 3,
                    description: 'Deskripsi singkat tentang Academy',
                },
                {
                    name: 'ctaPrimary',
                    title: 'Tombol Utama',
                    type: 'object',
                    fields: [
                        { name: 'text', title: 'Teks Tombol', type: 'string', initialValue: 'Lihat Katalog Kelas' },
                        { name: 'link', title: 'Link URL', type: 'string', initialValue: '/courses' },
                    ],
                },
                {
                    name: 'ctaSecondary',
                    title: 'Tombol Sekunder',
                    type: 'object',
                    fields: [
                        { name: 'text', title: 'Teks Tombol', type: 'string', initialValue: 'Tentang Kami' },
                        { name: 'link', title: 'Link URL', type: 'string', initialValue: '/about-academy' },
                    ],
                },
                {
                    name: 'heroImage',
                    title: 'Gambar Hero (Opsional)',
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        { name: 'alt', title: 'Alt Text', type: 'string' },
                    ],
                },
            ],
        }),

        // ==========================================
        // STATS SECTION
        // ==========================================
        defineField({
            name: 'stats',
            title: 'Statistik Pencapaian',
            type: 'array',
            group: 'content',
            description: 'Angka-angka pencapaian Academy (maksimal 4)',
            validation: (Rule) => Rule.max(4),
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'value',
                            title: 'Nilai',
                            type: 'string',
                            description: 'e.g., "1,250+", "98%"',
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                            description: 'e.g., "Siswa Terdaftar"',
                            validation: (Rule) => Rule.required(),
                        },
                    ],
                    preview: {
                        select: { title: 'value', subtitle: 'label' },
                    },
                },
            ],
        }),

        // ==========================================
        // FEATURED COURSES
        // ==========================================
        defineField({
            name: 'featuredCourses',
            title: 'Kursus Unggulan',
            type: 'object',
            group: 'content',
            fields: [
                {
                    name: 'title',
                    title: 'Judul Section',
                    type: 'string',
                    initialValue: 'Kurikulum Unggulan'
                },
                {
                    name: 'subtitle',
                    title: 'Subtitle',
                    type: 'string',
                    initialValue: 'Program Terpilih'
                },
                {
                    name: 'courses',
                    title: 'Pilih Kursus',
                    type: 'array',
                    of: [{ type: 'reference', to: [{ type: 'course' }] }],
                    validation: (Rule) => Rule.max(6),
                },
                {
                    name: 'ctaText',
                    title: 'Teks CTA',
                    type: 'string',
                    initialValue: 'Lihat Semua Kelas'
                },
                {
                    name: 'ctaLink',
                    title: 'Link CTA',
                    type: 'string',
                    initialValue: '/courses'
                },
            ],
        }),

        // ==========================================
        // WHY US SECTION
        // ==========================================
        defineField({
            name: 'whyUs',
            title: 'Keunggulan Academy',
            type: 'array',
            group: 'content',
            description: 'Alasan mengapa memilih Isyraq Academy',
            validation: (Rule) => Rule.max(4),
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'title',
                            title: 'Judul',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'description',
                            title: 'Deskripsi',
                            type: 'text',
                            rows: 2
                        },
                        {
                            name: 'icon',
                            title: 'Ikon (Lucide)',
                            type: 'string',
                            description: 'Nama ikon dari lucide.dev, e.g., "shield-check", "book-open", "clock", "heart"',
                            options: {
                                list: [
                                    { title: '🛡️ Shield Check', value: 'shield-check' },
                                    { title: '📖 Book Open', value: 'book-open' },
                                    { title: '🕐 Clock', value: 'clock' },
                                    { title: '❤️ Heart', value: 'heart' },
                                    { title: '🎓 Graduation Cap', value: 'graduation-cap' },
                                    { title: '👥 Users', value: 'users' },
                                    { title: '✅ Check Circle', value: 'check-circle' },
                                    { title: '🏆 Award', value: 'award' },
                                    { title: '📜 Scroll', value: 'scroll' },
                                    { title: '🌟 Star', value: 'star' },
                                ],
                            },
                        },
                    ],
                    preview: {
                        select: { title: 'title', subtitle: 'icon' },
                        prepare({ title, subtitle }) {
                            return {
                                title,
                                subtitle: `Icon: ${subtitle || 'not set'}`,
                            };
                        },
                    },
                },
            ],
        }),

        // ==========================================
        // INSTRUCTORS
        // ==========================================
        defineField({
            name: 'instructors',
            title: 'Pengajar Unggulan',
            type: 'array',
            group: 'content',
            description: 'Pilih pengajar yang ditampilkan di landing page',
            of: [{ type: 'reference', to: [{ type: 'instructor' }] }],
            validation: (Rule) => Rule.max(6),
        }),

        // ==========================================
        // TESTIMONIALS
        // ==========================================
        defineField({
            name: 'testimonials',
            title: 'Testimoni Siswa',
            type: 'array',
            group: 'social',
            validation: (Rule) => Rule.max(6),
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'quote',
                            title: 'Kutipan',
                            type: 'text',
                            rows: 3,
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'name',
                            title: 'Nama',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'role',
                            title: 'Keterangan',
                            type: 'string',
                            description: 'e.g., "Siswa Tafsir Al-Azhar"'
                        },
                        {
                            name: 'avatar',
                            title: 'Foto',
                            type: 'image',
                            options: { hotspot: true },
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
        }),

        // ==========================================
        // CTA SECTION
        // ==========================================
        defineField({
            name: 'ctaSection',
            title: 'Call to Action Section',
            type: 'object',
            group: 'content',
            description: 'Section CTA di bagian bawah halaman',
            fields: [
                {
                    name: 'title',
                    title: 'Judul',
                    type: 'string',
                    initialValue: 'Siap Memulai Perjalanan Keilmuan?',
                },
                {
                    name: 'description',
                    title: 'Deskripsi',
                    type: 'string',
                    initialValue: 'Bergabunglah dengan ribuan siswa yang telah memulai pembelajaran mereka',
                },
                {
                    name: 'primaryCta',
                    title: 'Tombol Utama',
                    type: 'object',
                    fields: [
                        { name: 'text', title: 'Teks', type: 'string', initialValue: 'Mulai Belajar' },
                        { name: 'link', title: 'Link', type: 'string', initialValue: '/courses' },
                    ],
                },
                {
                    name: 'secondaryCta',
                    title: 'Tombol Sekunder',
                    type: 'object',
                    fields: [
                        { name: 'text', title: 'Teks', type: 'string', initialValue: 'Hubungi Kami' },
                        { name: 'link', title: 'Link', type: 'string', initialValue: '/hubungi-kami' },
                    ],
                },
            ],
        }),

        // ==========================================
        // SEO SETTINGS
        // ==========================================
        defineField({
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            group: 'seo',
            fields: [
                {
                    name: 'metaTitle',
                    title: 'Meta Title',
                    type: 'string',
                    description: 'Judul yang muncul di tab browser & search results',
                    validation: (Rule) => Rule.max(60),
                },
                {
                    name: 'metaDescription',
                    title: 'Meta Description',
                    type: 'text',
                    rows: 2,
                    description: 'Deskripsi untuk search results (max 160 karakter)',
                    validation: (Rule) => Rule.max(160),
                },
                {
                    name: 'ogImage',
                    title: 'Social Share Image',
                    type: 'image',
                    description: 'Gambar yang muncul saat di-share ke social media (1200x630px)',
                },
            ],
        }),
    ],

    preview: {
        prepare() {
            return {
                title: 'Landing Page',
                subtitle: 'Isyraq Academy - Halaman Utama',
            };
        },
    },
});
