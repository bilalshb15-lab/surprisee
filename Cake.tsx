import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star } from 'lucide-react';

interface CakeProps {
  onAllCandlesBlownOut?: () => void;
}

export default function Cake({ onAllCandlesBlownOut }: CakeProps) {
  // Let's have 3 interactive candles
  const [candles, setCandles] = useState([
    { id: 1, lit: true, offset: '-translate-x-12' },
    { id: 2, lit: true, offset: 'translate-x-0' },
    { id: 3, lit: true, offset: 'translate-x-12' },
  ]);
  const [wishRevealed, setWishRevealed] = useState(false);
  const [wishText, setWishText] = useState('');
  const [wishSaved, setWishSaved] = useState(false);

  const handleCandleClick = (id: number) => {
    setCandles((prev) =>
      prev.map((c) => (c.id === id ? { ...c, lit: false } : c))
    );

    // Play a soft dynamic chime when blowing out a candle!
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880 + id * 220, ctx.currentTime); // chime frequency
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (e) {
      // Audio context might be blocked or unsupported
    }
  };

  const allBlownOut = candles.every((c) => !c.lit);

  useEffect(() => {
    if (allBlownOut) {
      setWishRevealed(true);
      if (onAllCandlesBlownOut) {
        onAllCandlesBlownOut();
      }
    }
  }, [allBlownOut]);

  const handleResetCandles = () => {
    setCandles((prev) => prev.map((c) => ({ ...c, lit: true })));
    setWishRevealed(false);
    setWishSaved(false);
    setWishText('');
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4">
      <div className="relative w-64 h-72 flex items-end justify-center">
        {/* Glowing aura background behind cake */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Candles positioned over the top of the cake */}
        <div className="absolute top-12 left-0 right-0 flex justify-center items-end gap-6 z-20">
          {candles.map((candle) => (
            <div
              key={candle.id}
              onClick={() => candle.lit && handleCandleClick(candle.id)}
              className={`relative flex flex-col items-center cursor-pointer transition-transform hover:scale-110 ${candle.lit ? 'active:scale-95' : ''}`}
              title={candle.lit ? "Click to blow out!" : "Blown out!"}
            >
              {/* Animated Candle Flame */}
              <AnimatePresence>
                {candle.lit ? (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [1, 1.15, 1, 1.05, 1],
                      opacity: 1,
                      y: [0, -2, 0, -1, 0],
                    }}
                    exit={{
                      scale: 0,
                      opacity: 0,
                      y: -10,
                      transition: { duration: 0.3 }
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: 'easeInOut',
                    }}
                    className="absolute -top-7 w-4 h-7 bg-gradient-to-t from-red-500 via-yellow-400 to-amber-200 rounded-full filter drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                    style={{ transformOrigin: 'bottom center' }}
                  >
                    {/* Inner flame core */}
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-4 bg-white rounded-full opacity-80" />
                  </motion.div>
                ) : (
                  // Smoke puff when extinguished
                  <motion.div
                    initial={{ opacity: 0.8, scale: 0.4, y: -5 }}
                    animate={{ opacity: 0, scale: 1.5, y: -25, x: [-2, 3, -1, 2] }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="absolute -top-7 w-5 h-5 bg-slate-300/40 rounded-full blur-sm"
                  />
                )}
              </AnimatePresence>

              {/* Candle Wick */}
              <div className="w-[2px] h-3 bg-neutral-600" />

              {/* Candle Body */}
              <div
                className={`w-3 h-14 rounded-t-sm shadow-md transition-all ${candle.lit ? 'bg-gradient-to-b from-pink-400 to-purple-500' : 'bg-slate-700/80'}`}
                style={{
                  boxShadow: candle.lit ? '0 0 10px rgba(236, 72, 153, 0.4)' : 'none',
                }}
              >
                {/* Spiral decorative lines on candle */}
                <div className="w-full h-full flex flex-col justify-around overflow-hidden opacity-30">
                  <div className="h-[2px] bg-white rotate-12 w-full" />
                  <div className="h-[2px] bg-white rotate-12 w-full" />
                  <div className="h-[2px] bg-white rotate-12 w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Beautiful SVG Cake Illustration */}
        <svg
          viewBox="0 0 200 180"
          className="w-full h-auto z-10 filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)]"
        >
          {/* Top Tier (Tier 3) */}
          <rect x="55" y="45" width="90" height="40" rx="6" fill="#F472B6" />
          <ellipse cx="100" cy="45" rx="45" ry="6" fill="#F43F5E" />
          <path d="M55,60 Q70,72 85,60 T115,60 T145,60" fill="none" stroke="#FFF" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          <ellipse cx="100" cy="85" rx="45" ry="6" fill="#E11D48" />

          {/* Strawberry on top */}
          <circle cx="100" cy="38" r="7" fill="#E11D48" />
          <circle cx="100" cy="38" r="2" fill="#FEE2E2" />

          {/* Cream dollops on Tier 3 */}
          <circle cx="65" cy="45" r="4" fill="#FFF" opacity="0.9" />
          <circle cx="82" cy="46" r="4" fill="#FFF" opacity="0.9" />
          <circle cx="100" cy="47" r="4" fill="#FFF" opacity="0.9" />
          <circle cx="118" cy="46" r="4" fill="#FFF" opacity="0.9" />
          <circle cx="135" cy="45" r="4" fill="#FFF" opacity="0.9" />

          {/* Middle Tier (Tier 2) */}
          <rect x="35" y="85" width="130" height="45" rx="8" fill="#EC4899" />
          <ellipse cx="100" cy="85" rx="65" ry="8" fill="#D946EF" />
          {/* Decorative frosting patterns */}
          <path d="M35,100 Q55,115 75,100 T115,100 T155,100 T165,100" fill="none" stroke="#FDE047" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
          <ellipse cx="100" cy="130" rx="65" ry="8" fill="#C084FC" />

          {/* Bottom Tier (Tier 1) */}
          <rect x="15" y="130" width="170" height="50" rx="10" fill="#8B5CF6" />
          <ellipse cx="100" cy="130" rx="85" ry="10" fill="#A855F7" />
          {/* Whipped cream icing on bottom edge */}
          <path d="M15,148 Q35,160 55,148 T95,148 T135,148 T175,148 Q185,148 185,153" fill="none" stroke="#FFF" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="100" cy="180" rx="85" ry="10" fill="#6B21A8" />

          {/* Sprinkles on bottom tier */}
          <rect x="30" y="142" width="6" height="2" rx="1" fill="#F43F5E" transform="rotate(15 30 142)" />
          <rect x="60" y="152" width="6" height="2" rx="1" fill="#3B82F6" transform="rotate(-25 60 152)" />
          <rect x="90" y="145" width="6" height="2" rx="1" fill="#10B981" transform="rotate(45 90 145)" />
          <rect x="130" y="150" width="6" height="2" rx="1" fill="#F59E0B" transform="rotate(-15 130 150)" />
          <rect x="160" y="142" width="6" height="2" rx="1" fill="#EC4899" transform="rotate(30 160 142)" />
        </svg>
      </div>

      {/* Guide prompt text */}
      <div className="mt-4 text-center">
        {!allBlownOut ? (
          <p className="text-sm font-medium text-pink-300 animate-pulse flex items-center justify-center gap-1">
            <span>🌬️</span> Click on the candles to blow them out!
          </p>
        ) : (
          <p className="text-sm font-medium text-emerald-400 flex items-center justify-center gap-1">
            <Sparkles size={16} /> All candles blown out! Your wish is ready!
          </p>
        )}
      </div>

      {/* Make a Wish Overlay Form */}
      <AnimatePresence>
        {wishRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="w-full max-w-sm mt-6 p-4 rounded-xl bg-slate-900/90 border border-pink-500/30 backdrop-blur-md text-white shadow-2xl z-30"
          >
            <div className="flex items-center justify-center gap-2 mb-2 text-pink-400">
              <Star size={18} className="fill-pink-400 animate-spin-slow" />
              <h4 className="font-bold text-center">Make A Birthday Wish ✨</h4>
              <Star size={18} className="fill-pink-400 animate-spin-slow" />
            </div>

            {!wishSaved ? (
              <div className="flex flex-col gap-3">
                <textarea
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  placeholder="Close your eyes, make a special wish, and write it here..."
                  className="w-full h-20 p-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-pink-100 placeholder-slate-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 resize-none"
                  maxLength={150}
                />
                <div className="flex gap-2 justify-between">
                  <button
                    onClick={handleResetCandles}
                    className="text-xs px-3 py-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
                  >
                    Light Candles Again 🕯️
                  </button>
                  <button
                    onClick={() => setWishSaved(true)}
                    disabled={!wishText.trim()}
                    className="text-xs px-4 py-1.5 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-lg hover:from-pink-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Lock Wish in My Heart 💖
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm italic text-pink-200 mb-4">
                  "Your wish has been locked deep inside the heart and sent into the sky. May all your dreams come true! ✨"
                </p>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={handleResetCandles}
                    className="text-xs px-3 py-1.5 rounded-lg bg-pink-500/20 text-pink-300 border border-pink-500/30 hover:bg-pink-500/30 transition-all"
                  >
                    Blow Again 🎂
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
