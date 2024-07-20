import type { MetadataRoute } from 'next'

import { getBaseUrl } from '@/lib/site'

interface Route {
  url: string
  lastModified: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesMap: Route[] = ['', 'landing', 'sign-in', 'sign-up'].map((route) => ({
    url: `${getBaseUrl()}/${route}`,
    lastModified: new Date().toISOString(),
  }))

  let fetchedRoutes: Route[] = []
  try {
    fetchedRoutes = (await Promise.all([])).flat()
  } catch (error) {
    throw JSON.stringify(error, null, 2)
  }

  return [...routesMap, ...fetchedRoutes]
}
