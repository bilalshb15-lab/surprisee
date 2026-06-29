import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { FloatingElement } from '../types';

interface HeartsProps {
  active: boolean;
  count?: number;
}

const HEART_COLORS = [
  '#FF1493', // Deep Pink
  '#FF69B4', // Hot Pink
  '#FFB6C1', // Light Pink
  '#FF4500', // OrangeRed
  '#DB7093', // PaleVioletRed
  '#E60026', // Warm Red
];

export default function Hearts({ active, count = 20 }: HeartsProps) {
  const [hearts, setHearts] = useState<FloatingElement[]>([]);

  useEffect(() => {
    if (!active) {
      setHearts([]);
      return;
    }

    const newHearts: FloatingElement[] = Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 20 + 15; // 15px to 35px
      const x = Math.random() * 90 + 5; // X coordinate percentage (5% to 95%)
      const delay = Math.random() * 6; // random spawn delay
      const speed = Math.random() * 6 + 6; // travel speed (6s to 12s)
      const color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];

      return {
        id: `heart-${i}-${Math.random()}`,
        x,
        y: 110,
        size,
        delay,
        speed,
        color,
      };
    });

    setHearts(newHearts);
  }, [active, count]);

  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '105vh', x: `${heart.x}vw`, scale: 0.3, opacity: 0 }}
          animate={{
            y: '-10vh',
            scale: [0.3, 1, 1, 0.5],
            opacity: [0, 0.85, 0.85, 0],
            x: [
              `${heart.x}vw`,
              `${heart.x + (Math.random() * 8 - 4)}vw`,
              `${heart.x - (Math.random() * 8 - 4)}vw`,
              `${heart.x + (Math.random() * 8 - 4)}vw`,
            ],
            rotate: [-15, 15, -10, 10, 0],
          }}
          transition={{
            duration: heart.speed,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute"
          style={{ width: heart.size, height: heart.size }}
        >
          {/* Custom SVG Heart */}
          <svg
            viewBox="0 0 24 24"
            fill={heart.color}
            style={{
              width: '100%',
              height: '100%',
              filter: `drop-shadow(0 2px 5px ${heart.color}55)`,
            }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
