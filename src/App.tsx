import { useState, useEffect } from 'react';
import './App.css';
import { FloatingElements, CelebrationConfetti, CountdownDisplay, MemoryCard, PasswordPrompt } from './components';
import { memoryCardsData } from './data/memoryCardsData';


type Screen = 'intro' | 'proposal' | 'memoryLane' | 'loveLetter' | 'celebration';

function App() {
  const [screen, setScreen] = useState<Screen>('intro');
  const [noButtonStyle, setNoButtonStyle] = useState({ transform: '', opacity: 1 });
  const [noClickCount, setNoClickCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [authorized, setAuthorized] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('authorized') === 'true';
    } catch (e) {
      return false;
    }
  });

  // Auto-scroll to top on screen change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [screen]);

  // Countdown timer from April 8, 2025
  useEffect(() => {
    const startDate = new Date('2022-10-03T00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = now - startDate;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const noMessages = [
    "Wait... my heart can't take this 🥺",
    "Every beat of my heart calls your name 🤍",
    "The stars would cry if you said no 💙",
    "My soul aches for your yes 💔",
    "Please... you're my only wish 🌟",
  ];

  const handleNoClick = () => {
    const randomX = (Math.random() - 0.5) * 400;
    const randomY = (Math.random() - 0.5) * 300;
    const randomRotate = (Math.random() - 0.5) * 60;
    const newOpacity = Math.max(0.2, 1 - noClickCount * 0.15);

    setNoButtonStyle({
      transform: `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg) scale(${1 - noClickCount * 0.12})`,
      opacity: newOpacity,
    });
    setNoClickCount((prev) => Math.min(prev + 1, noMessages.length - 1));
  };

  const handleYesClick = () => {
    setShowCelebration(true);
    setTimeout(() => {
      setScreen('memoryLane');
    }, 2000);
  };

  const resetApp = () => {
    setScreen('intro');
    setShowCelebration(false);
    setNoClickCount(0);
    setNoButtonStyle({ transform: '', opacity: 1 });
  };

  // ==================== INTRO SCREEN ====================
  if (!authorized) {
    return <PasswordPrompt onSuccess={() => setAuthorized(true)} />;
  }
  if (screen === 'intro') {
    return (
      <div className="min-h-screen relative overflow-hidden bg-black">
        <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-white-950 animate-gradient-flow opacity-90" />
        <FloatingElements />

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-6">
          <div className="max-w-5xl w-full space-y-8 md:space-y-16 text-center">

            {/* Main Title */}
            <div className="space-y-4 md:space-y-8 animate-elegant-fade">
              <div className="text-5xl md:text-7xl animate-heartbeat mb-4 md:mb-6">💙🤍</div>
              <h1
                className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black leading-tight px-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <span className="gradient-text-sunshine">You</span>
                <span className='text-white'>{' & '}</span>
                <span className="gradient-text-ocean">Me</span>
              </h1>

              <p className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-light text-white/90 px-4" style={{ fontFamily: "'Dancing Script', cursive" }}>
                Heyy papa, En kutty Surprise... ✨
              </p>

              <p className="text-base sm:text-lg md:text-xl text-blue-200/80 px-6 max-w-3xl mx-auto leading-relaxed">
                
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="animate-scale-in px-4" style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}>
              <CountdownDisplay countdown={countdown} />
            </div>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-3 md:gap-6 animate-scale-in" style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}>
              <div className="h-0.5 md:h-1 w-16 md:w-32 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full" />
              <div className="text-2xl md:text-3xl animate-gentle-float">⭐</div>
              <div className="h-0.5 md:h-1 w-16 md:w-32 bg-gradient-to-r from-transparent via-sky-400 to-transparent rounded-full" />
            </div>

            {/* CTA Button */}
            <div className="animate-scale-in px-4" style={{ animationDelay: '0.7s', opacity: 0, animationFillMode: 'forwards' }}>
              <button
                onClick={() => setScreen('proposal')}
                className="group relative px-8 py-4 md:px-16 md:py-7 bg-gradient-to-r from-blue-400 via-white-500 to-sky-400 rounded-full text-blue-950 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold overflow-hidden transition-all duration-500 hover:scale-110 animate-glow-pulse shimmer-overlay"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <span className="relative z-10 flex items-center gap-2 md:gap-3">
                  Begin Our Journey
                  <span className="text-2xl md:text-3xl">💫</span>
                </span>
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // ==================== PROPOSAL SCREEN ====================
  if (screen === 'proposal') {
    return (
      <div className="min-h-screen relative overflow-hidden bg-black">
        <div className="fixed inset-0 bg-gradient-to-br from-white-950 via-slate-950 to-blue-950 animate-gradient-flow opacity-90" />
        <FloatingElements />
        {showCelebration && <CelebrationConfetti />}

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-6">
          <div className="max-w-4xl w-full space-y-10 md:space-y-20 text-center">

            {/* Question */}
            <div className="space-y-6 md:space-y-10 animate-elegant-fade px-2">
              <div className="text-6xl md:text-8xl animate-heartbeat mb-4 md:mb-8">💝</div>
              <h1
                className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black leading-tight text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Thanga Maileyy,
                <br />
                Will You Be My
                <br />
                <span className="gradient-text-romantic text-4xl sm:text-5xl md:text-7xl lg:text-9xl">
                  Valentine?
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-sky-200/80 px-6 max-w-2xl mx-auto leading-relaxed">

              </p>

              {/* Feedback Message */}
              {noClickCount > 0 && (
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-blue-300 font-medium animate-text-reveal px-4" style={{ fontFamily: "'Pacifico', cursive" }}>
                  {noMessages[noClickCount]}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 md:gap-10 justify-center items-center px-4">

              {/* YES Button */}
              <button
                onClick={handleYesClick}
                className="relative group px-12 py-5 sm:px-16 sm:py-6 md:px-20 md:py-8 bg-gradient-to-r from-blue-400 via-white-500 to-blue-400 rounded-full text-blue-950 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black overflow-hidden transition-all duration-500 hover:scale-110 animate-glow-pulse shimmer-overlay w-full sm:w-auto"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3">
                  Yes, Mama! 🤍
                </span>
              </button>

              {/* NO Button - Playful */}
              <button
                onClick={handleNoClick}
                className="relative px-12 py-5 sm:px-16 sm:py-6 md:px-20 md:py-8 glass-blue rounded-full text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold transition-all duration-300 hover:glass-premium w-full sm:w-auto"
                style={{
                  ...noButtonStyle,
                  fontFamily: "'Poppins', sans-serif",
                  transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                }}
              >
                Noo da 💙
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // ==================== MEMORY LANE SCREEN ====================
  if (screen === 'memoryLane') {
    return (
      <div className="min-h-screen relative overflow-hidden bg-black">
        {/* Animated Background */}
        <div className="fixed inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-white-950 to-blue-950" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/50 to-black" />
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Floating Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute text-white/20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 20 + 10}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
              }}
            >
              {['💖', '✨', '💫', '🌟', '💕', '💘'][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>

        <div className="relative z-10 min-h-screen py-8 md:py-16 px-4 md:px-6">
          <div className="max-w-6xl mx-auto space-y-8 md:space-y-16">

            {/* Header with animation */}
            <div className="text-center space-y-4 md:space-y-6">
              <div className="text-5xl md:text-7xl mb-4 animate-bounce" style={{ animationDelay: '0.5s' }}>📸✨</div>
              <h1
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black px-2 animate-typing"
                style={{
                  background: 'linear-gradient(45deg, #bdbdbd, #3b82f6, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: "'Playfair Display', serif"
                }}
              >
                Our Beautiful Memories
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-blue-100/90 font-light px-6 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Dancing Script', cursive", animationDelay: '0.8s' }}>
                Mailii, every moment with you feels like a dream I never want to wake up from, my everything. 🌟
              </p>
              <p className="text-sm sm:text-base md:text-lg text-sky-200/70 px-6 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '1s' }}>
                These memories are the threads that weave our love story, each one precious, each one eternal, my beautiful Thithi.
              </p>
            </div>

            {/* Memory Cards Grid - Magazine Style Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
              {memoryCardsData.map((card, index) => (
                <MemoryCard key={index} {...card} />
              ))}
            </div>

            {/* Continue Button */}
            <div className="text-center animate-scale-in" style={{ animationDelay: '1.2s' }}>
              <button
                onClick={() => setScreen('loveLetter')}
                className="relative group px-10 py-5 md:px-16 md:py-6 rounded-full overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-blue-400 to-pink-400 opacity-80 group-hover:opacity-100 transition-all duration-500 animate-gradient-x" />
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-blue-400 to-pink-400 blur opacity-0 group-hover:opacity-70 transition-all duration-500" />
                <span className="relative text-blue-950 text-lg md:text-2xl lg:text-3xl font-bold flex items-center gap-3">
                  Read My Heart
                  <span className="animate-heart-beat">💌</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">→</span>
                </span>
              </button>
            </div>

          </div>
        </div>

        {/* Add these styles directly in JSX */}

      </div>
    );
  }

  // ==================== LOVE LETTER SCREEN ====================
  if (screen === 'loveLetter') {
    return (
      <div className="min-h-screen relative overflow-hidden bg-black">
        <div className="fixed inset-0 bg-gradient-to-br from-white-950 via-slate-950 to-blue-950 animate-gradient-flow opacity-90" />
        <FloatingElements />

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-6 py-12 md:py-20">
          <div className="max-w-4xl w-full">

            {/* Letter Container */}
            <div className="glass-gradient rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 space-y-6 md:space-y-10 animate-elegant-fade shimmer-overlay">

              {/* Letter Header */}
              <div className="text-center space-y-3 md:space-y-4">
                <div className="text-4xl md:text-6xl mb-2 md:mb-4">💌</div>
                <h1
                  className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black gradient-text-romantic px-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  To My Alagu Mailuuu
                </h1>
                <div className="flex items-center justify-center gap-3 md:gap-4">
                  <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
                  <span className="text-xl md:text-2xl">🤍</span>
                  <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
                </div>
              </div>

              {/* Letter Content */}
              <div className="space-y-4 md:space-y-6 text-white/95 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <p className="animate-text-reveal" style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}>
                  djfhkdhfkdjhfkdjh... 🤍
                </p>

                <p className="animate-text-reveal" style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}>
                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit ipsa animi corrupti, eligendi provident voluptatem repellendus itaque blanditiis ducimus esse, consectetur rem facilis ab quisquam? Dolorem necessitatibus, maxime nemo dolorum cum odio voluptatem asperiores aut blanditiis iure, non labore dignissimos perferendis cumque quae ullam minima beatae sit voluptatum ab. Doloribus.
                </p>

                <p className="animate-text-reveal" style={{ animationDelay: '0.8s', opacity: 0, animationFillMode: 'forwards' }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quae natus necessitatibus quisquam praesentium blanditiis iure molestias similique fuga cupiditate.
                </p>

                <p className="animate-text-reveal" style={{ animationDelay: '1.1s', opacity: 0, animationFillMode: 'forwards' }}>
                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas ducimus voluptate quo quam sint dolore, impedit minima, commodi aspernatur maiores sunt saepe aut aperiam maxime molestiae, quasi sequi adipisci optio cum! Aspernatur alias facere optio ad, eaque dolores hic.
                </p>

                <p className="animate-text-reveal" style={{ animationDelay: '1.4s', opacity: 0, animationFillMode: 'forwards' }}>
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit repudiandae debitis, in facere sint dolores, qui optio voluptatum officiis, illum nobis aliquid tempora veritatis rem voluptatem quas autem nihil.
                </p>
              </div>

              {/* Signature */}
              <div className="text-right animate-text-reveal" style={{ animationDelay: '1.7s', opacity: 0, animationFillMode: 'forwards' }}>
                <p className="text-base sm:text-lg md:text-xl text-blue-200/80" style={{ fontFamily: "'Pacifico', cursive" }}>
                  Eternally Yours,
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-sky-300 mt-1 md:mt-2" style={{ fontFamily: "'Dancing Script', cursive" }}>
                  Your Soulmate Mugi 💙🤍
                </p>
              </div>

            </div>

            {/* Continue Button */}
            <div className="text-center mt-8 md:mt-12 animate-scale-in" style={{ animationDelay: '2s', opacity: 0, animationFillMode: 'forwards' }}>
              <button
                onClick={() => setScreen('celebration')}
                className="px-8 py-4 md:px-14 md:py-6 bg-gradient-to-r from-blue-400 to-sky-400 rounded-full text-blue-950 text-base sm:text-lg md:text-xl lg:text-2xl font-bold hover:scale-105 transition-all duration-300 shimmer-overlay"
              >
                Celebrate Our Love 🎉
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // ==================== CELEBRATION SCREEN ====================
  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-white-950 animate-gradient-flow opacity-90" />
      <CelebrationConfetti />
      <FloatingElements />

      <div className="relative z-10 min-h-screen py-8 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-16">

          {/* Header */}
          <div className="text-center space-y-3 md:space-y-6 animate-elegant-fade">
            <div className="text-6xl md:text-8xl mb-3 md:mb-6">🎉💙🤍✨</div>
            <h1
              className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black gradient-text-romantic px-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Sobi Said YES!
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-blue-200 font-light px-4" style={{ fontFamily: "'Pacifico', cursive" }}>
              My heart is complete! 💖
            </p>
            <p className="text-sm sm:text-base md:text-lg text-sky-200/70 px-6 max-w-2xl mx-auto">
              This is just the beginning of our beautiful forever, my sweet Mailii. Every day with you is a celebration.
            </p>
          </div>

          {/* Celebration Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

            {/* Card 1 */}
            <div className="glass-blue rounded-2xl md:rounded-3xl p-6 md:p-8 space-y-4 md:space-y-6 hover-lift shimmer-overlay animate-scale-in" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
              <div className="text-5xl md:text-7xl text-center animate-heartbeat">🤍</div>
              <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-white text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                You Are My Forever
              </h3>
              <p className="text-white/90 text-sm sm:text-base md:text-lg text-center leading-relaxed">
                Loving you feels natural, peaceful, and meant to be.
              </p>


            </div>

            {/* Card 2 */}
            <div className="glass-blue rounded-2xl md:rounded-3xl p-6 md:p-8 space-y-4 md:space-y-6 hover-lift shimmer-overlay animate-scale-in" style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}>
              <div className="text-5xl md:text-7xl text-center animate-heartbeat">💙</div>
              <h3
                className="text-2xl sm:text-2xl md:text-3xl font-bold text-sky-100 text-center"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                You Are My Calm
              </h3>
              <p className="text-sky-50/90 text-sm sm:text-base md:text-lg text-center leading-relaxed">
                When you’re near, everything feels lighter.
                Your love brings a gentle peace to my heart.
              </p>

            </div>

            {/* Card 3 */}
            <div className="glass-gradient rounded-2xl md:rounded-3xl p-6 md:p-8 space-y-4 md:space-y-6 hover-lift shimmer-overlay animate-scale-in" style={{ animationDelay: '0.6s', opacity: 0, animationFillMode: 'forwards' }}>
              <div className="text-5xl md:text-7xl text-center animate-heartbeat">✨</div>
              <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-white text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                You Are My Miracle
              </h3>
              <p className="text-white/90 text-sm sm:text-base md:text-lg text-center leading-relaxed">
                You gently turned my everyday life into something beautiful. With you, even the smallest moments feel magical.
              </p>

            </div>

          </div>

          {/* Final Message */}
          <div className="glass-premium rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 text-center space-y-6 md:space-y-10 animate-elegant-fade" style={{ animationDelay: '0.8s', opacity: 0, animationFillMode: 'forwards' }}>
            <h2
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black gradient-text-romantic px-2"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Happy Valentine's Day, My Love! 💝
            </h2>
            <p className="text-base sm:text-lg md:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed px-2">
              Thank you for saying yes, for choosing us, for being my forever. You are my greatest adventure, my deepest love. I love you to infinity and beyond!. Love You Soo Much Dii Thangooo 🌙💫
            </p>

            {/* Decorative Elements */}
            <div className="flex justify-center gap-3 md:gap-6 text-4xl md:text-5xl flex-wrap">
              <span className="animate-heartbeat" style={{ animationDelay: '0s' }}>🤍</span>
              <span className="animate-heartbeat" style={{ animationDelay: '0.3s' }}>💙</span>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center animate-scale-in px-2" style={{ animationDelay: '1s', opacity: 0, animationFillMode: 'forwards' }}>
            <button
              onClick={() => setScreen('memoryLane')}
              className="px-6 py-3 md:px-10 md:py-5 glass-blue rounded-full text-blue-100 text-sm sm:text-base md:text-lg lg:text-xl font-semibold hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              ← Relive Our Memories
            </button>
            <button
              onClick={() => setScreen('loveLetter')}
              className="px-6 py-3 md:px-10 md:py-5 glass-blue rounded-full text-sky-100 text-sm sm:text-base md:text-lg lg:text-xl font-semibold hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              Read My Heart 💌
            </button>
            <button
              onClick={resetApp}
              className="px-6 py-3 md:px-10 md:py-5 glass-premium rounded-full text-white text-sm sm:text-base md:text-lg lg:text-xl font-semibold hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              Start Over ↺
            </button>
          </div>

        </div>
        {/* <style jsx>{`
    @keyframes typing {
      from { width: 0 }
      to { width: 100% }
    }
    @keyframes fade-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes card-float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes scale-in {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(10deg); }
    }
    @keyframes float-slow {
      0%, 100% { transform: translate(-50%, -50%) scale(1); }
      50% { transform: translate(-50%, -60%) scale(1.2); }
    }
    @keyframes twinkle {
      0%, 100% { opacity: 0.5; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.2); }
    }
    @keyframes heart-beat {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.3); }
    }
    @keyframes gradient-x {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    .animate-typing {
      overflow: hidden;
      white-space: nowrap;
      animation: typing 3.5s steps(40, end);
    }
    .animate-fade-up {
      animation: fade-up 1s ease-out forwards;
    }
    .animate-fade-in {
      animation: fade-in 1s ease-out forwards;
    }
    .animate-card-float {
      animation: card-float 6s ease-in-out infinite;
    }
    .animate-scale-in {
      animation: scale-in 1s ease-out forwards;
    }
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
    .animate-float-slow {
      animation: float-slow 4s ease-in-out infinite;
    }
    .animate-twinkle {
      animation: twinkle 2s ease-in-out infinite;
    }
    .animate-heart-beat {
      animation: heart-beat 1.5s ease-in-out infinite;
    }
    .animate-gradient-x {
      background-size: 200% 200%;
      animation: gradient-x 3s ease infinite;
    }
    .animate-text-glow {
      text-shadow: 0 0 10px currentColor, 0 0 20px currentColor;
    }
    .perspective-1000 {
      perspective: 1000px;
    }
    .rotate-y-12 {
      transform: rotateY(12deg);
    }
    .rotate-x-12 {
      transform: rotateX(12deg);
    }
  `}</style> */}
      </div>
    </div>

  );
}

export default App;
