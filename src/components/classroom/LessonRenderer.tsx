'use client';

import VideoPlayer from './VideoPlayer';
import InteractiveQuiz from './InteractiveQuiz';
import VocabularyBlock from './VocabularyBlock';
import Image from 'next/image';

// Types for Sanity block content
interface YoutubeBlock {
    _type: 'youtubeEmbed';
    url: string;
    title?: string;
    startAt?: number;
}

interface QuizBlockData {
    _type: 'quizBlock';
    question: string;
    answers: { text: string; isCorrect: boolean }[];
    explanation?: string;
    hint?: string;
}

interface VocabBlockData {
    _type: 'vocabularyBlock';
    title?: string;
    words: { arabic: string; transliteration?: string; meaning: string; audioUrl?: string }[];
}

interface ImageBlock {
    _type: 'image';
    asset: { _ref: string; url?: string };
    caption?: string;
}

interface TextBlock {
    _type: 'block';
    children: { text: string; marks?: string[] }[];
    style?: string;
    markDefs?: { _key: string; _type: string }[];
}

type ContentBlock = YoutubeBlock | QuizBlockData | VocabBlockData | ImageBlock | TextBlock;

interface LessonRendererProps {
    content: ContentBlock[];
    onQuizComplete?: (isCorrect: boolean) => void;
}

// Simple portable text renderer
function renderTextBlock(block: TextBlock) {
    const Tag = block.style === 'h2' ? 'h2' : block.style === 'h3' ? 'h3' : block.style === 'blockquote' ? 'blockquote' : 'p';

    const baseClass = {
        h2: 'text-2xl font-bold text-emerald-900 mt-8 mb-4',
        h3: 'text-xl font-bold text-emerald-800 mt-6 mb-3',
        blockquote: 'border-l-4 border-emerald-500 pl-4 italic text-stone-600 my-4',
        normal: 'text-stone-700 leading-relaxed mb-4'
    }[block.style || 'normal'];

    const renderChildren = () => {
        return block.children.map((child, i) => {
            let content: React.ReactNode = child.text;

            if (child.marks?.includes('strong')) {
                content = <strong key={i}>{content}</strong>;
            }
            if (child.marks?.includes('em')) {
                content = <em key={i}>{content}</em>;
            }
            if (child.marks?.includes('arabic')) {
                content = <span key={i} dir="rtl" className="font-serif text-lg text-emerald-900">{content}</span>;
            }

            return content;
        });
    };

    return <Tag className={baseClass}>{renderChildren()}</Tag>;
}

export function LessonRenderer({ content, onQuizComplete }: LessonRendererProps) {
    if (!content || content.length === 0) {
        return (
            <div className="p-8 bg-stone-50 rounded-2xl text-center text-stone-400">
                Materi belum tersedia
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {content.map((block, index) => {
                const key = `block-${index}`;

                switch (block._type) {
                    case 'youtubeEmbed':
                        return (
                            <div key={key} className="my-8">
                                <VideoPlayer
                                    url={block.url}
                                    title={block.title}
                                    startAt={block.startAt}
                                />
                            </div>
                        );

                    case 'quizBlock':
                        return (
                            <div key={key} className="my-8">
                                <InteractiveQuiz
                                    question={block.question}
                                    answers={block.answers}
                                    explanation={block.explanation}
                                    hint={block.hint}
                                    onComplete={onQuizComplete}
                                />
                            </div>
                        );

                    case 'vocabularyBlock':
                        return (
                            <div key={key} className="my-8">
                                <VocabularyBlock
                                    title={block.title}
                                    words={block.words}
                                />
                            </div>
                        );

                    case 'image':
                        return (
                            <figure key={key} className="my-8">
                                <div className="rounded-2xl overflow-hidden border border-stone-200">
                                    {block.asset?.url ? (
                                        <Image
                                            src={block.asset.url}
                                            alt={block.caption || 'Lesson Image'}
                                            width={800}
                                            height={450}
                                            className="w-full h-auto"
                                        />
                                    ) : (
                                        <div className="aspect-video bg-stone-100 flex items-center justify-center text-stone-400">
                                            Image not available
                                        </div>
                                    )}
                                </div>
                                {block.caption && (
                                    <figcaption className="text-center text-sm text-stone-500 mt-2 italic">
                                        {block.caption}
                                    </figcaption>
                                )}
                            </figure>
                        );

                    case 'block':
                        return <div key={key}>{renderTextBlock(block)}</div>;

                    default:
                        return null;
                }
            })}
        </div>
    );
}

export default LessonRenderer;
