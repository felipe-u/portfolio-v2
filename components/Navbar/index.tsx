import { getDictionary } from '@/lib/getDictionary'
import type { Locale } from '@/lib/getDictionary'
import NavbarClient from './NavbarClient'

export default async function Navbar({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang)
  return <NavbarClient nav={dict.nav} lang={lang} />
}
