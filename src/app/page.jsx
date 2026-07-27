import Hero from '@/components/home/Hero'
import Stats from '@/components/home/Stats'
import FinalistOfTheDayPreview from '@/components/home/FinalistOfTheDayPreview'
import CountdownPreview from '@/components/home/CountdownPreview'
import GalleryPreview from '@/components/home/GalleryPreview'
import DepartmentOverview from '@/components/home/DepartmentOverview'
import AboutDeveloper from '@/components/home/AboutDeveloper'
import { client } from '@/sanity/lib/client'

export const revalidate = 10

async function getCountdown() {
  return await client.fetch(`
    *[_type == "countdown"][0] {
      graduationDate,
      graduationMessage
    }
  `)
}

async function getFinalists() {
  return await client.fetch(`
    *[_type == "finalist"] | order(isFeatured desc, fullName asc) {
      _id,
      fullName,
      nickname,
      photo
    }
  `)
}

export default async function Home() {
  const [countdown, finalists] = await Promise.all([
    getCountdown(),
    getFinalists()
  ])

  return (
    <main>
      <Hero finalists={finalists} />
      <Stats />
      <FinalistOfTheDayPreview />
      <CountdownPreview graduationDate={countdown?.graduationDate} />
      <GalleryPreview />
      <DepartmentOverview />
      <AboutDeveloper />
    </main>
  )
}