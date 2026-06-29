import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Gift, Award, HelpCircle } from 'lucide-react';

interface GiftBoxProps {
  onOpen?: () => void;
}

const GIFT_COUPONS = [
  {
    id: 'coupon-1',
    badge: '👑 EXCLUSIVE VOUCHER',
    title: 'Infinite Hugs & Kisses',
    description: 'This voucher entitles you to unlimited warm hugs, tight squeezes, and sweet forehead kisses, valid forever!',
    color: 'from-rose-500 to-pink-500',
    icon: Heart,
  },
  {
    id: 'coupon-2',
    badge: '🍽️ ROMANTIC VOUCHER',
    title: 'A Perfect Candlelight Dinner',
    description: 'Redeemable for a fully prepared cozy candlelight dinner date at your favorite restaurant or a homemade gourmet feast.',
    color: 'from-amber-500 to-orange-500',
    icon: Sparkles,
  },
  {
    id: 'coupon-3',
    badge: '🍿 COZY VOUCHER',
    title: 'Cozy Movie Night In',
    description: 'Valid for a movie night of your choice, complete with a blanket nest, unlimited popcorn, and zero interruptions.',
    color: 'from-purple-500 to-indigo-500',
    icon: Gift,
  },
  {
    id: 'coupon-4',
    badge: '💆 pampering VOUCHER',
    title: 'Full Day of Royal Spoiling',
    description: 'Enjoy 24 hours where you do absolutely nothing, and I handle all chores, pamper you, and cook your favorite meals.',
    color: 'from-teal-500 to-emerald-500',
    icon: Award,
  },
];

export default function GiftBox({ onOpen }: GiftBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCoupon, setActiveCoupon] = useState(0);

  const handleOpenGift = () => {
    if (isOpen) return;
    setIsOpen(true);
    if (onOpen) {
      onOpen();
    }

    // Play virtual sparkle audio chime
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.4); // C6
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.7);
    } catch (e) {
      // Audio context might be blocked
    }
  };

  const nextCoupon = () => {
    setActiveCoupon((prev) => (prev + 1) % GIFT_COUPONS.length);
  };

  const prevCoupon = () => {
    setActiveCoupon((prev) => (prev - 1 + GIFT_COUPONS.length) % GIFT_COUPONS.length);
  };

  const CurrentIcon = GIFT_COUPONS[activeCoupon].icon;

  return (
    <div className="flex flex-col items-center justify-center py-8">
      {/* 3D Interactive CSS Gift Box */}
      <div className="relative w-72 h-80 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            // Closed Box View
            <motion.div
              key="closed-box"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: [0, -3, 3, -3, 3, 0],
              }}
              exit={{ scale: 0.6, opacity: 0, y: 50, filter: 'blur(5px)' }}
              transition={{
                rotate: {
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 2.5,
                  ease: 'easeInOut',
                },
                scale: { duration: 0.5 },
                opacity: { duration: 0.5 },
              }}
              onClick={handleOpenGift}
              className="group cursor-pointer flex flex-col items-center justify-center"
            >
              <div className="relative w-44 h-44 transition-transform group-hover:scale-105 active:scale-95">
                {/* Ribbon Bow on Top */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-8 flex justify-center z-30">
                  <div className="w-10 h-8 rounded-full border-[5px] border-pink-500 bg-pink-600/80 -mr-2 rotate-[-15deg]" />
                  <div className="w-10 h-8 rounded-full border-[5px] border-pink-500 bg-pink-600/80 -ml-2 rotate-[15deg]" />
                </div>

                {/* Box Lid */}
                <div className="absolute top-0 left-0 w-44 h-10 bg-gradient-to-r from-pink-400 to-pink-500 rounded-sm shadow-md z-20 border-b border-pink-600/20">
                  {/* Vertical yellow ribbon belt on lid */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-full bg-yellow-400" />
                </div>

                {/* Box Body */}
                <div className="absolute top-9 left-[4px] w-[168px] h-[140px] bg-gradient-to-b from-rose-500 to-rose-600 rounded-b-xl shadow-xl z-10 border-t border-rose-400/20">
                  {/* Vertical yellow ribbon belt on box body */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -ml-[2px] w-6 h-full bg-yellow-400" />
                  {/* Horizontal yellow ribbon belt on box body */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-6 bg-yellow-400" />
                </div>
              </div>

              <p className="mt-8 text-sm font-bold tracking-wide text-pink-300 animate-pulse uppercase flex items-center gap-1.5 bg-slate-950/40 px-3 py-1.5 rounded-full border border-pink-500/10">
                <Gift size={15} className="animate-bounce" /> Tap to Open Your Gift!
              </p>
            </motion.div>
          ) : (
            // Opened Gift Box View with Revealed Coupons
            <motion.div
              key="opened-box"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 15 }}
              className="flex flex-col items-center w-full"
            >
              {/* Explosion Spars Overlay (Temporary Effect) */}
              <div className="absolute -top-12 z-0">
                <Sparkles size={36} className="text-yellow-400 animate-ping opacity-60" />
              </div>

              {/* Opened Box Bottom Decoration */}
              <div className="absolute bottom-0 w-44 h-16 bg-slate-900/50 rounded-b-xl border border-dashed border-slate-700/30 flex items-center justify-center opacity-60 pointer-events-none z-0">
                <p className="text-[10px] text-slate-500">Box Opened 💝</p>
              </div>

              {/* Magical Rotating Birthday Coupon Card */}
              <motion.div
                initial={{ rotateY: 90 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-[280px] rounded-3xl p-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 border border-slate-700/50 text-white shadow-2xl relative overflow-hidden z-10"
              >
                {/* Background Card Aura */}
                <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${GIFT_COUPONS[activeCoupon].color} opacity-20 blur-2xl rounded-full`} />

                {/* Badge header */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-bold tracking-widest uppercase bg-gradient-to-r ${GIFT_COUPONS[activeCoupon].color} text-white px-2.5 py-1 rounded-full shadow-inner`}>
                    {GIFT_COUPONS[activeCoupon].badge}
                  </span>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-slate-700" />
                    <span className="w-2 h-2 rounded-full bg-slate-700" />
                  </div>
                </div>

                {/* Icon Circle */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${GIFT_COUPONS[activeCoupon].color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                  <CurrentIcon size={24} className="animate-pulse" />
                </div>

                {/* Coupon Content */}
                <h4 className="text-lg font-bold tracking-tight text-white mb-2 leading-snug">
                  {GIFT_COUPONS[activeCoupon].title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed min-h-[64px] italic">
                  "{GIFT_COUPONS[activeCoupon].description}"
                </p>

                {/* Signature decoration */}
                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
                  <span>No. BDAY-2026-COUPON</span>
                  <span className="font-serif italic text-pink-400">Locked with Love ❤️</span>
                </div>
              </motion.div>

              {/* Vouchers Navigator Controls */}
              <div className="flex items-center gap-4 mt-6 z-20">
                <button
                  onClick={prevCoupon}
                  className="p-1.5 rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors text-white text-xs px-3"
                >
                  ◀ Prev
                </button>
                <span className="text-xs font-mono text-slate-400">
                  {activeCoupon + 1} / {GIFT_COUPONS.length}
                </span>
                <button
                  onClick={nextCoupon}
                  className="p-1.5 rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors text-white text-xs px-3"
                >
                  Next ▶
                </button>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 text-[11px] text-slate-500 hover:text-pink-400 underline transition-colors"
              >
                Close & Repack Box 🎁
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
