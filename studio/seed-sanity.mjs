// Complete Sanity Seeding Script
// Run: cd studio && node seed-sanity.mjs

import { createClient } from '@sanity/client';
import 'dotenv/config';

const client = createClient({
    projectId: 'yamgwplz',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_TOKEN,
    useCdn: false,
});

// Helper to create or replace a document
async function createOrReplace(doc) {
    try {
        await client.createOrReplace(doc);
        console.log(`✅ Created/Updated: ${doc._type} (${doc._id})`);
    } catch (error) {
        console.error(`❌ Error creating ${doc._type}:`, error.message);
    }
}

// ============================================
// SITE SETTINGS (Navigation Menu)
// ============================================
const siteSettings = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    title: 'Al-Bisri Royal Education',
    mainNavigation: [
        {
            _key: 'nav-home',
            title: 'Beranda',
            link: '/',
            isDropdown: false,
            isButton: false,
        },
        {
            _key: 'nav-about',
            title: 'Tentang',
            link: '/tentang-kami',
            isDropdown: false,
            isButton: false,
        },
        {
            _key: 'nav-academy',
            title: 'Academy',
            link: '/akademi',
            isDropdown: false,
            isButton: false,
        },
        {
            _key: 'nav-wakaf',
            title: 'Wakaf',
            link: '/donasi',
            isDropdown: false,
            isButton: false,
        },
        {
            _key: 'nav-berita',
            title: 'Berita',
            link: '/berita',
            isDropdown: false,
            isButton: false,
        },
        {
            _key: 'nav-psb',
            title: 'Daftar Santri',
            link: '/psb',
            isDropdown: false,
            isButton: true,
        },
    ],
    footerNavigation: [
        'Tentang Kami',
        'Program Pendidikan',
        'Laporan Keuangan',
        'Hubungi Kami',
    ],
    contactInfo: {
        address: 'Jl. Pesantren No. 45\nKota Batu, Jawa Timur',
        email: 'info@albisri.org',
        phone: '+62 812-3456-7890',
    },
    socialLinks: [
        { _key: 'fb', platform: 'Facebook', url: 'https://facebook.com/albisri' },
        { _key: 'ig', platform: 'Instagram', url: 'https://instagram.com/albisri' },
        { _key: 'yt', platform: 'YouTube', url: 'https://youtube.com/albisri' },
    ],
};

