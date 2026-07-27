import { client } from '@/sanity/lib/client'
import FinalistOfTheDayClient from '@/components/finalist-of-the-day/FinalistOfTheDayClient'

export const revalidate = 10

async function getFinalistOfTheDayData() {
  const current = await client.fetch(`
    *[_type == "finalistOfTheDay" && isActive == true][0] {
      dateFeautured,
      finalist-> {
        fullName,
        nickname,
        personalQuote,
        bestExperience,
        photo,
        slug,
        stateOfOrigin,
      }
    }
  `)

  const previous = await client.fetch(`
    *[_type == "finalistOfTheDay" && isActive != true] | order(dateFeautured desc) [0...12] {
      _id,
      dateFeautured,
      finalist-> {
        fullName,
        nickname,
        photo,
        slug,
      }
    }
  `)

  return { current, previous }
}

export default async function FinalistOfTheDayPage() {
  const { current, previous } = await getFinalistOfTheDayData()

  return (
    <main style={{ paddingTop: '70px', minHeight: '100vh' }}>
      <FinalistOfTheDayClient current={current} previous={previous} />
    </main>
  )
}