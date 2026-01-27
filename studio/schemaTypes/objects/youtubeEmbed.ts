import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'youtubeEmbed',
    title: 'YouTube Video',
    type: 'object',
    fields: [
        defineField({
            name: 'url',
            title: 'YouTube URL',
            type: 'url',
            description: 'Paste full YouTube URL (e.g., https://www.youtube.com/watch?v=...)',
            validation: (Rule) => Rule.required().uri({
                scheme: ['http', 'https']
            })
        }),
        defineField({
            name: 'title',
            title: 'Video Title (Optional)',
            type: 'string',
            description: 'Custom title for accessibility'
        }),
        defineField({
            name: 'startAt',
            title: 'Start At (seconds)',
            type: 'number',
            description: 'Optional: Start video at specific time'
        })
    ],
    preview: {
        select: {
            url: 'url',
            title: 'title'
        },
        prepare({ url, title }) {
            // Extract video ID from YouTube URL
            const videoId = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)?.[1]
            return {
                title: title || 'YouTube Video',
                subtitle: videoId ? `ID: ${videoId}` : url,
                media: () => '▶️'
            }
        }
    }
})
