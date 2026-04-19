export const SECTION_IDS = [
  'hero',
  'experience',
  'projects',
  'skills',
  'contact',
] as const
export type SectionId = (typeof SECTION_IDS)[number]
