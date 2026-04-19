export interface ProjectItem {
  id: string
  repoUrl: string
  demoUrl: string | null
  imagePath: string | null
  tech: string[]
}

const projects: ProjectItem[] = [
  // TODO: fill in real data
  {
    id: 'project-slug',
    repoUrl: 'https://todo',
    demoUrl: null,
    imagePath: null,
    tech: ['React', 'TypeScript'],
  },
]

export const getProjects = (): ProjectItem[] => projects
