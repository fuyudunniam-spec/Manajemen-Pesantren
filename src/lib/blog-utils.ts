/**
 * Generate URL-friendly slug from text
 * @param text - The text to convert to a slug
 * @returns URL-friendly slug string
 */
export function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}
