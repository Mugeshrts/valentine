import img1 from "../assets/pic.png";
import img2 from "../assets/pic2.png";
import img3 from "../assets/pic3.jpeg";
import img4 from "../assets/pic4.png";

export const memoryCardsData = [
    {
        image: img1,
        imageAlt: "The magical moment our souls recognized each other",
        title: "Forever a Precious Memory",
        description: "My stubbornness is doomed to fail in front of your love.🤍✨",
        emoji: "🤍",
        emojiPosition: "top-right" as const,
        titleGradient: "bg-gradient-to-r from-white-500 via-blue-500 to-orange-500",
        glowColor: "from-blue-400/30 via-white-400/30 to-orange-400/30",
        borderColor: "from-blue-400 via-white-400 to-orange-400",
        tags: [
            { label: "💫 Destiny Called", gradient: "from-blue-400 to-white-400", textColor: "text-white" },
            { label: "💖 Love at First Sight", gradient: "from-pink-400 to-rose-400", textColor: "text-white" },
            { label: "✨ Forever Began", gradient: "from-purple-400 to-violet-400", textColor: "text-white" }
        ],
        animationDelay: "0.2s",
        imageObjectPosition: "50% 30%"
    },
    {
        image: img2,
        imageAlt: "Under the stars, making wishes that already came true",
        title: "Words I Promise to Papa",
        description: "Until I understood, I didn't enjoy anything. After I understood, I couldn't enjoy anything except you...🌙💙",
        emoji: "🌟",
        emojiPosition: "top-right" as const,
        secondaryEmoji: "✨",
        secondaryEmojiPosition: "top-left" as const,
        titleGradient: "bg-gradient-to-r from-blue-500 via-cyan-500 to-sky-500",
        glowColor: "from-blue-400/30 via-cyan-400/30 to-sky-400/30",
        borderColor: "from-blue-400 via-cyan-400 to-sky-400",
        tags: [
            { label: "🌌 Infinite Love", gradient: "from-blue-400 to-cyan-400", textColor: "text-white" },
            { label: "💭 Dreams & Wishes", gradient: "from-purple-400 to-indigo-400", textColor: "text-white" },
            { label: "🌠 Eternal Promise", gradient: "from-cyan-400 to-teal-400", textColor: "text-white" }
        ],
        animationDelay: "0.4s",
        imageObjectPosition: "50% 30%"
    },
    {
        image: img4,
        imageAlt: "Dancing through life together, heartbeat by heartbeat",
        title: "A Picture I’ll Always Love",
        description: "Your memories during separation are a double burden than love...Lend your heart once to reduce the stress of the mind..!!",
        emoji: "💃",
        emojiPosition: "top-right" as const,
        secondaryEmoji: "🎶",
        secondaryEmojiPosition: "bottom-left" as const,
        titleGradient: "bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500",
        glowColor: "from-pink-400/30 via-rose-400/30 to-fuchsia-400/30",
        borderColor: "from-pink-400 via-rose-400 to-fuchsia-400",
        tags: [
            { label: "🎵 Our Melody", gradient: "from-pink-400 to-rose-400", textColor: "text-white" },
            { label: "💃 Perfect Harmony", gradient: "from-rose-400 to-red-400", textColor: "text-white" },
            { label: "💕 Heartbeat Sync", gradient: "from-fuchsia-400 to-pink-400", textColor: "text-white" }
        ],
        animationDelay: "0.6s",
        imageObjectPosition: "50% 27%"
    },
    {
        image: img3,
        imageAlt: "In quiet moments, our souls speak the loudest",
        title: "Heartfull day with My Papa",
        description: "I knew I would be gone, but I never thought I would be gone from you like this.🤍",
        emoji: "✨",
        emojiPosition: "top-right" as const,
        secondaryEmoji: "☕",
        secondaryEmojiPosition: "top-left" as const,
        titleGradient: "bg-gradient-to-r from-orange-500 via-white-500 to-blue-500",
        glowColor: "from-orange-400/30 via-white-400/30 to-blue-400/30",
        borderColor: "from-orange-400 via-white-400 to-blue-400",
        tags: [
            { label: "☕ Cozy Together", gradient: "from-white-400 to-blue-400", textColor: "text-white" },
            { label: "🔥 Warm Hearts", gradient: "from-orange-400 to-red-400", textColor: "text-white" },
            { label: "🤍 Pure Bliss", gradient: "from-blue-400 to-white-400", textColor: "text-white" }
        ],
        animationDelay: "0.8s",
        imageObjectPosition: "50% 20%"
    }
];
