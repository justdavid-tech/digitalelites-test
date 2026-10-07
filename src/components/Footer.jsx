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
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1.2fr] gap-10 md:gap-12 mb-12 pb-12 border-b border-white/10">

          {/* Brand */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '1rem',
            }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: '700',
                color: 'var(--color-white)',
              }}>
                Digital <span style={{ color: 'var(--color-gold)' }}>Elites</span>
              </span>
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'rgba(255,255,255,0.65)',
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
                  className="footer-link"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.88rem',
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <a
                href="mailto:ugwuchinanu@gmail.com"
                className="footer-contact-link"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: 'rgba(255,255,255,0.75)',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-body)',
                  transition: 'all 0.2s ease',
                  wordBreak: 'break-all',
                }}
              >
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(201, 160, 43, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                }} className="footer-mail-icon">
                  <Mail size={15} color="var(--color-gold)" />
                </div>
                <span>ugwuchinanu@gmail.com</span>
              </a>

              <a
                href="mailto:info@justdavidtech.com"
                className="footer-contact-link"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: 'rgba(255,255,255,0.75)',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-body)',
                  transition: 'all 0.2s ease',
                  wordBreak: 'break-all',
                }}
              >
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(201, 160, 43, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                }} className="footer-mail-icon">
                  <Mail size={15} color="var(--color-gold)" />
                </div>
                <span>info@justdavidtech.com</span>
              </a>
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
              Designed & Developed by{' '}
              <Link
                style={{
                  color: 'var(--color-gold)',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                href="https://justdavidtech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-dev-link"
              >
                justdavidtech
              </Link>
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link:hover {
          color: var(--color-gold) !important;
          padding-left: 4px;
        }
        .footer-contact-link:hover {
          color: var(--color-gold) !important;
          transform: translateX(3px);
        }
        .footer-contact-link:hover .footer-mail-icon {
          background-color: rgba(201, 160, 43, 0.25) !important;
          border-color: var(--color-gold) !important;
          transform: scale(1.05);
        }
        .footer-dev-link:hover {
          color: #e8c96a !important;
          text-decoration: underline !important;
        }
      `}</style>
    </footer>
  )
}