// ============================================
// LANDING PAGE
// ============================================
const landingPage = {
    _id: 'landingPage',
    _type: 'landingPage',
    hero: {
        badge: '100% Lulusan Dhuafa Masuk PTN/Timur Tengah',
        title: [
            {
                _type: 'block',
                _key: 'title-block-1',
                children: [
                    { _type: 'span', _key: 'span1', text: 'Memuliakan ', marks: [] },
                    { _type: 'span', _key: 'span2', text: 'Yatim,', marks: ['strong'] },
                    { _type: 'span', _key: 'span3', text: ' ', marks: [] },
                    { _type: 'span', _key: 'span4', text: 'Membangun Peradaban', marks: ['em', 'highlight'] },
                ],
                markDefs: [],
                style: 'normal',
            },
        ],
        description: 'Kami tidak sekadar memberi santunan, tapi memberikan pendidikan terbaik agar anak yatim & dhuafa tumbuh menjadi pemimpin yang mandiri dan bermartabat.',
        ctaPrimary: {
            text: 'Investasi Wakaf',
            link: '/donasi',
        },
        ctaSecondary: {
            text: 'Daftar Reguler',
            link: '/psb',
        },
        impactBadge: {
            label: 'Amanah Umat',
            value: '1.250 Santri',
        },
    },
    about: {
        badge: 'Filosofi Kemandirian',
        title: 'Gotong Royong',
        subtitle: 'Pendidikan Umat',
        paragraphs: [
            'Al-Bisri menerapkan sistem Subsidi Silang (Cross-Subsidy). Kami membuka layanan asrama dan pendidikan berbayar bagi masyarakat umum.',
        ],
        highlightedParagraph: 'Keuntungan dari program reguler inilah yang menopang operasional dan menjamin pendidikan GRATIS berkualitas tinggi bagi ratusan santri yatim dan dhuafa.',
        ctaText: 'Dukung Gerakan Ini',
        ctaLink: '/donasi',
        floatingBadge: {
            text: 'Mandiri',
            subtext: 'Visi Ekonomi Pesantren',
        },
    },
    timeline: {
        badge: 'Milestones',
        title: 'Jejak Langkah Pengabdian',
        milestones: [
            {
                _key: 'milestone-1998',
                year: '1998',
                title: 'Perintisan',
                description: 'Pendirian Panti Asuhan & Pesantren Yatim pertama.',
            },
            {
                _key: 'milestone-2010',
                year: '2010',
                title: 'Legalitas Madin',
                description: 'Izin operasional resmi Madrasah Diniyah & Program Asrama.',
            },
            {
                _key: 'milestone-2024',
                year: '2024',
                title: 'Ekosistem Baru',
                description: 'Peluncuran unit usaha mandiri & Pesantren Mahasiswa.',
            },
            {
                _key: 'milestone-2026',
                year: '2026',
                title: 'Kemandirian',
                description: 'Target operasional mandiri penuh & Universitas.',
            },
        ],
    },
    partnerships: {
        headline: 'Dipercaya Oleh Lembaga & Korporasi',
        partners: [
            { _key: 'partner-bsi', name: 'Bank BSI' },
            { _key: 'partner-univ', name: 'Universitas Partner' },
            { _key: 'partner-baznas', name: 'BAZNAS' },
            { _key: 'partner-kemenag', name: 'Kemenag' },
            { _key: 'partner-dompet', name: 'Dompet Dhuafa' },
        ],
    },
    elearning: {
        badge: 'Didukung Isyraq Annur Media',
        title: 'Akses Kurikulum',
        titleHighlight: 'Bahasa Arab Digital',
        description: 'Kami membuka akses materi pembelajaran Bahasa Arab standar Timur Tengah secara digital. Dikembangkan oleh tim ahli Pesantren Mahasiswa An-Nur.',
        ctaText: 'Akses Gratis',
        ctaLink: '/akademi',
    },
    impactFund: {
        badge: 'Transparansi Dana Wakaf',
        title: 'Laporan Penyaluran',
        description: 'Melihat langsung bagaimana donasi Anda menjadi "darah" bagi pendidikan anak yatim.',
        transparencyLink: '/transparansi',
        chartData: {
            labels: ['Beasiswa Yatim', 'Wakaf Produktif', 'Infrastruktur'],
            data: [50, 30, 20],
        },
        productiveAssets: 'Rp 12.5 M',
        programs: [
            {
                _key: 'program-kader',
                icon: 'graduation-cap',
                title: '150 Kader',
                description: 'Santri Yatim Takhassus Mukim.',
                progress: 85,
            },
            {
                _key: 'program-lahan',
                icon: 'sprout',
                title: '20 Hektar',
                description: 'Lahan wakaf produktif untuk kemandirian.',
                progress: 60,
            },
            {
                _key: 'program-asrama',
                icon: 'building',
                title: 'Pembangunan Asrama Putra',
                description: 'Progres fisik mencapai 75%',
                progress: 75,
            },
        ],
    },
    testimonials: {
        badge: 'Suara Hati',
        title: 'Kisah Penerima Manfaat',
        testimonialsList: [
            {
                _key: 'testi-1',
                quote: 'Al-Bisri memberi saya rumah ketika saya kehilangan segalanya. Di sini saya belajar bahwa yatim bukan alasan untuk menyerah.',
                name: 'Ahmad Fikri',
                role: 'Alumni 2018',
            },
            {
                _key: 'testi-2',
                quote: 'Sistem transparansi wakafnya luar biasa. Saya mendapat laporan berkala tentang perkembangan pohon mangga wakaf saya.',
                name: 'Ustadz Hasan',
                role: 'Pengajar Kitab Kuning',
            },
            {
                _key: 'testi-3',
                quote: 'Anak saya belajar tahfidz sekaligus coding. Kombinasi yang sempurna untuk zaman sekarang!',
                name: 'Siti Aminah',
                role: 'Wali Santri',
            },
        ],
    },
    latestNews: {
        title: 'Kabar Pesantren',
        ctaText: 'Lihat Semua',
        ctaLink: '/berita',
        newsItems: [
            {
                _key: 'news-1',
                category: 'Prestasi',
                title: 'Santri Al-Bisri Juara 1 MHQ Nasional',
                excerpt: 'Ananda Fatih berhasil menyisihkan 300 peserta dari seluruh Indonesia...',
                publishedAt: '2024-10-20',
                link: '/berita/santri-juara-mhq',
            },
            {
                _key: 'news-2',
                category: 'Wakaf Produktif',
                title: 'Panen Raya Padi Organik',
                excerpt: 'Hasil panen meningkat 20% berkat penerapan teknologi irigasi tetes...',
                publishedAt: '2024-10-18',
                link: '/berita/panen-raya-padi',
            },
            {
                _key: 'news-3',
                category: 'Kunjungan',
                title: 'Studi Banding Kemenag',
                excerpt: 'Kunjungan untuk meninjau kurikulum kewirausahaan santri...',
                publishedAt: '2024-10-15',
                link: '/berita/studi-banding-kemenag',
            },
        ],
    },
    donationCTA: {
        title: 'Investasi Akhirat',
        subtitle: 'Sedekah Jariyah Tanpa Henti',
        zakatCalculator: {
            title: 'Hitung Zakat Maal',
            inputLabel: 'Total Aset (Setahun)',
            buttonText: 'Tunaikan Zakat',
        },
        wakafPackages: {
            title: 'Paket Wakaf Tunai',
            packages: [
                {
                    _key: 'wakaf-1',
                    name: 'Wakaf Semen & Bata',
                    description: 'Pembangunan Asrama',
                    amount: 100000,
                },
                {
                    _key: 'wakaf-2',
                    name: 'Wakaf Benih Padi',
                    description: 'Pertanian Produktif',
                    amount: 500000,
                },
                {
                    _key: 'wakaf-3',
                    name: 'Wakaf Alat Belajar',
                    description: 'Kitab & Komputer',
                    amount: 1000000,
                },
            ],
        },
    },
    seo: {
        metaTitle: 'Al-Bisri | Royal Education Foundation',
        metaDescription: 'Yayasan sosial & pendidikan yang berdedikasi memuliakan anak yatim melalui pendidikan berkualitas.',
    },
};

