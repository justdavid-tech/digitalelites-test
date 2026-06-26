import { client } from '@/sanity/lib/client'
import CountdownClient from '@/components/countdown/CountdownClient'

export const metadata = {
  title: 'Graduation Countdown',
  description: 'Countdown to the graduation ceremony of Computer Engineering, ATBU.',
}

async function getCountdownData() {
  const countdown = await client.fetch(`
    *[_type == "countdown"][0] {
      graduationDate,
      graduationMessage
    }
  `)

  const finalistPhotos = await client.fetch(`
    *[_type == "finalist" && defined(photo)] {
      _id,
      fullName,
      photo
    }
  `)

  return { countdown, finalistPhotos }
}

export default async function CountdownPage() {
  const { countdown, finalistPhotos } = await getCountdownData()

  return (
    <main style={{ paddingTop: '70px', minHeight: '100vh' }}>
      <CountdownClient
        graduationDate={countdown?.graduationDate}
        graduationMessage={countdown?.graduationMessage}
        finalistPhotos={finalistPhotos}
      />
    </main>
  )
}