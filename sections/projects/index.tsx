import type { Dictionary } from '@/lib/getDictionary'
import type { ProjectItem } from '@/data/projects'

type ProjectsContent = Dictionary['projects']

interface ProjectsSectionProps {
  content: ProjectsContent
  data: ProjectItem[]
}

export default function ProjectsSection({
  content,
  data,
}: ProjectsSectionProps) {
  const itemsDict = content.items as Record<
    string,
    { name: string; description: string }
  >

  return (
    <section
      id='projects'
      className='py-32 px-6 md:px-12 lg:px-24'
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <div className='max-w-6xl mx-auto'>
        {/* Section label */}
        <div className='flex items-center gap-4 mb-14'>
          <span className='font-mono text-xs tracking-widest text-accent'>
            02
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

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {data.map((project) => {
            const text = itemsDict[project.id]
            return (
              <article
                key={project.id}
                className='flex flex-col transition-transform duration-300 hover:-translate-y-1'
                style={{
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-surface-2)',
                }}
              >
                {/* Image / placeholder */}
                {project.imagePath ? (
                  <img
                    src={project.imagePath}
                    alt={text?.name ?? project.id}
                    className='w-full aspect-video object-cover'
                  />
                ) : (
                  <div
                    className='w-full aspect-video flex items-center justify-center'
                    style={{ backgroundColor: 'var(--color-bg)' }}
                  >
                    <span className='text-xs font-mono text-border'>
                      image pending
                    </span>
                  </div>
                )}

                <div className='p-6 flex flex-col flex-1 gap-4'>
                  <div>
                    <h3 className='font-display font-bold text-lg mb-2 text-text'>
                      {text?.name ?? project.id}
                    </h3>
                    {text?.description && (
                      <p
                        className='text-sm text-text-muted'
                        style={{ lineHeight: 1.7 }}
                      >
                        {text.description}
                      </p>
                    )}
                  </div>

                  {/* Tech pills */}
                  <div className='flex flex-wrap gap-1.5 mt-auto'>
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className='text-xs px-2 py-0.5 font-mono text-accent'
                        style={{
                          border:
                            '1px solid color-mix(in srgb, var(--color-accent) 35%, transparent)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div
                    className='flex gap-5 pt-4'
                    style={{ borderTop: '1px solid var(--color-border)' }}
                  >
                    <a
                      href={project.repoUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-xs tracking-[0.15em] uppercase text-text-muted hover:text-text transition-colors duration-200'
                    >
                      {content.viewRepo}
                    </a>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-xs tracking-[0.15em] uppercase text-text-muted hover:text-text transition-colors duration-200'
                      >
                        {content.viewDemo}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