// ============================================
// ABOUT PAGE
// ============================================
const aboutPage = {
    _id: 'aboutPage',
    _type: 'aboutPage',
    hero: {
        title: 'Penjaga Tradisi, Pembangun Masa Depan',
        subtitle: 'Al-Bisri adalah perwujudan dari cita-cita luhur untuk mengangkat derajat umat melalui pendidikan yang berkarakter, mandiri, dan berwawasan global.',
    },
    history: {
        title: 'Akar Sejarah',
        introduction: 'Bermula dari sebuah rumah wakaf sederhana di pinggiran kota, KH. Bisri Mustofa (Alm) memulai majelis taklim kecil dengan lima orang santri yatim. Niat beliau sederhana: memberikan hak pendidikan bagi mereka yang kurang beruntung.\n\nSeiring berjalannya waktu, amanah umat semakin besar. Pada tahun 2010, Yayasan Al-Bisri resmi bertransformasi menjadi lembaga pendidikan terpadu yang memadukan kurikulum salaf (kitab kuning) dengan sistem sekolah formal modern.\n\nKini, di bawah naungan Isyraq Annur Media dan dukungan Pesantren Mahasiswa An-Nur, Al-Bisri terus berinovasi mengembangkan kurikulum riset berbasis turats untuk menjawab tantangan zaman.',
        timeline: [
            {
                _key: 'hist-1998',
                year: '1998',
                event: 'Pendirian',
                description: 'Didirikan sebagai Panti Asuhan & Pesantren Yatim.',
            },
            {
                _key: 'hist-2010',
                year: '2010',
                event: 'Transformasi',
                description: 'Bertransformasi menjadi lembaga pendidikan terpadu.',
            },
            {
                _key: 'hist-2024',
                year: '2024',
                event: 'Ekspansi',
                description: 'Peluncuran unit usaha mandiri & Pesantren Mahasiswa.',
            },
        ],
    },
    visionMission: {
        sectionTitle: 'Visi & Misi',
        vision: {
            title: 'Visi Utama',
            description: 'Menjadi pusat kaderisasi ulama dan intelektual muslim yang mandiri, berakhlak mulia, dan berwawasan global.',
        },
        mission: {
            title: 'Misi Strategis',
            items: [
                'Menyelenggarakan pendidikan Islam yang memadukan tradisi klasik dan sains modern.',
                'Mengembangkan unit usaha produktif untuk kemandirian ekonomi pesantren.',
                'Membekali santri dengan keterampilan teknokrat dan kepemimpinan.',
                'Menyebarkan dakwah Islam yang rahmatan lil alamin melalui media digital.',
            ],
        },
        values: [
            {
                _key: 'value-1',
                icon: 'book-open',
                title: 'Tradisi Keilmuan',
                description: 'Menjaga tradisi keilmuan Islam klasik sambil mengadopsi metode modern.',
            },
            {
                _key: 'value-2',
                icon: 'heart',
                title: 'Kasih Sayang',
                description: 'Memperlakukan santri yatim dengan cinta dan perhatian seperti keluarga sendiri.',
            },
            {
                _key: 'value-3',
                icon: 'target',
                title: 'Kemandirian',
                description: 'Mendorong santri untuk mandiri secara ekonomi dan intelektual.',
            },
        ],
    },
    leadership: {
        sectionTitle: 'Dewan Pengasuh',
        description: 'Struktur organisasi yang dipimpin oleh ulama dan profesional berpengalaman.',
        members: [
            {
                _key: 'leader-1',
                name: 'KH. Ahmad Bisri, Lc. MA',
                position: 'Pengasuh Pesantren',
                bio: 'Alumni Universitas Al-Azhar Kairo dengan spesialisasi Fiqih Muamalah.',
            },
            {
                _key: 'leader-2',
                name: 'Dr. H. Muhammad Ilham',
                position: 'Direktur Pendidikan',
                bio: 'Doktor Manajemen Pendidikan Islam, fokus pada pengembangan kurikulum riset.',
            },
            {
                _key: 'leader-3',
                name: 'H. Yusuf Mansur, SE',
                position: 'Ketua Yayasan',
                bio: 'Profesional di bidang keuangan syariah dan pengembangan wakaf produktif.',
            },
        ],
    },
    facilities: {
        sectionTitle: 'Fasilitas Penunjang',
        description: 'Lingkungan yang kondusif untuk tumbuh kembang santri.',
        facilityList: [
            {
                _key: 'facility-1',
                name: 'Asrama Putra/Putri',
                description: 'Kapasitas 500 Santri',
                features: ['Kamar AC', 'Meja Belajar Individual', 'Musholla di Setiap Lantai'],
            },
            {
                _key: 'facility-2',
                name: 'Perpustakaan Digital',
                description: 'Akses Kitab & Jurnal',
                features: ['Koleksi 10.000+ Kitab Digital', 'Akses Jurnal Internasional', 'Ruang Baca Nyaman'],
            },
            {
                _key: 'facility-3',
                name: 'Lab Komputer',
                description: 'Pusat Riset & Multimedia',
                features: ['30 Unit Komputer', 'Internet Fiber Optic', 'Software Desain & Editing'],
            },
            {
                _key: 'facility-4',
                name: 'Greenhouse Wakaf',
                description: 'Laboratorium Alam',
                features: ['Pertanian Organik', 'Hidroponik', 'Budidaya Ikan'],
            },
        ],
    },
    seo: {
        metaTitle: 'Profil & Sejarah | Al-Bisri Royal Education',
        metaDescription: 'Pelajari sejarah, visi misi, dan kepemimpinan Pesantren Al-Bisri Royal Education.',
    },
};

