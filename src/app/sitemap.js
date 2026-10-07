import { client } from '@/sanity/lib/client'

const BASE_URL = 'https://digitalelites.com.ng/' // use your real domain

export default async function sitemap() {
  const finalists = await client.fetch(
    `*[_type == "finalist" && defined(slug.current)]{
      "slug": slug.current,
      _updatedAt
    }`
  )

  const pages = ['', '/finalists', '/about', '/gallery', '/finalist-of-the-day', '/countdown'].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }))

  const finalistPages = finalists.map((f) => ({
    url: `${BASE_URL}/finalists/${f.slug}`,
    lastModified: new Date(f._updatedAt),
  }))

  return [...pages, ...finalistPages]
}