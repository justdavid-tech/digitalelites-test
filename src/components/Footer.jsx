import Link from 'next/link'
import Image from 'next/image'
import { Mail, Globe } from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Finalists', href: '/finalists' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Finalist of the Day', href: '/finalist-of-the-day' },
  { label: 'Countdown', href: '/countdown' },
  { label: 'About', href: '/about' },
]

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--color-deep-blue)',
      padding: '4rem 2rem 2rem',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
      }}>

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-10 md:gap-12 mb-12 pb-12 border-b border-white/10">

          {/* Brand */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '1rem',
            }}>
              {/* <Image
                src="/logo.png"
                alt="Digital Elites Logo"
                width={38}
                height={38}
                style={{ objectFit: 'contain' }}
              /> */}
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.2rem',
                fontWeight: '700',
                color: 'var(--color-white)',
              }}>
                Digital Elites
              </span>
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: '1.7',
              maxWidth: '320px',
            }}>
              The official digital yearbook of the Department of Computer
              Engineering, ATBU. Celebrating Excellence. Preserving Legacy.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              fontWeight: '700',
              color: 'var(--color-gold)',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.88rem',
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              fontWeight: '700',
              color: 'var(--color-gold)',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}>
              Connect
            </h4>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  <Icon size={16} color="var(--color-white)" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.82rem',
            color: 'rgba(255,255,255,0.5)',
          }}>
            © 2026 Digital Elites. All rights reserved.
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <Globe size={13} color="rgba(255,255,255,0.4)" />
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.82rem',
              color: 'rgba(255,255,255,0.5)',
            }}>
              Designed & Developed by <Link style={{ color: 'red', textDecoration: 'none' }} href="https://justdavidtech.com" target="_blank" rel="noopener noreferrer">justdavidtech</Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}