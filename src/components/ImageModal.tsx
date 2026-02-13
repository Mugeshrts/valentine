import { useEffect } from 'react';

interface ImageModalProps {
    isOpen: boolean;
    imageSrc: string;
    imageAlt: string;
    onClose: () => void;
}

export const ImageModal = ({ isOpen, imageSrc, imageAlt, onClose }: ImageModalProps) => {
    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-elegant-fade"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />

            {/* Modal Content */}
            <div className="relative z-10 max-w-7xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 md:-right-12 md:top-0 text-white hover:text-blue-400 transition-colors duration-300 group"
                    aria-label="Close modal"
                >
                    <div className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 transition-all duration-300">
                        <span className="text-sm font-medium hidden md:inline">Press ESC or Click</span>
                        <svg className="w-8 h-8 transform group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </button>

                {/* Image Container */}
                <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl animate-scale-in">
                    <img
                        src={imageSrc}
                        alt={imageAlt}
                        className="w-full h-full object-contain max-h-[90vh]"
                    />

                    {/* Image Caption */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 md:p-8">
                        <p className="text-white text-lg md:text-2xl font-semibold text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {imageAlt}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
