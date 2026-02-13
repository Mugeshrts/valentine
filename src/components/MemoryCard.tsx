import { useState } from 'react';
import { ImageModal } from './ImageModal';

interface Tag {
    label: string;
    gradient: string;
    textColor: string;
}

interface MemoryCardProps {
    image: string;
    imageAlt: string;
    title: string;
    description: string;
    emoji: string;
    emojiPosition?: 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right';
    secondaryEmoji?: string;
    secondaryEmojiPosition?: 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right';
    titleGradient: string;
    glowColor: string;
    borderColor: string;
    tags: Tag[];
    animationDelay: string;
    imageObjectPosition?: string;
}

export const MemoryCard = ({
    image,
    imageAlt,
    title,
    description,
    emoji,
    emojiPosition = 'top-right',
    secondaryEmoji,
    secondaryEmojiPosition = 'top-left',
    titleGradient,
    glowColor,
    borderColor,
    tags,
    animationDelay,
    imageObjectPosition = '50% 50%'
}: MemoryCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getPositionClass = (position: string) => {
        switch (position) {
            case 'top-right': return 'top-4 right-4';
            case 'top-left': return 'top-4 left-4';
            case 'bottom-left': return 'bottom-4 left-4';
            case 'bottom-right': return 'bottom-4 right-4';
            default: return 'top-4 right-4';
        }
    };

    return (
        <>
            <div
                className="relative group animate-card-float h-full"
                style={{ animationDelay }}
            >
                {/* Animated Border Glow */}
                <div className={`absolute -inset-[2px] bg-gradient-to-r ${borderColor} rounded-[2rem] opacity-60 group-hover:opacity-100 blur-sm group-hover:blur-md transition-all duration-700 animate-gradient-flow`}></div>

                {/* Outer Glow Effect */}
                <div className={`absolute -inset-4 bg-gradient-to-br ${glowColor} rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700`}></div>

                {/* Main Card Container - Full Image Visible */}
                <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 group-hover:border-white/20 transition-all duration-700 h-full flex flex-col">

                    {/* Full Image Display - No Overlay Hiding It */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden flex-shrink-0">
                        <img
                            src={image}
                            alt={imageAlt}
                            className="w-full h-full object-cover object-[50%_0%] transform transition-all duration-1000 group-hover:scale-105"
                            style={{ objectPosition: imageObjectPosition }}
                        />

                        {/* Minimal Gradient Only at Bottom for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                        {/* View Full Image Button - Centered */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-white/95 backdrop-blur-xl text-gray-900 px-8 py-4 rounded-full font-bold text-base shadow-2xl hover:scale-110 hover:bg-white flex items-center gap-3 border-2 border-white/50"
                            aria-label="View full image"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                            <span className="text-lg">View Full Memory</span>
                        </button>

                        {/* Floating Emojis */}
                        <div className={`absolute ${getPositionClass(emojiPosition)} text-5xl md:text-6xl animate-gentle-float drop-shadow-2xl pointer-events-none z-10`}>
                            {emoji}
                        </div>

                        {secondaryEmoji && (
                            <div className={`absolute ${getPositionClass(secondaryEmojiPosition)} text-4xl md:text-5xl animate-twinkle drop-shadow-2xl pointer-events-none z-10`}>
                                {secondaryEmoji}
                            </div>
                        )}
                    </div>

                    {/* Content Section - Below Image */}
                    <div className="p-6 md:p-8 space-y-4 md:space-y-5 bg-gradient-to-br from-slate-900/98 via-slate-800/98 to-slate-900/98 flex-1 flex flex-col">

                        {/* Title with Elegant Gradient */}
                        <h3
                            className={`text-2xl sm:text-3xl md:text-4xl font-black ${titleGradient} bg-clip-text text-transparent leading-tight`}
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            {title}
                        </h3>

                        {/* Decorative Divider */}
                        <div className={`h-1 w-24 bg-gradient-to-r ${borderColor} rounded-full`}></div>

                        {/* Description - Always Full Text */}
                        <div className="relative flex-1">
                            <p
                                className="text-gray-200 text-sm md:text-base lg:text-lg leading-relaxed font-light transition-all duration-500"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                                {description}
                            </p>
                        </div>

                        {/* Tags with Gradient Backgrounds */}
                        <div className="flex flex-wrap gap-2 md:gap-3 pt-2">
                            {tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className={`px-4 py-2 bg-gradient-to-r ${tag.gradient} rounded-full ${tag.textColor} text-xs md:text-sm font-bold shadow-lg transform hover:scale-105 transition-all duration-300`}
                                >
                                    {tag.label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            <ImageModal
                isOpen={isModalOpen}
                imageSrc={image}
                imageAlt={imageAlt}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};
