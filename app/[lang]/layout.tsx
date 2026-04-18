import type { Metadata } from 'next'
import { Syne, Epilogue } from 'next/font/google'
import '@/app/globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
})

const epilogue = Epilogue({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Felipe U | Portfolio',
  description: 'Frontend Developer',
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }]
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params

  return (
    <html lang={lang} className={`${syne.variable} ${epilogue.variable}`}>
      <body>{children}</body>
    </html>
  )
}
