// Floating Hearts & Sparkles Component
export const FloatingElements = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => {
                const duration = Math.random() * 8 + 10;
                const delay = Math.random() * 5;
                const left = Math.random() * 100;
                const floatX = Math.random() * 200 - 100;
                const rotate = Math.random() * 360;
                const hearts = ['🤍', '💙'];
                const heart = hearts[Math.floor(Math.random() * hearts.length)];

                return (
                    <div
                        key={`heart-${i}`}
                        className="absolute text-2xl md:text-3xl animate-float-heart"
                        style={{
                            left: `${left}%`,
                            bottom: 0,
                            // @ts-ignore
                            '--duration': `${duration}s`,
                            '--delay': `${delay}s`,
                            '--float-x': `${floatX}px`,
                            '--rotate': `${rotate}deg`,
                        }}
                    >
                        {heart}
                    </div>
                );
            })}

            {Array.from({ length: 15 }).map((_, i) => {
                const duration = Math.random() * 6 + 8;
                const delay = Math.random() * 4;
                const left = Math.random() * 100;

                return (
                    <div
                        key={`sparkle-${i}`}
                        className="absolute text-xl md:text-2xl animate-float-sparkle"
                        style={{
                            left: `${left}%`,
                            bottom: 0,
                            // @ts-ignore
                            '--duration': `${duration}s`,
                            '--delay': `${delay}s`,
                        }}
                    >
                        ✨
                    </div>
                );
            })}
        </div>
    );
};
