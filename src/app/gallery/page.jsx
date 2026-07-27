import { client } from '@/sanity/lib/client'
import GalleryClient from '@/components/gallery/GalleryClient'

export const revalidate = 10

export const metadata = {
  title: 'Class Gallery',
  description: 'Browse photos, videos, and memories of the Computer Engineering Class of 2026.',
}


async function getGalleryData() {
  const images = await client.fetch(`
    *[_type == "galleryImage"] | order(date desc) {
      _id,
      _type,
      _createdAt,
      image,
      caption,
      category,
      date,
    }
  `)

  const videos = await client.fetch(`
    *[_type == "galleryVideo"] | order(date desc) {
      _id,
      _type,
      _createdAt,
      video,
      thumbnail,
      caption,
      category,
      date,
    }
  `)

  return { images, videos }
}

export default async function GalleryPage() {
  const { images, videos } = await getGalleryData()

  return (
    <main style={{ paddingTop: '70px', minHeight: '100vh' }}>
      <GalleryClient images={images} videos={videos} />
    </main>
  )
}