import 'server-only'
import type en from '../dictionaries/en.json'

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((m) => m.default),
  es: () => import('../dictionaries/es.json').then((m) => m.default),
}

export type Locale = keyof typeof dictionaries
export type Dictionary = typeof en
export type NavDict = Dictionary['nav']

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]()
