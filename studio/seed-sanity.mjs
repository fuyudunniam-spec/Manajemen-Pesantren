/**
 * Sanity Content Seeding Script - COMPLETE MIGRATION
 * 
 * This script extracts ALL hardcoded data from Astro pages and seeds them into Sanity CMS.
 * Covers: Landing Page, About Page, Donation Page, PSB Config
 * 
 * Usage:
 * 1. Set environment variable: SANITY_TOKEN=your_token
 * 2. Run: node seed-sanity.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'yamgwplz',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_TOKEN,
    useCdn: false
})

// ============================================
// 1. LANDING PAGE DATA
// ============================================
const landingPageData = {
    _id: 'landingPage',
    _type: 'landingPage',

    // HERO SECTION
    hero: {
        badge: '100% Lulusan Dhuafa Masuk PTN/Timur Tengah',
        title: [
            {
                _type: 'block',
                _key: 'hero-title-1',
                style: 'normal',
                markDefs: [],
                children: [
                    {
                        _type: 'span',
                        _key: 'hero-title-span-1',
                        text: 'Memuliakan Yatim, Membangun Peradaban',
                        marks: []
                    }
                ]
            }
        ],
        description: 'Kami tidak sekadar memberi santunan, tapi memberikan pendidikan terbaik agar anak yatim & dhuafa tumbuh menjadi pemimpin yang mandiri dan bermartabat.',
        ctaPrimary: { text: 'Investasi Wakaf', link: '/donasi' },
        ctaSecondary: { text: 'Daftar Reguler', link: '/psb' },
        impactBadge: { label: 'Amanah Umat', value: '1.250 Santri' }
    },

    // ABOUT SECTION
    about: {
        badge: 'Filosofi Kemandirian',
        title: 'Gotong Royong',
        subtitle: 'Pendidikan Umat',
        paragraphs: [
            'Al-Bisri menerapkan sistem Subsidi Silang (Cross-Subsidy). Kami membuka layanan asrama dan pendidikan berbayar bagi masyarakat umum.'
        ],
        highlightedParagraph: 'Keuntungan dari program reguler inilah yang menopang operasional dan menjamin pendidikan GRATIS berkualitas tinggi bagi ratusan santri yatim dan dhuafa.',
        ctaText: 'Dukung Gerakan Ini',
        ctaLink: '/donasi',
        floatingBadge: { text: 'Mandiri', subtext: 'Visi Ekonomi Pesantren' }
    },

    // TIMELINE
    timeline: {
        badge: 'Milestones',
        title: 'Jejak Langkah Pengabdian',
        milestones: [
            { _key: 'ms1', year: '1998', title: 'Perintisan', description: 'Pendirian Panti Asuhan & Pesantren Yatim pertama.' },
            { _key: 'ms2', year: '2010', title: 'Legalitas Madin', description: 'Izin operasional resmi Madrasah Diniyah & Program Asrama.' },
            { _key: 'ms3', year: '2024', title: 'Ekosistem Baru', description: 'Peluncuran unit usaha mandiri & Pesantren Mahasiswa.' },
            { _key: 'ms4', year: '2026', title: 'Kemandirian', description: 'Target operasional mandiri penuh & Universitas.' }
        ]
    },

    // PARTNERSHIPS
    partnerships: { headline: 'Dipercaya Oleh Lembaga & Korporasi' },

    // E-LEARNING
    elearning: {
        badge: 'Didukung Isyraq Annur Media',
        title: 'Akses Kurikulum',
        titleHighlight: 'Bahasa Arab Digital',
        description: 'Kami membuka akses materi pembelajaran Bahasa Arab standar Timur Tengah secara digital. Dikembangkan oleh tim ahli Pesantren Mahasiswa An-Nur.',
        ctaText: 'Akses Gratis',
        ctaLink: '/akademi'
    },

    // IMPACT FUND
    impactFund: {
        badge: 'Transparansi Dana Wakaf',
        title: 'Laporan Penyaluran',
        description: 'Melihat langsung bagaimana donasi Anda menjadi "darah" bagi pendidikan anak yatim.',
        transparencyLink: '/transparansi',
        chartData: { labels: ['Beasiswa Yatim', 'Wakaf Produktif', 'Infrastruktur'], data: [50, 30, 20] },
        productiveAssets: 'Rp 12.5 M',
        programs: [
            { _key: 'prog1', icon: 'graduation-cap', title: '150 Kader', description: 'Santri Yatim Takhassus Mukim.', progress: 85 },
            { _key: 'prog2', icon: 'sprout', title: '20 Hektar', description: 'Lahan wakaf produktif untuk kemandirian.', progress: 60 },
            { _key: 'prog3', icon: 'building', title: 'Pembangunan Asrama Putra', description: 'Progres fisik mencapai 75%', progress: 75 }
        ]
    },

    // TESTIMONIALS
    testimonials: {
        badge: 'Suara Hati',
        title: 'Kisah Penerima Manfaat',
        testimonialsList: [
            { _key: 'testi1', quote: 'Al-Bisri memberi saya rumah ketika saya kehilangan segalanya. Di sini saya belajar bahwa yatim bukan alasan untuk menyerah.', name: 'Ahmad Fikri', role: 'Alumni 2018' },
            { _key: 'testi2', quote: 'Sistem transparansi wakafnya luar biasa. Saya mendapat laporan berkala tentang perkembangan pohon mangga wakaf saya.', name: 'Hj. Siti Aminah', role: 'Wakif Tetap' },
            { _key: 'testi3', quote: 'Lulus dari sini saya punya hafalan 30 Juz dan skill desain grafis. Sekarang saya merintis usaha percetakan sendiri.', name: 'Rudi Santoso', role: 'Santripreneur' }
        ]
    },

    // LATEST NEWS
    latestNews: {
        title: 'Kabar Pesantren',
        ctaText: 'Lihat Semua',
        ctaLink: '/berita',
        newsItems: [
            { _key: 'news1', category: 'Prestasi', title: 'Santri Al-Bisri Juara 1 MHQ Nasional', excerpt: 'Ananda Fatih berhasil menyisihkan 300 peserta dari seluruh Indonesia...', publishedAt: '2024-10-20', link: '/berita/example-post' },
            { _key: 'news2', category: 'Wakaf Produktif', title: 'Panen Raya Padi Organik', excerpt: 'Hasil panen meningkat 20% berkat penerapan teknologi irigasi tetes...', publishedAt: '2024-10-18', link: '/berita/example-post' },
            { _key: 'news3', category: 'Kunjungan', title: 'Studi Banding Kemenag', excerpt: 'Kunjungan untuk meninjau kurikulum kewirausahaan santri...', publishedAt: '2024-10-15', link: '/berita/example-post' }
        ]
    },

    // DONATION CTA
    donationCTA: {
        title: 'Investasi Akhirat',
        subtitle: 'Pilih jalur kontribusi terbaik Anda.',
        zakatCalculator: { title: 'Hitung Zakat Maal', inputLabel: 'Total Aset (Setahun)', buttonText: 'Tunaikan Zakat' },
        wakafPackages: {
            title: 'Paket Wakaf Tunai',
            packages: [
                { _key: 'wakaf1', name: 'Wakaf Semen & Bata', description: 'Pembangunan Asrama', amount: 100000 },
                { _key: 'wakaf2', name: 'Wakaf Benih Padi', description: 'Pertanian Produktif', amount: 500000 },
                { _key: 'wakaf3', name: 'Wakaf Alat Belajar', description: 'Kitab & Komputer', amount: 1000000 }
            ]
        }
    },

    // SEO
    seo: {
        metaTitle: 'Al-Bisri | Royal Education Foundation',
        metaDescription: 'Memuliakan Yatim, Membangun Peradaban. Pesantren dengan 100% lulusan dhuafa masuk PTN/Timur Tengah.'
    }
}

// ============================================
// 2. ABOUT PAGE DATA (tentang-kami.astro)
// ============================================
const aboutPageData = {
    _id: 'aboutPage',
    _type: 'aboutPage',

    // HERO
    hero: {
        title: 'Penjaga Tradisi, Pembangun Masa Depan',
        subtitle: 'Al-Bisri adalah perwujudan dari cita-cita luhur untuk mengangkat derajat umat melalui pendidikan yang berkarakter, mandiri, dan berwawasan global.'
    },

    // HISTORY
    history: {
        title: 'Akar Sejarah',
        introduction: 'Bermula dari sebuah rumah wakaf sederhana di pinggiran kota, KH. Bisri Mustofa (Alm) memulai majelis taklim kecil dengan lima orang santri yatim. Niat beliau sederhana: memberikan hak pendidikan bagi mereka yang kurang beruntung.\n\nSeiring berjalannya waktu, amanah umat semakin besar. Pada tahun 2010, Yayasan Al-Bisri resmi bertransformasi menjadi lembaga pendidikan terpadu yang memadukan kurikulum salaf (kitab kuning) dengan sistem sekolah formal modern.\n\nKini, di bawah naungan Isyraq Annur Media dan dukungan Pesantren Mahasiswa An-Nur, Al-Bisri terus berinovasi mengembangkan kurikulum riset berbasis turats untuk menjawab tantangan zaman.',
        timeline: [
            { _key: 'hist1', year: '1998', event: 'Pendirian', description: 'Pendirian Panti Asuhan & Pesantren Yatim pertama.' },
            { _key: 'hist2', year: '2010', event: 'Transformasi', description: 'Yayasan Al-Bisri bertransformasi menjadi lembaga pendidikan terpadu.' },
            { _key: 'hist3', year: '2024', event: 'Ekosistem Baru', description: 'Peluncuran unit usaha mandiri & Pesantren Mahasiswa.' }
        ]
    },

    // VISION & MISSION
    visionMission: {
        sectionTitle: 'Visi & Misi',
        vision: {
            title: 'Visi Utama',
            description: 'Menjadi pusat kaderisasi ulama dan intelektual muslim yang mandiri, berakhlak mulia, dan berwawasan global.'
        },
        mission: {
            title: 'Misi Strategis',
            items: [
                'Menyelenggarakan pendidikan Islam yang memadukan tradisi klasik dan sains modern.',
                'Mengembangkan unit usaha produktif untuk kemandirian ekonomi pesantren.',
                'Membekali santri dengan keterampilan teknokrat dan kepemimpinan.',
                'Menyebarkan dakwah Islam yang rahmatan lil \'alamin melalui media digital.'
            ]
        },
        values: [
            { _key: 'val1', icon: 'eye', title: 'Visi Jelas', description: 'Tujuan yang terarah dan terukur menuju kemandirian umat.' },
            { _key: 'val2', icon: 'target', title: 'Misi Terstruktur', description: 'Langkah strategis yang terencana dalam pendidikan dan dakwah.' },
            { _key: 'val3', icon: 'heart', title: 'Nilai Luhur', description: 'Berakhlak mulia dengan semangat pengabdian kepada umat.' }
        ]
    },

    // LEADERSHIP
    leadership: {
        sectionTitle: 'Dewan Pengasuh',
        description: 'Struktur kepemimpinan Yayasan Al-Bisri yang berpengalaman dan berintegritas.',
        members: [
            { _key: 'lead1', name: 'KH. Ahmad Bisri, Lc. MA', position: 'Pengasuh Pesantren', bio: 'Alumni Universitas Al-Azhar Kairo dengan spesialisasi Fiqih Muamalah.' },
            { _key: 'lead2', name: 'Dr. H. Muhammad Ilham', position: 'Direktur Pendidikan', bio: 'Doktor Manajemen Pendidikan Islam, fokus pada pengembangan kurikulum riset.' },
            { _key: 'lead3', name: 'H. Yusuf Mansur, SE', position: 'Ketua Yayasan', bio: 'Profesional di bidang keuangan syariah dan pengembangan wakaf produktif.' }
        ]
    },

    // FACILITIES
    facilities: {
        sectionTitle: 'Fasilitas Penunjang',
        description: 'Lingkungan yang kondusif untuk tumbuh kembang santri.',
        facilityList: [
            { _key: 'fac1', name: 'Asrama Putra/Putri', description: 'Kapasitas 500 Santri', features: ['Kamar ber-AC', 'Musholla', 'Kantin'] },
            { _key: 'fac2', name: 'Perpustakaan Digital', description: 'Akses Kitab & Jurnal', features: ['5000+ Kitab Digital', 'Akses Jurnal International', 'Ruang Baca Nyaman'] },
            { _key: 'fac3', name: 'Lab Komputer', description: 'Pusat Riset & Multimedia', features: ['40 PC Modern', 'Internet Cepat', 'Studio Podcast'] },
            { _key: 'fac4', name: 'Greenhouse Wakaf', description: 'Laboratorium Alam', features: ['Pertanian Organik', 'Hidroponik', 'Peternakan Kecil'] }
        ]
    },

    // SEO
    seo: {
        metaTitle: 'Profil & Sejarah | Al-Bisri Royal Education',
        metaDescription: 'Penjaga Tradisi, Pembangun Masa Depan. Mengenal lebih dekat Yayasan Al-Bisri, sejarah, visi misi, dan kepemimpinan.'
    }
}

// ============================================
// 3. DONATION PAGE DATA (donasi.astro)
// ============================================
const donationPageData = {
    _id: 'donationPage',
    _type: 'donationPage',

    // HERO
    hero: {
        title: 'Investasi Intelektual',
        subtitle: 'Filantropi Pendidikan',
        description: 'Berbeda dengan donasi konvensional, dana Anda di sini digunakan untuk mencetak ulama dan mengembangkan kurikulum Islam yang relevan dengan zaman.'
    },

    // WHATSAPP
    whatsappNumber: '6281234567890',

    // PAYMENT METHODS
    paymentMethods: [
        { _key: 'pay1', name: 'Bank Syariah Indonesia (BSI)', accountNumber: '7123-4567-89', accountName: 'Yayasan Al-Bisri', instructions: 'Transfer ke rekening BSI di atas, lalu upload bukti transfer di form donasi.' }
    ],

    // PREDEFINED AMOUNTS
    predefinedAmounts: [50000, 100000, 250000, 500000, 1000000, 2500000],

    // DONATION UPDATES
    donationUpdates: {
        title: 'Update Terkini',
        updates: [
            { _key: 'upd1', date: '2024-10-15T10:00:00Z', title: 'Pembangunan Asrama Putra Tahap 2', description: 'Progres pembangunan mencapai 75%. Terima kasih para wakif!' },
            { _key: 'upd2', date: '2024-10-10T10:00:00Z', title: 'Panen Raya Wakaf Padi', description: 'Hasil panen 2 ton padi organik dari lahan wakaf produktif.' }
        ]
    },

    // TOP DONORS
    topDonors: {
        title: 'Donatur Utama',
        showTopDonors: true,
        displayCount: 10
    },

    // SEO
    seo: {
        metaTitle: 'Investasi Peradaban | Al-Bisri Royal Education',
        metaDescription: 'Berkontribusi untuk mencetak generasi ulama dan teknokrat muslim melalui program wakaf dan beasiswa.'
    }
}

// ============================================
// 4. PSB CONFIG DATA (psb.astro) - INFO PAGE ONLY
// ============================================
const psbConfigData = {
    _id: 'psbConfig',
    _type: 'psbConfig',

    // REGISTRATION STATUS
    registrationStatus: {
        isOpen: true,
        openDate: '2026-01-01T00:00:00Z',
        closeDate: '2026-06-30T23:59:59Z',
        closedMessage: 'Pendaftaran Santri Baru Tahun Ajaran 2026/2027 telah ditutup. Silakan pantau informasi pendaftaran gelombang berikutnya.'
    },

    // EDUCATION LEVELS (JENJANG) with FEE DATA from psb.astro
    educationLevels: [
        {
            _key: 'level1',
            name: 'TPQ (Taman Pendidikan Quran)',
            code: 'tpq',
            description: 'Program pendidikan Al-Quran untuk anak usia TK-SD.',
            fee: 150000,      // Pendaftaran & Buku
            monthlyFee: 50000 // Infaq Bulanan
        },
        {
            _key: 'level2',
            name: 'Madrasah Diniyah',
            code: 'madin',
            description: 'Program pendidikan Islam klasik untuk anak usia SD-SMP.',
            fee: 350000,       // Pendaftaran & Seragam
            monthlyFee: 100000 // SPP Bulanan
        },
        {
            _key: 'level3',
            name: 'Pesantren Mahasiswa',
            code: 'mahasiswa',
            description: 'Program asrama dan kajian intensif untuk mahasiswa/dewasa.',
            fee: 1500000,      // Uang Pangkal (Asrama)
            monthlyFee: 650000 // SPP Bulanan (Makan+Fasilitas)
        }
    ],

    // ENTRY PATHS (JALUR MASUK)
    entryPaths: [
        {
            _key: 'path1',
            name: 'Jalur Reguler',
            code: 'reguler',
            description: 'Untuk calon santri umum (TPQ, Madin, Mahasiswa). Biaya pendidikan digunakan untuk operasional dan subsidi silang.',
            requirements: [
                'Mengisi formulir pendaftaran online',
                'Upload Kartu Keluarga (KK)',
                'Upload Bukti Transfer Pendaftaran'
            ],
            discountPercentage: 0
        },
        {
            _key: 'path2',
            name: 'Jalur Beasiswa Kader',
            code: 'beasiswa',
            description: 'Beasiswa penuh (Full Funded) untuk Yatim & Dhuafa berprestasi. Wajib lolos seleksi berkas.',
            requirements: [
                'Melampirkan Surat Keterangan Tidak Mampu (SKTM) dari Kelurahan',
                'Melampirkan Surat Kematian Ayah (Untuk Yatim)',
                'Bersedia mengikuti masa pengabdian (khidmah) setelah lulus'
            ],
            discountPercentage: 100
        }
    ],

    // REQUIRED DOCUMENTS
    requiredDocuments: [
        { _key: 'doc1', name: 'Kartu Keluarga (KK)', description: 'Scan/foto jelas kartu keluarga.', isRequired: true, allowedFormats: ['PDF', 'JPG', 'PNG'], maxFileSize: 2 },
        { _key: 'doc2', name: 'Bukti Transfer Pendaftaran', description: 'Screenshot atau foto bukti transfer ke rekening BSI.', isRequired: true, allowedFormats: ['JPG', 'PNG'], maxFileSize: 2 },
        { _key: 'doc3', name: 'SKTM (Jalur Beasiswa)', description: 'Surat Keterangan Tidak Mampu dari Kelurahan.', isRequired: false, allowedFormats: ['PDF', 'JPG', 'PNG'], maxFileSize: 2 },
        { _key: 'doc4', name: 'Surat Kematian Ayah (Jalur Beasiswa Yatim)', description: 'Scan surat kematian untuk calon santri yatim.', isRequired: false, allowedFormats: ['PDF', 'JPG', 'PNG'], maxFileSize: 2 }
    ],

    // SELECTION STEPS (ALUR PENDAFTARAN)
    selectionSteps: [
        { _key: 'step1', stepNumber: 1, name: 'Pilih Jalur & Jenjang', description: 'Pilih jalur masuk (Reguler/Beasiswa) dan jenjang pendidikan yang sesuai.' },
        { _key: 'step2', stepNumber: 2, name: 'Isi Data Diri', description: 'Lengkapi data santri dan wali (nama, NISN/NIK, nomor WA wali).' },
        { _key: 'step3', stepNumber: 3, name: 'Upload Berkas', description: 'Upload berkas yang diperlukan sesuai jalur yang dipilih.' },
        { _key: 'step4', stepNumber: 4, name: 'Verifikasi Admin', description: 'Admin akan memverifikasi pendaftaran dalam 1x24 jam.' },
        { _key: 'step5', stepNumber: 5, name: 'Konfirmasi via WhatsApp', description: 'Anda akan dihubungi via WhatsApp untuk tahap selanjutnya.' }
    ],

    // CONTACT INFO
    contactInfo: {
        whatsappNumber: '6281234567890',
        email: 'psb@albisri.or.id',
        phone: '(021) 123-4567',
        address: 'Jl. Pesantren No. 1, Kecamatan Contoh, Kabupaten Contoh, Jawa Tengah 12345'
    }
}


// ============================================
// SEED FUNCTION
// ============================================
async function seedSanity() {
    console.log('🌱 Starting Sanity content seeding...\n')

    if (!process.env.SANITY_TOKEN) {
        console.error('❌ Error: SANITY_TOKEN environment variable is required')
        console.log('\nTo run this script:')
        console.log('   $env:SANITY_TOKEN="your_token"; node seed-sanity.mjs')
        process.exit(1)
    }

    try {
        // Seed Landing Page
        console.log('📄 Seeding Landing Page...')
        const landingResult = await client.createOrReplace(landingPageData)
        console.log(`   ✅ Landing Page created with ID: ${landingResult._id}`)

        // Seed About Page
        console.log('📄 Seeding About Page...')
        const aboutResult = await client.createOrReplace(aboutPageData)
        console.log(`   ✅ About Page created with ID: ${aboutResult._id}`)

        // Seed Donation Page
        console.log('📄 Seeding Donation Page...')
        const donationResult = await client.createOrReplace(donationPageData)
        console.log(`   ✅ Donation Page created with ID: ${donationResult._id}`)

        // Seed PSB Config
        console.log('📄 Seeding PSB Config...')
        const psbResult = await client.createOrReplace(psbConfigData)
        console.log(`   ✅ PSB Config created with ID: ${psbResult._id}`)

        console.log('\n🎉 All content seeded successfully!')
        console.log('\nOpen Sanity Studio to verify:')
        console.log('   http://localhost:3333')
        console.log('\nSeeded documents:')
        console.log('   - Landing Page (landingPage)')
        console.log('   - About Page (aboutPage)')
        console.log('   - Donation Page (donationPage)')
        console.log('   - PSB Config (psbConfig)')

    } catch (error) {
        console.error('❌ Seeding failed:', error.message)

        if (error.message.includes('Unauthorized')) {
            console.log('\n💡 Your token might not have write permissions.')
            console.log('   Make sure the token has "Editor" or higher permissions.')
        }

        if (error.response) {
            console.log('\nDetails:', JSON.stringify(error.response.body, null, 2))
        }

        process.exit(1)
    }
}

// Run the seeding
seedSanity()
