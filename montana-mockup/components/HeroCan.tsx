'use client';

import { motion, useReducedMotion } from 'motion/react';
import { ProductGraphic } from './ProductGraphic';

/**
 * Choreographed entrance for the hero can:
 *   1. orange glow blooms (0ms)
 *   2. can drops from upper-right, over-rotates, settles to +6deg (spring, 180ms)
 *   3. tape strip pops with overshoot (560ms)
 *   4. MTN-4030 stamp slides down from above (700ms)
 */
export function HeroCan() {
  const reduced = useReducedMotion();

  if (reduced) {
    return <StaticCan />;
  }

  return (
    <div className="lg:col-span-4 relative">
      <div className="relative mx-auto w-[70%] sm:w-[50%] lg:w-full max-w-[420px] aspect-[3/4]">
        <motion.div
          aria-hidden
          className="absolute inset-0 -z-10 blur-3xl"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background:
              'radial-gradient(circle at 50% 40%, rgba(255,138,42,0.55), transparent 60%)',
          }}
        />

        <motion.div
          className="absolute inset-0 drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]"
          initial={{ opacity: 0, x: 90, y: -40, rotate: 22, scale: 0.82 }}
          animate={{ opacity: 1, x: 0, y: 0, rotate: 6, scale: 1 }}
          transition={{
            delay: 0.18,
            type: 'spring',
            stiffness: 95,
            damping: 14,
            mass: 0.9,
          }}
          style={{ transformOrigin: '60% 40%' }}
        >
          <ProductGraphic
            product={{
              id: 'hero',
              name: 'Montana BLACK 400 Mandarine',
              line: '',
              price: 0,
              kind: 'spray',
              hex: '#e25a15',
              image: '/products/cans/black-orange.png',
            }}
            variant="bare"
            eager
          />
        </motion.div>

        <motion.div
          className="absolute -bottom-2 -left-4 z-10"
          initial={{ opacity: 0, x: -30, y: 14, rotate: 14, scale: 0.6 }}
          animate={{ opacity: 1, x: 0, y: 0, rotate: -10, scale: 1 }}
          transition={{
            delay: 0.56,
            type: 'spring',
            stiffness: 220,
            damping: 12,
            mass: 0.5,
          }}
        >
          <div className="tape-strip px-4 py-2 font-display tracking-tightest text-lg">
            NOVÉ&nbsp;·&nbsp;MANDARINE
          </div>
        </motion.div>

        <motion.div
          className="absolute top-4 right-0 stamp bg-wall-deep/80 backdrop-blur"
          initial={{ opacity: 0, y: -24, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.7,
            type: 'spring',
            stiffness: 260,
            damping: 18,
          }}
        >
          <span className="size-1.5 rounded-full bg-[#e25a15]" />
          MTN-4030
        </motion.div>
      </div>
    </div>
  );
}

function StaticCan() {
  return (
    <div className="lg:col-span-4 relative">
      <div className="relative mx-auto w-[70%] sm:w-[50%] lg:w-full max-w-[420px] aspect-[3/4]">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 blur-3xl opacity-70"
          style={{
            background:
              'radial-gradient(circle at 50% 40%, rgba(255,138,42,0.55), transparent 60%)',
          }}
        />
        <div className="absolute inset-0 rotate-[6deg] drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]">
          <ProductGraphic
            product={{
              id: 'hero',
              name: 'Montana BLACK 400 Mandarine',
              line: '',
              price: 0,
              kind: 'spray',
              hex: '#e25a15',
              image: '/products/cans/black-orange.png',
            }}
            variant="bare"
            eager
          />
        </div>
        <div className="absolute -bottom-2 -left-4 rotate-[-10deg] z-10">
          <div className="tape-strip px-4 py-2 font-display tracking-tightest text-lg">
            NOVÉ&nbsp;·&nbsp;MANDARINE
          </div>
        </div>
        <div className="absolute top-4 right-0 stamp bg-wall-deep/80 backdrop-blur">
          <span className="size-1.5 rounded-full bg-[#e25a15]" />
          MTN-4030
        </div>
      </div>
    </div>
  );
}
