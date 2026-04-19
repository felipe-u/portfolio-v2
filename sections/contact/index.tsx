import type { Dictionary } from '@/lib/getDictionary'

type ContactContent = Dictionary['contact']

interface ContactSectionProps {
  content: ContactContent
  email: string
  githubUrl: string
  linkedinUrl: string
}

export default function ContactSection({
  content,
  email,
  githubUrl,
  linkedinUrl,
}: ContactSectionProps) {
  return (
    <section
      id='contact'
      className='py-32 px-6 md:px-12 lg:px-24'
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <div className='max-w-4xl mx-auto'>
        {/* Section label */}
        <div className='flex items-center gap-4 mb-14'>
          <span className='font-mono text-xs tracking-widest text-accent'>
            04
          </span>
          <div
            className='flex-1 h-px'
            style={{ backgroundColor: 'var(--color-border)' }}
          />
        </div>

        <h2
          className='font-display font-bold mb-10 text-text'
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            letterSpacing: '-0.025em',
          }}
        >
          {content.title}
        </h2>

        <p
          className='text-base md:text-lg max-w-xl mb-12 text-text-muted'
          style={{ lineHeight: 1.75 }}
        >
          {content.description}
        </p>

        <a
          href={`mailto:${email}`}
          className='inline-flex items-center gap-2 font-display font-bold mb-14 text-accent hover:opacity-75 transition-opacity duration-200 group'
          style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}
        >
          {content.emailLabel}
          <span className='inline-block transition-transform duration-200 group-hover:translate-x-1'>
            →
          </span>
        </a>

        <div className='flex gap-8'>
          <a
            href={githubUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='text-sm tracking-[0.18em] uppercase font-mono text-text-muted hover:text-text transition-colors duration-200'
          >
            {content.links.github}
          </a>
          <a
            href={linkedinUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='text-sm tracking-[0.18em] uppercase font-mono text-text-muted hover:text-text transition-colors duration-200'
          >
            {content.links.linkedin}
          </a>
        </div>
      </div>
    </section>
  )
}
