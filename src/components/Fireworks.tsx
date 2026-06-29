import { useEffect, useRef } from 'react';

interface FireworksProps {
  active: boolean;
  intensity?: number; // 1-5
  confettiOnly?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  decay: number;
  gravity: number;
  friction: number;
  type: 'spark' | 'confetti';
  spin?: number;
  spinSpeed?: number;
}

export default function Fireworks({ active, intensity = 2, confettiOnly = false }: FireworksProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const colors = [
      '#FF1493', // Deep Pink
      '#FF69B4', // Hot Pink
      '#FFD700', // Gold
      '#FF4500', // OrangeRed
      '#00FFFF', // Cyan
      '#1E90FF', // DodgerBlue
      '#DA70D6', // Orchid
      '#7B68EE', // MediumSlateBlue
      '#32CD32', // LimeGreen
    ];

    const createFirework = (targetX: number, targetY: number) => {
      const numSparks = confettiOnly ? 30 : 60 + Math.random() * 40;
      const baseColor = colors[Math.floor(Math.random() * colors.length)];

      for (let i = 0; i < numSparks; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = confettiOnly ? Math.random() * 3 + 1 : Math.random() * 6 + 2;
        const color = confettiOnly ? colors[Math.floor(Math.random() * colors.length)] : baseColor;

        particles.push({
          x: targetX,
          y: targetY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (confettiOnly ? 1 : 2), // slightly upwards velocity
          alpha: 1,
          color,
          size: confettiOnly ? Math.random() * 6 + 4 : Math.random() * 3 + 1.5,
          decay: confettiOnly ? 0.01 + Math.random() * 0.01 : 0.015 + Math.random() * 0.015,
          gravity: confettiOnly ? 0.05 : 0.1,
          friction: 0.98,
          type: confettiOnly ? 'confetti' : 'spark',
          spin: Math.random() * 360,
          spinSpeed: (Math.random() - 0.5) * 5,
        });
      }
    };

    // Auto launcher
    let launchTimer = 0;
    const launchInterval = 100 / intensity; // lower division = more frequent

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Random automated firework bursts
      if (active) {
        launchTimer++;
        if (launchTimer >= launchInterval) {
          launchTimer = 0;
          const x = Math.random() * canvas.width;
          // Fireworks burst high, confetti burst mid-high
          const y = confettiOnly 
            ? Math.random() * (canvas.height * 0.3) + canvas.height * 0.1
            : Math.random() * (canvas.height * 0.4) + canvas.height * 0.15;
          createFirework(x, y);
        }
      }

      // Update & Draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        if (p.type === 'confetti') {
          // Confetti are little spinning rectangles or circles
          ctx.translate(p.x, p.y);
          if (p.spin !== undefined && p.spinSpeed !== undefined) {
            p.spin += p.spinSpeed;
            ctx.rotate((p.spin * Math.PI) / 180);
          }
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          // Fireworks sparks are glowing circles or star paths
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Add glowing spark tail
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Support interactive clicking to generate custom firework bursts!
    const handleClick = (e: MouseEvent) => {
      createFirework(e.clientX, e.clientY);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        createFirework(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleTouchStart);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active, intensity, confettiOnly]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 block"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
