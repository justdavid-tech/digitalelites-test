import { Work_Sans, Bebas_Neue } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Splash from '@/components/Splash'

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-heading',
  display: 'swap',
})

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://digitalelites.com.ng/'),
  title: {
    default: 'Digital Elites | Computer and Communication Engineering ATBU',
    template: '%s | Digital Elites',
  },
  description: 'The Official Digital Yearbook of Computer and Communication Engineering, ATBU. Celebrating Excellence. Preserving Legacy.',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: 'https://digitalelites.com.ng/digital-logo.jpeg',
    shortcut: '/digital-logo.jpeg',
    apple: '/digital-logo.jpeg',
  },
  openGraph: {
    title: 'Digital Elites | Computer and Communication Engineering ATBU',
    description: 'The Official Digital Yearbook of Computer and Communication Engineering, ATBU. Celebrating Excellence. Preserving Legacy.',
    url: 'https://digitalelites.com.ng/',
    siteName: 'Digital Elites',
    images: [
      {
        url: 'https://digitalelites.com.ng/digital-logo.jpeg',
        width: 800,
        height: 800,
        alt: 'Digital Elites Logo',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Elites | Computer and Communication Engineering ATBU',
    description: 'The Official Digital Yearbook of Computer and Communication Engineering, ATBU. Celebrating Excellence. Preserving Legacy.',
    images: ['https://digitalelites-test.vercel.app/digital-logo.jpeg'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${workSans.variable}`}>
        <Splash duration={3000} >
          <Navbar />
          {children}
          <Footer />
        </Splash>
      </body>
    </html>
  )
}