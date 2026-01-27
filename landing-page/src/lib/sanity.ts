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

    // Academy Courses (list)
    courses: `*[_type == "course"] | order(title asc) {
        _id,
        title,
        "slug": slug.current,
        tagline,
        thumbnail,
        price,
        discountPrice,
        category->{ title, "slug": slug.current },
        instructor->{ name },
        "duration": "120m" // Placeholder or add to schema if needed
    }`,

    // Course Categories (For Filter)
    categories: `*[_type == "category"] | order(title asc) {
        _id,
        title,
        "slug": slug.current
    }`,

    // Single Course Detail
    courseDetail: (slug: string) => `*[_type == "course" && slug.current == "${slug}"][0] {
        _id,
        title,
        "slug": slug.current,
        tagline,
        description,
        thumbnail,
        price,
        discountPrice,
        previewVideoUrl,
        benefits,
        category->{ title, "slug": slug.current },
        instructor->{ name, photo, bio },
        modules[] {
            title,
            lessons[]-> {
                _id,
                title,
                "slug": slug.current,
                duration,
                order,
                isFreePreview
            }
        }
    }`,

    // Lesson Detail
    lessonDetail: (lessonSlug: string) => `*[_type == "lesson" && slug.current == "${lessonSlug}"][0] {
        _id,
        title,
        "slug": slug.current,
        content[] {
            ...,
            _type == "image" => {
                ...,
                asset->
            },
            _type == "interactiveArabicBlock" => {
                ...,
                audio {
                    asset->
                }
            }
        },
        resources,
        isFreePreview
    }`,

};

// Fetch helper
export async function sanityFetch<T>(query: string): Promise<T> {
    return client.fetch<T>(query);
}
