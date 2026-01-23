import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'yamgwplz',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2024-01-01', // use current date (YYYY-MM-DD) to target the latest API version
});

// Helper function to fetch all blog posts
export async function getAllBlogPosts() {
  const query = `*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "author": author->name,
    "mainImage": mainImage.asset->url,
    "categories": categories[]->title
  }`;

  return await sanityClient.fetch(query);
}

// Helper function to fetch a single blog post by slug
export async function getBlogPostBySlug(slug: string) {
  const query = `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    "author": author->{name, bio, "image": image.asset->url},
    "mainImage": mainImage.asset->url,
    "categories": categories[]->title
  }`;

  return await sanityClient.fetch(query, { slug });
}

// Helper function to fetch a page by its slug (for Page Builder)
export async function getPageBySlug(slug: string) {
  const query = `*[_type == "page" && slug.current == $slug][0] {
    title,
    backgroundColor,
    sections[] {
      _type,
      _type == "hero" => {
        title,
        subtitle,
        ctaText,
        ctaLink,
        secondaryCtaText,
        secondaryCtaLink,
        layout,
        "backgroundImage": backgroundImage.asset->url,
        "heroImage": heroImage.asset->url
      },
      _type == "aboutSection" => {
        title,
        content,
        stats,
        "image": image.asset->url
      },
      _type == "impactFundSection" => {
        title,
        description,
        auditReportLink,
        allocationStats,
        scholarshipStats,
        umkmStats,
        "economicGraph": economicGraph.asset->url
      },
      _type == "partnershipsSection" => {
        title
      },
      _type == "testimonialsSection" => {
        title,
        subtitle
      }
    }
  }`;

  return await sanityClient.fetch(query, { slug: slug === '/' ? 'home' : slug });
}

// Helper function to fetch all testimonials
export async function getAllTestimonials() {
  const query = `*[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    name,
    role,
    quote,
    rating,
    "image": image.asset->url
  }`;

  return await sanityClient.fetch(query);
}

// Helper function to fetch all partners
export async function getAllPartners() {
  const query = `*[_type == "partner"] | order(order asc) {
    _id,
    name,
    "logo": logo.asset->url,
    website,
    type
  }`;

  return await sanityClient.fetch(query);
}
