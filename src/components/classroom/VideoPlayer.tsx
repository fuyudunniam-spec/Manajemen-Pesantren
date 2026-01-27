'use client';

interface VideoPlayerProps {
    url: string;
    title?: string;
    startAt?: number;
}

// Extract YouTube video ID from various URL formats
function getYouTubeId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
}

export function VideoPlayer({ url, title, startAt }: VideoPlayerProps) {
    const videoId = getYouTubeId(url);

    if (!videoId) {
        return (
            <div className="aspect-video bg-stone-100 rounded-2xl flex items-center justify-center text-stone-400">
                Invalid video URL
            </div>
        );
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}${startAt ? `?start=${startAt}` : ''}`;

    return (
        <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-xl">
            <iframe
                className="w-full h-full"
                src={embedUrl}
                title={title || 'Video Lesson'}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}

export default VideoPlayer;
