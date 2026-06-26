import { Work_Sans, M_PLUS_1p } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const mPlusU = M_PLUS_1p({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://digitalelites-test.vercel.app/'),
  title: {
    default: 'Digital Elites | Computer Engineering ATBU',
    template: '%s | Digital Elites',
  },
  description: 'The Official Digital Yearbook of Computer Engineering, ATBU. Celebrating Excellence. Preserving Legacy.',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: 'https://digitalelites-test.vercel.app/digital-logo.jpeg',
    shortcut: '/digital-logo.jpeg',
    apple: '/digital-logo.jpeg',
  },
  openGraph: {
    title: 'Digital Elites | Computer Engineering ATBU',
    description: 'The Official Digital Yearbook of Computer Engineering, ATBU. Celebrating Excellence. Preserving Legacy.',
    url: 'https://digitalelites-test.vercel.app/',
    siteName: 'Digital Elites',
    images: [
      {
        url: 'https://digitalelites-test.vercel.app/digital-logo.jpeg',
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
    title: 'Digital Elites | Computer Engineering ATBU',
    description: 'The Official Digital Yearbook of Computer Engineering, ATBU. Celebrating Excellence. Preserving Legacy.',
    images: ['https://digitalelites-test.vercel.app/digital-logo.jpeg'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${mPlusU.variable} ${workSans.variable}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}