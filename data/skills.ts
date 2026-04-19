export interface SkillItem {
  id: string
  name: string
  iconIdentifier: string
}

export interface SkillCategory {
  id: string
  skills: SkillItem[]
}

const skills: SkillCategory[] = [
  // TODO: fill in real data
  {
    id: 'frontend',
    skills: [
      { id: 'react', name: 'React', iconIdentifier: 'react' },
      { id: 'typescript', name: 'TypeScript', iconIdentifier: 'typescript' },
    ],
  },
  {
    id: 'backend',
    skills: [{ id: 'node', name: 'Node.js', iconIdentifier: 'nodejs' }],
  },
]

export const getSkills = (): SkillCategory[] => skills
