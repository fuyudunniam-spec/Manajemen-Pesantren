import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'quizBlock',
    title: 'Tamrinat / Quiz Section',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Judul Seksi Kuis',
            type: 'string',
            initialValue: 'Uji Pemahaman'
        }),
        defineField({
            name: 'description',
            title: 'Deskripsi Kuis',
            type: 'text',
            rows: 2,
            initialValue: 'Pastikan Anda memahami poin kunci sebelum lanjut.'
        }),
        defineField({
            name: 'questions',
            title: 'Daftar Pertanyaan',
            type: 'array',
            of: [{
                type: 'object',
                name: 'quizQuestion',
                title: 'Pertanyaan',
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
                        type: 'string'
                    })
                ],
                preview: {
                    select: {
                        question: 'question'
                    },
                    prepare({ question }) {
                        return {
                            title: question,
                            media: () => '❓'
                        }
                    }
                }
            }],
            validation: (Rule) => Rule.min(1)
        })
    ],
    preview: {
        select: {
            title: 'title',
            questions: 'questions'
        },
        prepare({ title, questions }) {
            return {
                title: title || 'Quiz Section',
                subtitle: `${questions?.length || 0} pertanyaan`,
                media: () => '📝'
            }
        }
    }
})
