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
  // TODO: fill in
  // {
  //   id: 'frontend',
  //   skills: [
  //     { id: 'react', name: 'React', iconIdentifier: 'react' },
  //   ],
  // },
]

export const getSkills = (): SkillCategory[] => skills
