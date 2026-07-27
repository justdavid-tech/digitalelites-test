import { client } from '@/sanity/lib/client'
import FinalistsClient from '@/components/finalists/FinalistsClient'

export const revalidate = 10

export const metadata = {
  title: 'Search Finalists',
  description: 'Search and find student profiles of the graduating Class of 2026.',
}

async function getFinalists() {
  return await client.fetch(`
    *[_type == "finalist"] | order(isFeatured desc, fullName asc) {
      _id,
      fullName,
      nickname,
      slug,
      gender,
      photo,
      isFeatured,
    }
  `)
}
export default async function FinalistsPage() {
  const finalists = await getFinalists()

  return (
    <main style={{ paddingTop: '70px', minHeight: '100vh' }}>
      <FinalistsClient finalists={finalists} />
    </main>
  )
}