interface CountdownDisplayProps {
    countdown: {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    };
}

export const CountdownDisplay = ({ countdown }: CountdownDisplayProps) => {
    return (
        <div className="glass-gradient rounded-2xl md:rounded-3xl p-4 md:p-8 animate-glow-pulse">
            <div className="text-center space-y-2 md:space-y-4">
                <p className="text-sm md:text-xl text-blue-200 font-medium" style={{ fontFamily: "'Pacifico', cursive" }}>
                    Together Since Oct 3, 2022 💙🤍
                </p>
                <p className="text-xs md:text-base text-sky-200/80 font-light" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    Every second with my beautiful Pikachu is a blessing ✨
                </p>
                <div className="grid grid-cols-4 gap-2 md:gap-4">
                    <div className="glass-blue rounded-xl md:rounded-2xl p-2 md:p-4">
                        <div className="text-2xl md:text-4xl lg:text-5xl font-black gradient-text-sunshine">
                            {countdown.days}
                        </div>
                        <div className="text-xs md:text-sm text-blue-200 mt-1">Days</div>
                    </div>
                    <div className="glass-blue rounded-xl md:rounded-2xl p-2 md:p-4">
                        <div className="text-2xl md:text-4xl lg:text-5xl font-black gradient-text-ocean">
                            {countdown.hours}
                        </div>
                        <div className="text-xs md:text-sm text-sky-200 mt-1">Hours</div>
                    </div>
                    <div className="glass-blue rounded-xl md:rounded-2xl p-2 md:p-4">
                        <div className="text-2xl md:text-4xl lg:text-5xl font-black gradient-text-sunshine">
                            {countdown.minutes}
                        </div>
                        <div className="text-xs md:text-sm text-blue-200 mt-1">Mins</div>
                    </div>
                    <div className="glass-blue rounded-xl md:rounded-2xl p-2 md:p-4">
                        <div className="text-2xl md:text-4xl lg:text-5xl font-black gradient-text-ocean">
                            {countdown.seconds}
                        </div>
                        <div className="text-xs md:text-sm text-sky-200 mt-1">Secs</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
