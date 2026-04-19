import type { Dictionary } from '@/lib/getDictionary'
import type { SkillCategory } from '@/data/skills'

type SkillsContent = Dictionary['skills']

interface SkillsSectionProps {
  content: SkillsContent
  data: SkillCategory[]
}

export default function SkillsSection({ content, data }: SkillsSectionProps) {
  const categoriesDict = content.categories as Record<string, string>

  return (
    <section id='skills' className='py-32 px-6 md:px-12 lg:px-24'>
      <div className='max-w-4xl mx-auto'>
        {/* Section label */}
        <div className='flex items-center gap-4 mb-14'>
          <span className='font-mono text-xs tracking-widest text-accent'>
            03
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

        <div className='flex flex-col gap-14'>
          {data.map((category) => {
            const label = categoriesDict[category.id] ?? category.id
            return (
              <div key={category.id}>
                <p className='text-xs tracking-[0.28em] uppercase font-mono mb-6 text-text-muted'>
                  {label}
                </p>
                <div className='flex flex-wrap gap-3'>
                  {category.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className='px-4 py-2.5 text-sm font-medium text-text hover:text-accent border border-border hover:border-accent transition-colors duration-200 cursor-default'
                      style={{ backgroundColor: 'var(--color-surface)' }}
                    >
                      {skill.name}
                    </div>
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