// ============================================
// DONATION PAGE
// ============================================
const donationPage = {
    _id: 'donationPage',
    _type: 'donationPage',
    hero: {
        title: 'Investasi Intelektual',
        subtitle: 'Filantropi Pendidikan',
        description: 'Berbeda dengan donasi konvensional, dana Anda di sini digunakan untuk mencetak ulama dan mengembangkan kurikulum Islam yang relevan dengan zaman.',
    },
    whatsappNumber: '6281234567890',
    paymentMethods: [
        {
            _key: 'payment-bsi',
            name: 'Bank BSI',
            accountNumber: '7123-4567-89',
            accountName: 'Yayasan Al-Bisri',
            instructions: 'Transfer ke rekening BSI dan kirim bukti transfer via WhatsApp.',
        },
    ],
    predefinedAmounts: [100000, 500000, 1000000],
    donationUpdates: {
        title: 'Laporan Dampak',
        updates: [
            {
                _key: 'update-1',
                date: '2024-10-20T00:00:00.000Z',
                title: 'Peluncuran Modul Fiqih Kontemporer',
                description: 'Tim riset Al-Bisri telah menyelesaikan penyusunan Kitab Fiqih Muamalah Digital. Dana wakaf digunakan untuk riset, penulisan, dan distribusi digital gratis.',
            },
            {
                _key: 'update-2',
                date: '2024-09-15T00:00:00.000Z',
                title: '5 Santri Lolos ke Al-Azhar Kairo',
                description: 'Beasiswa Kader Ulama telah memberangkatkan 5 santri terbaik untuk melanjutkan studi jenjang S1 di Mesir.',
            },
        ],
    },
    topDonors: {
        title: 'Para Pewakaf',
        showTopDonors: true,
        displayCount: 10,
    },
    seo: {
        metaTitle: 'Investasi Peradaban | Al-Bisri Royal Education',
        metaDescription: 'Dukung pendidikan santri yatim dan pengembangan kurikulum Islam melalui wakaf di Al-Bisri.',
    },
};

