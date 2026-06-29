import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { FloatingElement } from '../types';

interface BalloonsProps {
  active: boolean;
  count?: number;
}

const BALLOON_COLORS = [
  'rgba(244, 63, 94, 0.85)',   // Rose Red
  'rgba(236, 72, 153, 0.85)',  // Pink
  'rgba(168, 85, 247, 0.85)',  // Purple
  'rgba(59, 130, 246, 0.85)',  // Blue
  'rgba(245, 158, 11, 0.85)',  // Amber/Gold
  'rgba(16, 185, 129, 0.85)',  // Emerald Green
  'rgba(20, 184, 166, 0.85)',  // Teal
];

export default function Balloons({ active, count = 15 }: BalloonsProps) {
  const [balloons, setBalloons] = useState<FloatingElement[]>([]);

  useEffect(() => {
    if (!active) {
      setBalloons([]);
      return;
    }

    const newBalloons: FloatingElement[] = Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 45 + 35; // Size between 35px and 80px
      const x = Math.random() * 90 + 5; // Starting X coordinate (5% to 95%)
      const delay = Math.random() * 8; // Delay offset
      const speed = Math.random() * 8 + 8; // Duration to rise (8s to 16s)
      const color = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];
      
      return {
        id: `balloon-${i}-${Math.random()}`,
        x,
        y: 110, // Starts off-screen at the bottom
        size,
        delay,
        speed,
        color,
      };
    });

    setBalloons(newBalloons);
  }, [active, count]);

  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          initial={{ y: '110vh', x: `${balloon.x}vw`, rotate: 0, opacity: 0 }}
          animate={{
            y: '-20vh',
            opacity: [0, 0.9, 0.9, 0],
            // Create a realistic swaying/wobbling motion left and right
            x: [
              `${balloon.x}vw`,
              `${balloon.x + (Math.random() * 10 - 5)}vw`,
              `${balloon.x - (Math.random() * 10 - 5)}vw`,
              `${balloon.x + (Math.random() * 10 - 5)}vw`,
            ],
            rotate: [-10, 10, -5, 5, 0],
          }}
          transition={{
            duration: balloon.speed,
            delay: balloon.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute flex flex-col items-center"
          style={{ width: balloon.size }}
        >
          {/* Balloon Bulb */}
          <div
            className="relative rounded-full shadow-lg"
            style={{
              width: balloon.size,
              height: balloon.size * 1.2,
              backgroundColor: balloon.color,
              boxShadow: 'inset -6px -10px 15px rgba(0,0,0,0.15), 4px 6px 12px rgba(0,0,0,0.15)',
            }}
          >
            {/* Glossy shine highlight on the balloon */}
            <div className="absolute top-2 left-3 w-3 h-6 bg-white/45 rounded-full rotate-[-25deg]" />
            
            {/* Balloon knot at the bottom */}
            <div
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px]"
              style={{ borderBottomColor: balloon.color }}
            />
          </div>

          {/* Balloon String */}
          <svg className="w-1 h-20 -mt-[1px]" viewBox="0 0 10 100" preserveAspectRatio="none">
            <path
              d="M5,0 Q8,25 2,50 T5,100"
              fill="none"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="1.5"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
