import React from 'react';
import { PortableText } from '@portabletext/react';
import { useLessonSettings } from '../store/lessonStore';

interface SmartPortableTextProps {
    value: any;
}

const stripHarakat = (text: string) => {
    return text.replace(/[\u064B-\u065F\u0670]/g, "");
};

export default function SmartPortableText({ value }: SmartPortableTextProps) {
    const { showHarakat, fontSize } = useLessonSettings();

    // Map font sizes to tailwind classes
    const sizeClasses = {
        1: 'prose-sm',
        2: 'prose-lg',
        3: 'prose-xl'
    };

    const components = {
        types: {
            block: ({ children, value }: any) => {
                const isRtl = value.listItem || (children && children.some((c: any) => /[\u0600-\u06FF]/.test(c)));

                if (isRtl) {
                    return (
                        <p className={`font-arabic text-right mb-6 transition-all duration-300 ${fontSize === 3 ? 'text-4xl leading-[2.5]' : fontSize === 2 ? 'text-2xl leading-loose' : 'text-xl leading-normal'}`} dir="rtl">
                            {showHarakat ? children : children.map((c: any) => typeof c === 'string' ? stripHarakat(c) : c)}
                        </p>
                    );
                }
                return <p className="mb-6 leading-relaxed">{children}</p>;
            }
        },
        marks: {
            arabic: ({ children }: any) => {
                const text = Array.isArray(children) ? children.join('') : children;
                return (
                    <span className="font-arabic text-royal-900 mx-1" dir="rtl">
                        {showHarakat ? text : stripHarakat(text)}
                    </span>
                );
            }
        }
    };

    return (
        <article className={`prose prose-stone max-w-none text-stone-700 ${sizeClasses[fontSize as keyof typeof sizeClasses]}`}>
            <PortableText value={value} components={components} />
        </article>
    );
}
