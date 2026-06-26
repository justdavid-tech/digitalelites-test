import AboutClient from './AboutClient'
import AboutDeveloper from '@/components/home/AboutDeveloper'

export const metadata = {
  title: 'About the Department',
  description: 'Learn more about the Computer Engineering department, our history, and academic leadership.',
  keywords: ['ATBU', 'Computer Engineering', 'Graduating Class of 2026'],
}

export default function AboutPage() {
  return (
    <>
      <AboutClient />
      <AboutDeveloper />
    </>
  )
}