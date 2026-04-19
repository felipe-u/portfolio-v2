'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import type { NavDict, Locale } from '@/lib/getDictionary'
import { SECTION_IDS } from '@/data/sections'

interface NavbarClientProps {
  nav: NavDict
  lang: Locale
}

export default function NavbarClient({ nav, lang }: NavbarClientProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  function toggleLang() {
    const other: Locale = lang === 'en' ? 'es' : 'en'
    router.replace(pathname.replace(`/${lang}`, `/${other}`))
  }

  const links = SECTION_IDS.map((id) => ({
    id,
    label: nav[id],
    href: `#${id}`,
  }))

  return (
    <>
      <motion.nav
        className='fixed top-0 inset-x-0 z-50'
        style={{
          borderBottom: `1px solid ${scrolled ? 'var(--color-border)' : 'transparent'}`,
          backgroundColor: scrolled
            ? 'color-mix(in srgb, var(--color-bg) 85%, transparent)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition:
            'background-color 0.3s, border-color 0.3s, backdrop-filter 0.3s',
        }}
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className='max-w-6xl mx-auto px-6 h-16 flex items-center justify-between'>
          {/* Logo */}
          <a
            href='#hero'
            className='group flex items-center gap-px font-display text-xl font-bold select-none leading-none'
          >
            <span style={{ color: 'var(--color-accent)' }}>F</span>
            <span style={{ color: 'var(--color-text)' }}>U</span>
            <span
              className='ml-1 block w-1 h-1 rounded-full group-hover:scale-[2] transition-transform duration-300'
              style={{ backgroundColor: 'var(--color-accent)' }}
            />
          </a>

          {/* Desktop links */}
          <div className='hidden md:flex items-center gap-8'>
            {links.map(({ id, label, href }) => (
              <a
                key={id}
                href={href}
                className='relative text-xs tracking-[0.18em] uppercase font-sans group'
                style={{
                  color: 'var(--color-text-muted)',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = 'var(--color-text)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = 'var(--color-text-muted)')
                }
              >
                {label}
                <span
                  className='absolute -bottom-px left-0 w-0 h-px group-hover:w-full'
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    transition: 'width 0.3s',
                  }}
                />
              </a>
            ))}
          </div>

          {/* Lang toggle + hamburger */}
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2 text-xs tracking-[0.15em] font-sans select-none'>
              {(['en', 'es'] as Locale[]).map((l, i) => (
                <span key={l} className='flex items-center gap-2'>
                  {i > 0 && (
                    <span style={{ color: 'var(--color-border)' }}>·</span>
                  )}
                  <button
                    onClick={l !== lang ? toggleLang : undefined}
                    style={{
                      color:
                        l === lang
                          ? 'var(--color-accent)'
                          : 'var(--color-text-muted)',
                      fontWeight: l === lang ? 600 : 400,
                      cursor: l !== lang ? 'pointer' : 'default',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      if (l !== lang)
                        e.currentTarget.style.color = 'var(--color-text)'
                    }}
                    onMouseLeave={(e) => {
                      if (l !== lang)
                        e.currentTarget.style.color = 'var(--color-text-muted)'
                    }}
                  >
                    {l.toUpperCase()}
                  </button>
                </span>
              ))}
            </div>

            {/* Hamburger */}
            <button
              className='md:hidden flex flex-col justify-center gap-1.25 w-8 h-8'
              onClick={() => setMenuOpen((v) => !v)}
              aria-label='Toggle menu'
              style={{ color: 'var(--color-text)' }}
            >
              <motion.span
                className='block h-px w-full bg-current origin-center'
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className='block h-px w-full bg-current'
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className='block h-px w-full bg-current origin-center'
                animate={
                  menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.25 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className='fixed inset-0 z-40 md:hidden'
              style={{
                backgroundColor:
                  'color-mix(in srgb, var(--color-bg) 70%, transparent)',
                backdropFilter: 'blur(4px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className='fixed top-16 inset-x-0 z-40 md:hidden overflow-hidden'
              style={{
                backgroundColor: 'var(--color-surface)',
                borderBottom: '1px solid var(--color-border)',
              }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className='flex flex-col px-6 py-8 gap-6'>
                {links.map(({ id, label, href }, i) => (
                  <motion.a
                    key={id}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className='text-base tracking-[0.18em] uppercase font-sans'
                    style={{
                      color: 'var(--color-text-muted)',
                      transition: 'color 0.2s',
                    }}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.06 + 0.1,
                      duration: 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = 'var(--color-accent)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = 'var(--color-text-muted)')
                    }
                  >
                    {label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
