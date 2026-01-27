/**
 * Isyraq Academy - Sanity Schema Index
 * 
 * Skema yang tersedia:
 * 
 * 📄 Singleton Documents:
 *   - landingPage: Halaman utama Academy
 *   - siteSettings: Pengaturan global website
 * 
 * 📚 Academy Content:
 *   - course: Kursus/Program
 *   - lesson: Materi pelajaran
 *   - instructor: Pengajar/Mudaris
 *   - category: Kategori kursus
 * 
 * 📝 Blog System:
 *   - blogPost: Artikel blog
 *   - blogCategory: Kategori blog
 *   - author: Penulis artikel
 * 
 * 🧩 Block Types (untuk Lesson Content):
 *   - youtubeEmbed: Embed video YouTube
 *   - quizBlock: Kuis interaktif
 *   - vocabularyBlock: Daftar mufradat
 */

// Site Configuration
import siteSettings from './siteSettings';
import landingPage from './landingPage';

// Academy Content
import course from './course';
import lesson from './lesson';
import instructor from './instructor';
import category from './category';

// Blog System
import author from './author';
import blogCategory from './blogCategory';
import blogPost from './blogPost';

// Block Types (Object Schemas)
import youtubeEmbed from './objects/youtubeEmbed';
import quizBlock from './objects/quizBlock';
import vocabularyBlock from './objects/vocabularyBlock';
import interactiveArabicBlock from './objects/interactiveArabicBlock';

export const schemaTypes = [
    // ==========================================
    // Block Types (must be registered first)
    // ==========================================
    youtubeEmbed,
    quizBlock,
    vocabularyBlock,
    interactiveArabicBlock,

    // ==========================================
    // Singleton Documents
    // ==========================================
    landingPage,
    siteSettings,

    // ==========================================
    // Academy Content
    // ==========================================
    course,
    lesson,
    instructor,
    category,

    // ==========================================
    // Blog System
    // ==========================================
    author,
    blogCategory,
    blogPost,
];
