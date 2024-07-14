import type { Metadata, Viewport } from 'next'

export function getBaseUrl() {
  if (typeof window !== 'undefined') return window.location.origin
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

type SiteConfig = {
  meta: Metadata
  viewport: Viewport
}

export const siteConfig: SiteConfig = {
  meta: {
    metadataBase: new URL(getBaseUrl()),
    title: { default: 'Yukit', template: '%s | Yukit' },
    applicationName: 'Yukit',
    description: 'Yukit is a task management app that helps you stay organized and focused.',
    authors: { name: 'Tiesen', url: 'https://tiesen.id.vn' },
    creator: '@tiesen243',
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    openGraph: {
      type: 'website',
      url: getBaseUrl(),
      locale: 'vi_VN',
      siteName: 'Yukit',
      images: '/og',
    },
    alternates: { canonical: getBaseUrl() },
  },
  viewport: {
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: 'hsl(0 0% 100%)' },
      { media: '(prefers-color-scheme: dark)', color: 'hsl(240 10% 3.9%)' },
    ],
    width: 'device-width',
    initialScale: 1,
    maximumScale: 6,
    userScalable: true,
  },
}
