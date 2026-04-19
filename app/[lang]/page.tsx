import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/lib/getDictionary'
import { getExperience } from '@/data/experience'
import { getProjects } from '@/data/projects'
import { getSkills } from '@/data/skills'
import HeroSection from '@/sections/hero'
import ExperienceSection from '@/sections/experience'
import ProjectsSection from '@/sections/projects'
import SkillsSection from '@/sections/skills'
import ContactSection from '@/sections/contact'
import FadeIn from '@/components/FadeIn'

export default async function Page({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params

  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)
  const experience = getExperience()
  const projects = getProjects()
  const skills = getSkills()

  return (
    <main>
      <HeroSection content={dict.hero} />
      <FadeIn>
        <ExperienceSection content={dict.experience} data={experience} />
      </FadeIn>
      <FadeIn>
        <ProjectsSection content={dict.projects} data={projects} />
      </FadeIn>
      <FadeIn>
        <SkillsSection content={dict.skills} data={skills} />
      </FadeIn>
      <FadeIn>
        <ContactSection
          content={dict.contact}
          email='felipe_uv@outlook.com'
          githubUrl='https://todo'
          linkedinUrl='https://todo'
        />
      </FadeIn>
    </main>
  )
}