// ============================================
// DONATION PROGRAMS
// ============================================
const donationPrograms = [
    {
        _id: 'donationProgram-beasiswa',
        _type: 'donationProgram',
        title: 'Beasiswa Kader Ulama',
        slug: { _type: 'slug', current: 'beasiswa-kader-ulama' },
        description: 'Mencetak santri yang menguasai Turats (Kitab Kuning) sekaligus Sains Modern. Menanggung biaya riset dan kitab.',
        detailedDescription: 'Program beasiswa ini ditujukan untuk santri yatim dan dhuafa berprestasi yang ingin mendalami ilmu agama dan sains. Kami menanggung seluruh biaya pendidikan, asrama, kitab, dan program riset.',
        targetAmount: 200000000,
        currentAmount: 120000000,
        beneficiaryCount: 150,
        targetBeneficiaries: 200,
        isActive: true,
        category: 'beasiswa',
    },
    {
        _id: 'donationProgram-riset',
        _type: 'donationProgram',
        title: 'Wakaf Riset & Kurikulum',
        slug: { _type: 'slug', current: 'wakaf-riset-kurikulum' },
        description: 'Pengembangan modul ajar Islam, digitalisasi manuskrip, dan platform E-Learning gratis untuk umat.',
        detailedDescription: 'Dana wakaf ini digunakan untuk pengembangan kurikulum digital, digitalisasi manuskrip klasik, dan pembuatan platform e-learning yang dapat diakses gratis oleh umat Islam seluruh dunia.',
        targetAmount: 100000000,
        currentAmount: 45000000,
        isActive: true,
        category: 'wakaf',
    },
    {
        _id: 'donationProgram-pusatstudi',
        _type: 'donationProgram',
        title: 'Pembangunan Pusat Studi',
        slug: { _type: 'slug', current: 'pembangunan-pusat-studi' },
        description: 'Wakaf fisik untuk Perpustakaan Digital dan Asrama Mahasantri (Ma\'had Aly).',
        detailedDescription: 'Program wakaf pembangunan ini mencakup perpustakaan digital modern dengan koleksi kitab klasik dan jurnal internasional, serta asrama mahasantri untuk program pendidikan tingkat lanjut.',
        targetAmount: 500000000,
        currentAmount: 150000000,
        isActive: true,
        category: 'infrastruktur',
    },
];

