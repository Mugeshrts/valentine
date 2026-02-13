// Celebration Confetti Component
export const CelebrationConfetti = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
            {Array.from({ length: 60 }).map((_, i) => {
                const emojis = ['🤍', '💙'];
                const emoji = emojis[Math.floor(Math.random() * emojis.length)];
                const duration = Math.random() * 2 + 2;
                const delay = Math.random() * 1.5;
                const left = Math.random() * 100;
                const rotate = Math.random() * 720;

                return (
                    <div
                        key={i}
                        className="absolute text-xl md:text-2xl animate-confetti"
                        style={{
                            left: `${left}%`,
                            bottom: 0,
                            // @ts-ignore
                            '--duration': `${duration}s`,
                            '--delay': `${delay}s`,
                            '--rotate': `${rotate}deg`,
                        }}
                    >
                        {emoji}
                    </div>
                );
            })}
        </div>
    );
};
