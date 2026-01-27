import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Load .env from studio directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const client = createClient({
    projectId: 'yamgwplz',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_TOKEN
});

async function seedCategories() {
    console.log('📚 Seeding Categories...');

    const categories = [
        {
            _type: 'category',
            _id: 'category-tafsir',
            title: 'Tafsir',
            slug: { _type: 'slug', current: 'tafsir' },
            description: 'Ilmu penafsiran Al-Quran',
            icon: 'book-open'
        },
        {
            _type: 'category',
            _id: 'category-bahasa',
            title: 'Bahasa Arab',
            slug: { _type: 'slug', current: 'bahasa-arab' },
            description: 'Pembelajaran bahasa Arab klasik dan modern',
            icon: 'languages'
        },
        {
            _type: 'category',
            _id: 'category-fiqih',
            title: 'Fiqih',
            slug: { _type: 'slug', current: 'fiqih' },
            description: 'Hukum Islam dan penerapannya',
            icon: 'scale'
        }
    ];

    for (const category of categories) {
        const result = await client.createOrReplace(category);
        console.log(`  ✓ ${result.title}`);
    }
}

async function seedInstructors() {
    console.log('👨‍🏫 Seeding Instructors...');

    const instructors = [
        {
            _type: 'instructor',
            _id: 'instructor-kh-ahmad-bisri',
            name: 'KH. Ahmad Bisri',
            role: 'Pakar Tafsir & Hadis',
            bio: 'Pakar Tafsir & Hadis dengan pengalaman mengajar lebih dari 20 tahun di berbagai pesantren. Beliau merupakan alumni dari berbagai pesantren salaf di Jawa Timur dan telah mengkaji kitab-kitab kuning secara mendalam.',
            expertises: ['Tafsir', 'Hadis', 'Ulum Al-Quran']
        },
        {
            _type: 'instructor',
            _id: 'instructor-ustadz-fulan',
            name: 'Ustadz Fulan Al-Azhari',
            role: 'Ahli Peradaban Islam',
            bio: 'Lulusan Al-Azhar University dengan spesialisasi dalam Sejarah Peradaban Islam dan Bahasa Arab. Beliau aktif dalam dakwah dan penulisan artikel keislaman.',
            expertises: ['Sejarah Islam', 'Bahasa Arab', 'Peradaban']
        },
        {
            _type: 'instructor',
            _id: 'instructor-dr-aminah',
            name: 'Dr. Aminah',
            role: 'Dosen Bahasa Arab',
            bio: 'Dosen Bahasa Arab dengan fokus pada metodologi pengajaran bahasa Arab modern. Memiliki pengalaman mengajar di berbagai universitas.',
            expertises: ['Bahasa Arab', 'Nahwu', 'Sharaf']
        }
    ];

    for (const instructor of instructors) {
        const result = await client.createOrReplace(instructor);
        console.log(`  ✓ ${result.name}`);
    }
}

async function seedCourses() {
    console.log('📖 Seeding Courses...');

    const courses = [
        {
            _type: 'course',
            _id: 'course-tafsir-al-azhar',
            title: 'Tafsir Al-Azhar: Pendekatan Modern',
            slug: { _type: 'slug', current: 'tafsir-al-azhar-modern' },
            tagline: 'Memahami Al-Quran dengan pendekatan kontemporer',
            description: 'Kursus ini membahas tafsir Al-Quran dengan pendekatan modern yang relevan dengan kehidupan kontemporer. Anda akan mempelajari metodologi penafsiran yang digunakan oleh para ulama kontemporer.',
            level: 'all',
            duration: '120 menit',
            price: 150000,
            discountPrice: 99000,
            category: { _type: 'reference', _ref: 'category-tafsir' },
            instructor: { _type: 'reference', _ref: 'instructor-kh-ahmad-bisri' },
            benefits: [
                'Memahami metodologi tafsir modern',
                'Kontekstualisasi ayat dengan zaman',
                'Sertifikat resmi',
                'Akses materi selamanya'
            ]
        },
        {
            _type: 'course',
            _id: 'course-bahasa-arab-nahwu',
            title: 'Bahasa Arab Klasik: Nahwu Wadhih',
            slug: { _type: 'slug', current: 'bahasa-arab-klasik-nahwu' },
            tagline: 'Menguasai tata bahasa Arab dari dasar',
            description: 'Pelajari Nahwu (tata bahasa Arab) dari kitab Nahwu Wadhih secara sistematis. Cocok untuk pemula yang ingin memahami struktur bahasa Arab.',
            level: 'beginner',
            duration: '90 menit',
            price: 125000,
            category: { _type: 'reference', _ref: 'category-bahasa' },
            instructor: { _type: 'reference', _ref: 'instructor-ustadz-fulan' },
            benefits: [
                'Belajar dari kitab klasik',
                'Latihan intensif',
                'Akses selamanya',
                'Kuis interaktif'
            ]
        },
        {
            _type: 'course',
            _id: 'course-fiqih-muamalah',
            title: 'Fiqih Muamalah: Ekonomi Syariah',
            slug: { _type: 'slug', current: 'fiqih-muamalah-ekonomi' },
            tagline: 'Memahami transaksi ekonomi dalam Islam',
            description: 'Kursus komprehensif tentang hukum transaksi ekonomi dalam Islam. Mulai dari jual beli, riba, hingga investasi syariah.',
            level: 'intermediate',
            duration: '150 menit',
            price: 200000,
            discountPrice: 149000,
            category: { _type: 'reference', _ref: 'category-fiqih' },
            instructor: { _type: 'reference', _ref: 'instructor-dr-aminah' },
            benefits: [
                'Aplikasi fiqih dalam bisnis',
                'Studi kasus nyata',
                'Konsultasi langsung',
                'Sertifikat kompetensi'
            ]
        }
    ];

    for (const course of courses) {
        const result = await client.createOrReplace(course);
        console.log(`  ✓ ${result.title}`);
    }
}