// ============================================
// PSB CONFIGURATION
// ============================================
const psbConfig = {
    _id: 'psbConfig',
    _type: 'psbConfig',
    registrationStatus: {
        isOpen: true,
        openDate: '2026-01-01T00:00:00.000Z',
        closeDate: '2026-06-30T23:59:59.000Z',
        closedMessage: 'Pendaftaran Santri Baru untuk Tahun Ajaran 2026/2027 telah ditutup. Mohon tunggu periode pendaftaran berikutnya.',
    },
    educationLevels: [
        {
            _key: 'level-tpq',
            name: 'TPQ',
            code: 'TPQ',
            description: 'Program Taman Pendidikan Al-Quran untuk usia TK-SD',
            fee: 150000,
            monthlyFee: 50000,
        },
        {
            _key: 'level-madin',
            name: 'Madrasah Diniyah',
            code: 'MADIN',
            description: 'Program Pendidikan Diniyah untuk usia SD-SMP',
            fee: 350000,
            monthlyFee: 100000,
        },
        {
            _key: 'level-mahasiswa',
            name: 'Pesantren Mahasiswa',
            code: 'PESMA',
            description: 'Program Pesantren untuk Mahasiswa dan Dewasa dengan asrama',
            fee: 1500000,
            monthlyFee: 650000,
        },
    ],
    entryPaths: [
        {
            _key: 'path-reguler',
            name: 'Jalur Reguler',
            code: 'reguler',
            description: 'Untuk calon santri umum (TPQ, Madin, Mahasiswa). Biaya pendidikan digunakan untuk operasional dan subsidi silang.',
            requirements: [
                'Kartu Keluarga (KK)',
                'Bukti Transfer Pendaftaran',
                'Foto 3x4',
            ],
            discountPercentage: 0,
        },
        {
            _key: 'path-beasiswa',
            name: 'Jalur Beasiswa Kader',
            code: 'beasiswa',
            description: 'Beasiswa penuh (Full Funded) untuk Yatim & Dhuafa berprestasi. Wajib lolos seleksi berkas.',
            requirements: [
                'Kartu Keluarga (KK)',
                'Surat Keterangan Tidak Mampu (SKTM) dari Kelurahan',
                'Surat Kematian Ayah (untuk Yatim)',
                'Rapor Terakhir',
                'Surat Pernyataan Bersedia Mengikuti Masa Pengabdian (Khidmah)',
            ],
            discountPercentage: 100,
        },
    ],
    requiredDocuments: [
        {
            _key: 'doc-kk',
            name: 'Kartu Keluarga (KK)',
            description: 'Scan atau foto Kartu Keluarga yang masih berlaku',
            isRequired: true,
            allowedFormats: ['PDF', 'JPG', 'PNG'],
            maxFileSize: 5,
        },
        {
            _key: 'doc-transfer',
            name: 'Bukti Transfer Pendaftaran',
            description: 'Screenshot atau foto bukti transfer biaya pendaftaran (untuk Jalur Reguler)',
            isRequired: true,
            allowedFormats: ['JPG', 'PNG'],
            maxFileSize: 5,
        },
        {
            _key: 'doc-sktm',
            name: 'SKTM / Surat Kematian Ayah',
            description: 'Untuk Jalur Beasiswa: Surat Keterangan Tidak Mampu atau Surat Kematian Ayah',
            isRequired: false,
            allowedFormats: ['PDF', 'JPG', 'PNG'],
            maxFileSize: 5,
        },
    ],
    selectionSteps: [
        {
            _key: 'step-1',
            stepNumber: 1,
            name: 'Isi Formulir Online',
            description: 'Lengkapi data santri dan wali di formulir pendaftaran online.',
        },
        {
            _key: 'step-2',
            stepNumber: 2,
            name: 'Unggah Dokumen',
            description: 'Upload dokumen persyaratan sesuai jalur yang dipilih.',
        },
        {
            _key: 'step-3',
            stepNumber: 3,
            name: 'Verifikasi Admin',
            description: 'Admin akan memverifikasi dokumen dalam 1x24 jam kerja.',
        },
        {
            _key: 'step-4',
            stepNumber: 4,
            name: 'Pengumuman',
            description: 'Hasil verifikasi diumumkan via WhatsApp yang terdaftar.',
        },
    ],
    contactInfo: {
        whatsappNumber: '6281234567890',
        email: 'psb@albisri.org',
        phone: '+62 812-3456-7890',
        address: 'Jl. Pesantren No. 45, Kota Batu, Jawa Timur',
    },
};

// ============================================
// BLOG POSTS / AUTHORS
// ============================================
// Note: These are sample blog posts. In a real scenario, you'd have a 'post' and 'author' schema.
// For now, we'll create them as generic documents if the schema exists.

// ============================================
// MAIN EXECUTION
// ============================================
async function seedAll() {
    console.log('🚀 Starting Sanity seeding...\n');

    // Core Documents
    await createOrReplace(siteSettings);
    await createOrReplace(landingPage);
    await createOrReplace(aboutPage);
    await createOrReplace(donationPage);
    await createOrReplace(psbConfig);

    // Donation Programs
    for (const program of donationPrograms) {
        await createOrReplace(program);
    }

    // Blog System
    for (const author of authors) {
        await createOrReplace(author);
    }
    for (const category of blogCategories) {
        await createOrReplace(category);
    }
    for (const post of blogPosts) {
        await createOrReplace(post);
    }

    console.log('\n✨ Seeding complete!');
    console.log('\nSummary:');
    console.log('  - Site Settings: Navigation menu with 6 items');
    console.log('  - Landing Page: All sections populated');
    console.log('  - About Page: History, Vision/Mission, Leadership, Facilities');
    console.log('  - Donation Page: Programs, Updates, Payment Methods');
    console.log('  - PSB Config: 3 education levels, 2 entry paths, 4 selection steps');
    console.log('  - Donation Programs: 3 programs created');
    console.log('  - Authors: 2 authors created');
    console.log('  - Blog Categories: 4 categories created');
    console.log('  - Blog Posts: 4 sample posts created');
}

