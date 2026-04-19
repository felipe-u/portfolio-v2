export interface ExperienceItem {
  id: string
  company: string
  url: string
  startDate: string
  endDate: string | null // null = present
  tech: string[]
}

const experience: ExperienceItem[] = [
  // TODO: fill in
  // {
  //   id: 'company-slug',
  //   company: 'Company Name',
  //   url: 'https://todo',
  //   startDate: '2023-01',
  //   endDate: null,
  //   tech: ['React', 'TypeScript'],
  // },
]

export const getExperience = (): ExperienceItem[] => experience
