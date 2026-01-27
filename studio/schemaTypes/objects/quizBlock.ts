import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'quizBlock',
    title: 'Tamrinat / Quiz',
    type: 'object',
    fields: [
        defineField({
            name: 'question',
            title: 'Pertanyaan',
            type: 'string',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'answers',
            title: 'Pilihan Jawaban',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    defineField({
                        name: 'text',
                        title: 'Teks Jawaban',
                        type: 'string',
                        validation: (Rule) => Rule.required()
                    }),
                    defineField({
                        name: 'isCorrect',
                        title: 'Jawaban Benar?',
                        type: 'boolean',
                        initialValue: false
                    })
                ],
                preview: {
                    select: {
                        text: 'text',
                        isCorrect: 'isCorrect'
                    },
                    prepare({ text, isCorrect }) {
                        return {
                            title: text,
                            subtitle: isCorrect ? '✅ Benar' : '❌ Salah'
                        }
                    }
                }
            }],
            validation: (Rule) => Rule.min(2).max(6)
        }),
        defineField({
            name: 'explanation',
            title: 'Penjelasan Jawaban',
            type: 'text',
            rows: 3,
            description: 'Ditampilkan setelah user menjawab'
        }),
        defineField({
            name: 'hint',
            title: 'Petunjuk (Opsional)',
            type: 'string',
            description: 'Clue untuk membantu siswa'
        })
    ],
    preview: {
        select: {
            question: 'question'
        },
        prepare({ question }) {
            return {
                title: question || 'Quiz Question',
                subtitle: 'Tamrinat Interaktif',
                media: () => '❓'
            }
        }
    }
})