// ============================================
// BLOG SYSTEM - AUTHORS
// ============================================
const authors = [
    {
        _id: 'author-kh-ilham',
        _type: 'author',
        name: 'KH. Muhammad Ilham',
        slug: { _type: 'slug', current: 'kh-muhammad-ilham' },
        role: 'Pengasuh Pesantren',
        bio: 'Pengasuh Pesantren Al-Bisri sejak 2010. Alumni Al-Azhar Kairo dan Ma\'had Darul Ulum Jombang. Fokus pada pengembangan pendidikan Islam modern.',
        socialLinks: {
            email: 'kh.ilham@albisri.org',
            instagram: 'https://instagram.com/khilham',
            twitter: 'https://twitter.com/khilham',
        },
    },
    {
        _id: 'author-ustadzah-fatimah',
        _type: 'author',
        name: 'Ustadzah Fatimah Az-Zahra',
        slug: { _type: 'slug', current: 'ustadzah-fatimah' },
        role: 'Kepala Bidang Pendidikan',
        bio: 'Alumnus LIPIA Jakarta. Berpengalaman 15 tahun dalam pendidikan Bahasa Arab dan Tahfidz Quran.',
        socialLinks: {
            email: 'fatimah@albisri.org',
            linkedin: 'https://linkedin.com/in/fatimahazzahra',
        },
    },
];

// ============================================
// BLOG SYSTEM - CATEGORIES
// ============================================
const blogCategories = [
    {
        _id: 'cat-prestasi',
        _type: 'blogCategory',
        name: 'Prestasi Santri',
        slug: { _type: 'slug', current: 'prestasi' },
        description: 'Berita prestasi dan pencapaian santri Al-Bisri',
        color: 'royal',
        icon: 'trophy',
    },
    {
        _id: 'cat-laporan-wakaf',
        _type: 'blogCategory',
        name: 'Laporan Wakaf',
        slug: { _type: 'slug', current: 'laporan-wakaf' },
        description: 'Laporan transparansi penyaluran dana wakaf',
        color: 'gold',
        icon: 'bar-chart',
    },
    {
        _id: 'cat-opini',
        _type: 'blogCategory',
        name: 'Opini & Riset',
        slug: { _type: 'slug', current: 'opini' },
        description: 'Kajian, opini, dan hasil riset dari tim pesantren',
        color: 'blue',
        icon: 'book-open',
    },
    {
        _id: 'cat-kegiatan',
        _type: 'blogCategory',
        name: 'Kegiatan',
        slug: { _type: 'slug', current: 'kegiatan' },
        description: 'Dokumentasi kegiatan dan acara pesantren',
        color: 'stone',
        icon: 'calendar',
    },
];

