import type { Dictionary } from '@/lib/getDictionary'
import type { ExperienceItem } from '@/data/experience'

type ExperienceContent = Dictionary['experience']

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-')
  const d = new Date(parseInt(year), parseInt(month) - 1)
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

interface ExperienceSectionProps {
  content: ExperienceContent
  data: ExperienceItem[]
}

export default function ExperienceSection({
  content,
  data,
}: ExperienceSectionProps) {
  const itemsDict = content.items as Record<
    string,
    { role: string; description: string }
  >

  return (
    <section id='experience' className='py-32 px-6 md:px-12 lg:px-24'>
      <div className='max-w-4xl mx-auto'>
        {/* Section label */}
        <div className='flex items-center gap-4 mb-14'>
          <span className='font-mono text-xs tracking-widest text-accent'>
            01
          </span>
          <div
            className='flex-1 h-px'
            style={{ backgroundColor: 'var(--color-border)' }}
          />
        </div>

        <h2
          className='font-display font-bold mb-16 text-text'
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            letterSpacing: '-0.025em',
          }}
        >
          {content.title}
        </h2>

        {/* Timeline */}
        <div
          className='relative pl-8'
          style={{ borderLeft: '1px solid var(--color-border)' }}
        >
          {data.map((exp, i) => {
            const text = itemsDict[exp.id]
            const isLast = i === data.length - 1
            return (
              <div
                key={exp.id}
                className={isLast ? 'relative' : 'relative pb-14'}
              >
                {/* Timeline dot */}
                <div
                  className='absolute -left-8 top-1 w-2.5 h-2.5 rounded-full -translate-x-1/2'
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    outline: '3px solid var(--color-bg)',
                  }}
                />

                <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3'>
                  <div>
                    <a
                      href={exp.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='font-display font-bold text-xl text-text hover:text-accent transition-colors duration-200'
                    >
                      {exp.company}
                    </a>
                    {text?.role && (
                      <p className='text-sm mt-0.5 font-medium text-accent'>
                        {text.role}
                      </p>
                    )}
                  </div>
                  <p className='text-xs tracking-wide shrink-0 font-mono pt-0.5 text-text-muted'>
                    {formatDate(exp.startDate)}
                    {' — '}
                    {exp.endDate ? formatDate(exp.endDate) : content.present}
                  </p>
                </div>

                {text?.description && (
                  <p
                    className='text-sm mb-5 max-w-2xl text-text-muted'
                    style={{ lineHeight: 1.75 }}
                  >
                    {text.description}
                  </p>
                )}

                <div className='flex flex-wrap gap-2'>
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className='text-xs px-2.5 py-1 font-mono text-text-muted'
                      style={{ border: '1px solid var(--color-border)' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
