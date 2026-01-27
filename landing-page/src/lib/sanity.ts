import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Sanity client configuration
export const client = createClient({
    projectId: 'yamgwplz',
    dataset: 'production',
    useCdn: false, // Disabled for development to get fresh data
    apiVersion: '2024-01-23',
});

// Image URL builder helper
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
    return builder.image(source);
}

// GROQ Queries
export const queries = {
    // Site Settings
    siteSettings: `*[_type == "siteSettings"][0] {
        title,
        logo,
        mainNavigation[] {
            title,
            link,
            isDropdown,
            isButton,
            dropdownItems[] { title, link }
        },
        contactInfo { address, email, phone },
        socialLinks[] { platform, url }
    }`,

    // Blog Posts (list)
    blogPosts: `*[_type == "blogPost" && isPublished == true] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        featuredImage,
        publishedAt,
        readingTime,
        isFeatured,
        category->{ name, slug, color },
        author->{ name, avatar }
    }`,

    // Featured Blog Post
    featuredPost: `*[_type == "blogPost" && isPublished == true && isFeatured == true][0] {
        _id,
        title,
        slug,
        excerpt,
        featuredImage,
        publishedAt,
        readingTime,
        category->{ name, slug, color },
        author->{ name, avatar, role }
    }`,

    // Single Blog Post
    blogPost: (slug: string) => `*[_type == "blogPost" && slug.current == "${slug}"][0] {
        _id,
        title,
        slug,
        excerpt,
        featuredImage,
        publishedAt,
        readingTime,
        content,
        tags,
        category->{ name, slug, color },
        author->{ name, slug, avatar, role, bio, socialLinks },
        relatedPosts[]->{ _id, title, slug, featuredImage, publishedAt, category->{ name } }
    }`,

    // Blog Categories
    blogCategories: `*[_type == "blogCategory"] | order(name asc) {
        _id,
        name,
        slug,
        description,
        color,
        icon
    }`,

    // Landing Page (Academy) - Clean Schema
    landingPage: `*[_type == "landingPage"][0] {
        hero {
            subtitle,
            title,
            description,
            ctaPrimary,
            ctaSecondary,
            heroImage
        },
        stats[] {
            value,
            label
        },
        featuredCourses {
            title,
            subtitle,
            courses[]-> {
                _id,
                title,
                slug,
                tagline,
                thumbnail,
                level,
                duration,
                category->{ name, slug },
                instructor->{ name },
                price,
                discountPrice
            },
            ctaText,
            ctaLink
        },
        whyUs[] {
            title,
            description,
            icon
        },
        instructors[]-> {
            _id,
            name,
            role,
            photo,
            bio,
            expertises
        },
        testimonials[] {
            quote,
            name,
            role,
            avatar
        },
        ctaSection {
            title,
            description,
            primaryCta,
            secondaryCta
        },
        seo {
            metaTitle,
            metaDescription,
            ogImage
        }
    }`,

    // Academy Curricula
    curricula: `*[_type == "curriculum"] | order(name asc) {
        _id,
        name,
        slug,
        description,
        level
    }`,

    // Academy Class
    academyClass: (slug: string) => `*[_type == "academyClass" && slug.current == "${slug}"][0] {
        _id,
        title,
        slug,
        level,
        order,
        duration,
        qiraahContent { arabicText, translation, audioUrl },
        qawaidContent { videoUrl, explanation },
        tamrinatContent[] { question, questionType, options, correctAnswer, explanation },
        curriculum->{ name, slug }
    }`,

    // Academy Classes by Curriculum
    academyClassesByCurriculum: (curriculumId: string) => `*[_type == "academyClass" && curriculum._ref == "${curriculumId}"] | order(order asc) {
        _id,
        title,
        slug,
        level,
        order,
        duration,
        isPublished
    }`,
};

// Fetch helper
export async function sanityFetch<T>(query: string): Promise<T> {
    return client.fetch<T>(query);
}
