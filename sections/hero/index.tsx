'use client'
import { motion } from 'framer-motion'
import type { Dictionary } from '@/lib/getDictionary'

type HeroContent = Dictionary['hero']

const HIDDEN = { opacity: 0, y: 28 }
const VISIBLE = { opacity: 1, y: 0 }
const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

function t(i: number) {
  return { delay: i * 0.11, duration: 0.75, ease }
}

export default function HeroSection({ content }: { content: HeroContent }) {
  return (
    <section
      id='hero'
      className='relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-16'
    >
      {/* Subtle dot-grid background */}
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          backgroundImage: `radial-gradient(circle, var(--color-border) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          opacity: 0.5,
          maskImage:
            'radial-gradient(ellipse 80% 80% at 20% 50%, black 20%, transparent 75%)',
        }}
      />

      {/* Accent blob */}
      <div
        className='absolute pointer-events-none'
        style={{
          width: '600px',
          height: '600px',
          top: '50%',
          left: '-10%',
          transform: 'translateY(-50%)',
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--color-accent) 6%, transparent) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      <div className='relative z-10 max-w-5xl'>
        <motion.p
          initial={HIDDEN}
          animate={VISIBLE}
          transition={t(0)}
          className='text-xs tracking-[0.35em] uppercase mb-8 font-mono'
          style={{ color: 'var(--color-text-muted)' }}
        >
          {content.greeting}
        </motion.p>

        <motion.h1
          initial={HIDDEN}
          animate={VISIBLE}
          transition={t(1)}
          className='font-display font-black leading-none mb-6'
          style={{
            fontSize: 'clamp(3.5rem, 11vw, 9.5rem)',
            color: 'var(--color-text)',
            letterSpacing: '-0.035em',
          }}
        >
          {content.name}
        </motion.h1>

        <motion.p
          initial={HIDDEN}
          animate={VISIBLE}
          transition={t(2)}
          className='font-display text-xl md:text-2xl font-semibold mb-5'
          style={{ color: 'var(--color-accent)' }}
        >
          {content.role}
        </motion.p>

        <motion.p
          initial={HIDDEN}
          animate={VISIBLE}
          transition={t(3)}
          className='text-base md:text-lg max-w-xl mb-12'
          style={{ color: 'var(--color-text-muted)', lineHeight: 1.75 }}
        >
          {content.tagline}
        </motion.p>

        <motion.div
          initial={HIDDEN}
          animate={VISIBLE}
          transition={t(4)}
          className='flex flex-wrap gap-4'
        >
          <a
            href='/cv.pdf'
            className='inline-flex items-center px-7 py-3.5 text-sm font-semibold tracking-wide transition-opacity duration-200 hover:opacity-85'
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-bg)',
            }}
          >
            {content.cta.cv}
          </a>
          <a
            href='#contact'
            className='inline-flex items-center px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-200'
            style={{
              border: '1px solid var(--color-accent)',
              color: 'var(--color-accent)',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                'color-mix(in srgb, var(--color-accent) 10%, transparent)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = 'transparent')
            }
          >
            {content.cta.contact}
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className='absolute bottom-10 left-6 md:left-12 lg:left-24 flex items-center gap-3'
        style={{ color: 'var(--color-text-muted)' }}
      >
        <div
          className='w-px h-10'
          style={{ backgroundColor: 'var(--color-border)' }}
        />
        <span className='text-xs tracking-[0.28em] uppercase font-mono'>
          Scroll
        </span>
      </motion.div>
    </section>
  )
}
