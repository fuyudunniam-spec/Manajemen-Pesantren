import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'interactiveArabicBlock',
    title: 'Interactive Arabic Text',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Judul / Konteks (Opsional)',
            type: 'string',
            description: 'Misal: "Percakapan Pembuka" atau "Ayat Pilihan"'
        }),
        defineField({
            name: 'arabicWithHarakat',
            title: 'Teks Arab (Berharakat)',
            type: 'text',
            rows: 4,
            validation: Rule => Rule.required().error('Teks Arab berharakat wajib diisi untuk mode belajar.')
        }),
        defineField({
            name: 'arabicWithoutHarakat',
            title: 'Teks Arab (Gundul/Tanpa Harakat)',
            type: 'text',
            rows: 4,
            description: 'Isi ini jika ingin menyediakan mode baca kitab gundul. Jika kosong, sistem akan mencoba membuang harakat dari teks utama (mungkin tidak sempurna).'
        }),
        defineField({
            name: 'translation',
            title: 'Terjemahan Bahasa Indonesia',
            type: 'text',
            rows: 3
        }),
        defineField({
            name: 'englishTranslation',
            title: 'English Translation (Optional)',
            type: 'text',
            rows: 3
        }),
        defineField({
            name: 'audio',
            title: 'Audio Narasi',
            type: 'file',
            options: {
                accept: 'audio/*'
            }
        })
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'arabicWithHarakat'
        },
        prepare({ title, subtitle }) {
            return {
                title: title || 'Arabic Text Block',
                subtitle: subtitle,
                media: () => '📖'
            }
        }
    }
})