// ============================================
// BLOG SYSTEM - POSTS
// ============================================
const blogPosts = [
    {
        _id: 'post-transformasi-digital',
        _type: 'blogPost',
        title: 'Transformasi Pendidikan Pesantren di Era Digital: Peluang & Tantangan',
        slug: { _type: 'slug', current: 'transformasi-digital-pesantren' },
        excerpt: 'Sebuah refleksi akhir tahun tentang bagaimana Al-Bisri mengadopsi teknologi tanpa kehilangan akar tradisi turats.',
        category: { _type: 'reference', _ref: 'cat-opini' },
        author: { _type: 'reference', _ref: 'author-kh-ilham' },
        publishedAt: '2026-01-15T08:00:00Z',
        readingTime: 8,
        isFeatured: true,
        isPublished: true,
        tags: ['digital', 'pendidikan', 'tradisi'],
        content: [
            { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Bismillahirrahmanirrahim. Di penghujung tahun 2025, kita menyaksikan perubahan besar dalam lanskap pendidikan Islam di Indonesia. Pesantren-pesantren tradisional mulai membuka diri terhadap teknologi, namun dengan hati-hati agar tidak kehilangan marwah dan identitasnya.' }] },
            { _type: 'block', _key: 'b2', style: 'h2', children: [{ _type: 'span', _key: 's2', text: 'Digitalisasi Tanpa Westernisasi' }] },
            { _type: 'block', _key: 'b3', style: 'normal', children: [{ _type: 'span', _key: 's3', text: 'Di Al-Bisri, kami memandang teknologi sebagai alat, bukan tujuan. E-learning yang kami kembangkan bersama Isyraq Annur Media tetap mempertahankan metode sorogan dan bandongan dalam format digital.' }] },
            { _type: 'block', _key: 'b4', style: 'blockquote', children: [{ _type: 'span', _key: 's4', text: '"Kita harus menjadi tuan bagi teknologi, bukan budaknya." - KH. Muhammad Ilham' }] },
        ],
    },
    {
        _id: 'post-juara-mhq',
        _type: 'blogPost',
        title: 'Santri Al-Bisri Raih Juara 1 MHQ Nasional 2026',
        slug: { _type: 'slug', current: 'juara-mhq-nasional-2026' },
        excerpt: 'Ananda Fatih berhasil menyisihkan 300 peserta dari seluruh Indonesia dalam kategori Hafalan 30 Juz Beserta Tafsir.',
        category: { _type: 'reference', _ref: 'cat-prestasi' },
        author: { _type: 'reference', _ref: 'author-ustadzah-fatimah' },
        publishedAt: '2026-01-10T10:00:00Z',
        readingTime: 5,
        isFeatured: false,
        isPublished: true,
        tags: ['prestasi', 'hafidz', 'quran'],
        content: [
            { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Alhamdulillah, kabar gembira datang dari Musabaqah Hifdzil Quran (MHQ) Nasional 2026 yang diselenggarakan di Jakarta. Ananda Muhammad Fatih (17 tahun), santri binaan Al-Bisri, berhasil meraih Juara 1 kategori 30 Juz beserta Tafsir.' }] },
            { _type: 'block', _key: 'b2', style: 'h2', children: [{ _type: 'span', _key: 's2', text: 'Perjalanan Seorang Yatim' }] },
            { _type: 'block', _key: 'b3', style: 'normal', children: [{ _type: 'span', _key: 's3', text: 'Fatih adalah anak yatim yang bergabung dengan Al-Bisri sejak usia 10 tahun. Dalam 7 tahun, ia berhasil menghafal 30 juz Al-Quran beserta memahami tafsirnya melalui bimbingan intensif program Kader Ulama.' }] },
        ],
    },
    {
        _id: 'post-panen-raya',
        _type: 'blogPost',
        title: 'Panen Raya Padi Organik: Bukti Kemandirian Pangan Pesantren',
        slug: { _type: 'slug', current: 'panen-raya-padi-organik' },
        excerpt: 'Hasil panen dari sawah wakaf meningkat 20% berkat penerapan teknologi irigasi tetes yang dikembangkan santri.',
        category: { _type: 'reference', _ref: 'cat-laporan-wakaf' },
        author: { _type: 'reference', _ref: 'author-kh-ilham' },
        publishedAt: '2026-01-05T09:00:00Z',
        readingTime: 6,
        isFeatured: false,
        isPublished: true,
        tags: ['wakaf', 'pertanian', 'kemandirian'],
        content: [
            { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Awal tahun 2026 menjadi momen bersejarah bagi Program Wakaf Produktif Al-Bisri. Sawah wakaf seluas 5 hektar yang dikelola santri menghasilkan panen raya dengan peningkatan 20% dari musim sebelumnya.' }] },
            { _type: 'block', _key: 'b2', style: 'h2', children: [{ _type: 'span', _key: 's2', text: 'Inovasi Santri' }] },
            { _type: 'block', _key: 'b3', style: 'normal', children: [{ _type: 'span', _key: 's3', text: 'Peningkatan hasil panen ini berkat penerapan sistem irigasi tetes yang dikembangkan oleh tim santri jurusan Teknologi Pertanian. Sistem ini menghemat penggunaan air hingga 40%.' }] },
        ],
    },
    {
        _id: 'post-digital-library',
        _type: 'blogPost',
        title: 'Soft Launching Digital Library: Ribuan Kitab Kuning Kini Online',
        slug: { _type: 'slug', current: 'digital-library-launching' },
        excerpt: 'Akses ribuan kitab kuning digital kini tersedia untuk publik. Wujud nyata digitalisasi turats pesantren.',
        category: { _type: 'reference', _ref: 'cat-kegiatan' },
        author: { _type: 'reference', _ref: 'author-ustadzah-fatimah' },
        publishedAt: '2025-12-20T14:00:00Z',
        readingTime: 4,
        isFeatured: false,
        isPublished: true,
        tags: ['digital', 'kitab', 'library'],
        content: [
            { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Alhamdulillah, pada 20 Desember 2025, Al-Bisri secara resmi meluncurkan Digital Library yang berisi lebih dari 3.000 kitab kuning dalam format digital. Ini adalah hasil kerja sama dengan Isyraq Annur Media selama dua tahun.' }] },
            { _type: 'block', _key: 'b2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: 'Masyarakat umum kini dapat mengakses kitab-kitab klasik seperti Ihya Ulumiddin, Fathul Wahhab, hingga Tafsir Ibnu Katsir secara gratis melalui platform isyraqannur.com.' }] },
        ],
    },
];

seedAll().catch(console.error);

