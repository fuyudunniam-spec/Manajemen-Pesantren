import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'vocabularyBlock',
    title: 'Mufradat (Vocabulary)',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Section Title',
            type: 'string',
            initialValue: 'Kosa Kata Baru'
        }),
        defineField({
            name: 'words',
            title: 'Daftar Mufradat',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    defineField({
                        name: 'arabic',
                        title: 'Kata Arab',
                        type: 'string',
                        validation: (Rule) => Rule.required()
                    }),
                    defineField({
                        name: 'transliteration',
                        title: 'Transliterasi',
                        type: 'string'
                    }),
                    defineField({
                        name: 'meaning',
                        title: 'Arti',
                        type: 'string',
                        validation: (Rule) => Rule.required()
                    }),
                    defineField({
                        name: 'audioUrl',
                        title: 'Audio Pelafalan (URL)',
                        type: 'url'
                    })
                ],
                preview: {
                    select: {
                        arabic: 'arabic',
                        meaning: 'meaning'
                    },
                    prepare({ arabic, meaning }) {
                        return {
                            title: arabic,
                            subtitle: meaning
                        }
                    }
                }
            }]
        })
    ],
    preview: {
        select: {
            title: 'title',
            words: 'words'
        },
        prepare({ title, words }) {
            return {
                title: title || 'Mufradat',
                subtitle: `${words?.length || 0} kata`,
                media: () => '📚'
            }
        }
    }
})