async function seedLandingPage() {
    console.log('🏠 Seeding Landing Page...');

    const landingPage = {
        _type: 'landingPage',
        _id: 'landingPage',

        // Hero Section
        hero: {
            title: 'Membangun Peradaban dengan Ilmu',
            subtitle: 'Isyraq Annur Academy',
            description: 'Pusat studi Islam bersanad yang memadukan kedalaman tradisi turats klasik dengan wawasan kontemporer untuk menjawab tantangan zaman.',
            ctaPrimary: {
                text: 'Lihat Katalog Kelas',
                link: '/courses'
            },
            ctaSecondary: {
                text: 'Tentang Kami',
                link: '/about-academy'
            }
        },

        // Stats
        stats: [
            { label: 'Siswa Terdaftar', value: '1,250+' },
            { label: 'Materi Video', value: '450+' },
            { label: 'Pengajar Ahli', value: '12+' },
            { label: 'Kepuasan Siswa', value: '98%' }
        ],

        // Featured Courses Section
        featuredCourses: {
            title: 'Kurikulum Unggulan',
            subtitle: 'Program Terpilih',
            courses: [
                { _type: 'reference', _ref: 'course-tafsir-al-azhar', _key: 'fc1' },
                { _type: 'reference', _ref: 'course-bahasa-arab-nahwu', _key: 'fc2' },
                { _type: 'reference', _ref: 'course-fiqih-muamalah', _key: 'fc3' }
            ]
        },

        // Why Us Section
        whyUs: [
            {
                _key: 'wu1',
                title: 'Sanad Terhubung',
                description: 'Kurikulum kami disusun berdasarkan tradisi keilmuan Islam yang memiliki silsilah (sanad) hingga ke sumbernya.',
                icon: 'shield-check'
            },
            {
                _key: 'wu2',
                title: 'Kurikulum Terstruktur',
                description: 'Pembelajaran dirancang secara akademis dari tingkat dasar hingga lanjutan secara bertahap.',
                icon: 'book-open'
            },
            {
                _key: 'wu3',
                title: 'Fleksibilitas Belajar',
                description: 'Akses materi video dan modul berkualitas kapan saja dan di mana saja sesuai kecepatan belajar Anda.',
                icon: 'clock'
            },
            {
                _key: 'wu4',
                title: 'Profit for Non-Profit',
                description: 'Seluruh keuntungan operasional akademi disalurkan kembali untuk dana beasiswa santri di Pesantren Al-Bisri.',
                icon: 'heart'
            }
        ],

        // Instructors References
        instructors: [
            { _type: 'reference', _ref: 'instructor-kh-ahmad-bisri', _key: 'ins1' },
            { _type: 'reference', _ref: 'instructor-ustadz-fulan', _key: 'ins2' },
            { _type: 'reference', _ref: 'instructor-dr-aminah', _key: 'ins3' }
        ],

        // Testimonials
        testimonials: [
            {
                _key: 'testi1',
                quote: 'Alhamdulillah, belajar di Isyraq Academy sangat memudahkan saya memahami tafsir Al-Quran dengan pendekatan yang sistematis.',
                name: 'Ahmad Fauzi',
                role: 'Siswa Tafsir Al-Azhar'
            },
            {
                _key: 'testi2',
                quote: 'Materi Nahwu yang diajarkan sangat terstruktur. Dalam 3 bulan saya sudah bisa membaca kitab kuning dasar.',
                name: 'Siti Aisyah',
                role: 'Siswa Bahasa Arab'
            },
            {
                _key: 'testi3',
                quote: 'Konsep Profit for Non-Profit sangat menginspirasi. Saya belajar sekaligus beramal untuk pendidikan yatim.',
                name: 'Budi Santoso',
                role: 'Siswa Fiqih Muamalah'
            }
        ],

        // CTA Section
        ctaSection: {
            title: 'Siap Memulai Perjalanan Keilmuan?',
            description: 'Bergabunglah dengan ribuan siswa yang telah memulai pembelajaran mereka',
            primaryCta: {
                text: 'Mulai Belajar',
                link: '/courses'
            },
            secondaryCta: {
                text: 'Hubungi Kami',
                link: '/hubungi-kami'
            }
        },

        // SEO
        seo: {
            metaTitle: 'Isyraq Academy | Pusat Studi Islam & Peradaban',
            metaDescription: 'Pusat studi Islam bersanad yang memadukan kedalaman tradisi turats klasik dengan wawasan kontemporer untuk menjawab tantangan zaman.'
        }
    };

    const result = await client.createOrReplace(landingPage);
    console.log(`  ✓ Landing Page created with ID: ${result._id}`);
}

async function main() {
    console.log('🚀 Starting Academy Data Seeding...\n');
    console.log(`📦 Project: yamgwplz`);
    console.log(`📁 Dataset: production`);
    console.log(`🔑 Token: ${process.env.SANITY_TOKEN ? '✓ Found' : '✗ Missing'}\n`);

    if (!process.env.SANITY_TOKEN) {
        console.error('❌ SANITY_TOKEN not found in .env file!');
        process.exit(1);
    }

    try {
        await seedCategories();
        console.log('');

        await seedInstructors();
        console.log('');

        await seedCourses();
        console.log('');

        await seedLandingPage();
        console.log('');

        console.log('🎉 All data seeded successfully!');
        console.log('\n📝 Next: Verify in Sanity Studio at http://localhost:3333');
    } catch (error) {
        console.error('\n💥 Seeding failed:', error);
        process.exit(1);
    }
}

main();
