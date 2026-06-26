'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, GraduationCap } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Finalists', href: '/finalists' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Finalist of the Day', href: '/finalist-of-the-day' },
  { label: 'Countdown', href: '/countdown' },
  { label: 'About', href: '/about' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset'
  }, [menuOpen])

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: 'var(--color-deep-blue)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(201, 160, 43, 0.25)',
        transition: 'all 0.3s ease',
        height: '70px',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        padding: '0 2.5rem',
        gap: '1rem',
      }}>

        {/* LEFT — Logo */}
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
        }}>
          {/* <Image
            src="/logo-nav.png"
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
            letterSpacing: '0.5px',
            whiteSpace: 'nowrap',
          }}>
            Digital Elites
          </span>
        </Link>

        {/* MIDDLE — Nav Links (desktop) */}
        <ul className="desktop-nav" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                fontWeight: pathname === link.href ? '600' : '400',
                color: pathname === link.href
                  ? 'var(--color-gold)'
                  : 'var(--color-white)',
                textDecoration: 'none',
                letterSpacing: '0.3px',
                transition: 'color 0.2s ease',
                borderBottom: pathname === link.href
                  ? '2px solid var(--color-gold)'
                  : '2px solid transparent',
                paddingBottom: '2px',
              }}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* RIGHT — Class Badge + Mobile Button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '1rem',
        }}>
          {/* Class badge — desktop only */}
          <div className="desktop-nav" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(201, 160, 43, 0.15)',
            border: '1px solid rgba(201, 160, 43, 0.4)',
            borderRadius: '20px',
            padding: '5px 14px',
          }}>
            <GraduationCap size={14} color="var(--color-gold)" />
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.78rem',
              fontWeight: '600',
              color: 'var(--color-gold)',
              whiteSpace: 'nowrap',
              letterSpacing: '0.5px',
            }}>
              Class of 2026
            </span>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-white)',
              display: 'none',
              padding: '4px',
              lineHeight: 0,
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'var(--color-deep-blue)',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.77, 0, 0.175, 1)',
      }}>
        {/* Mobile Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '1rem',
        }}>
          <Image
            src="/logo.png"
            alt="Digital Elites Logo"
            width={44}
            height={44}
            style={{ objectFit: 'contain' }}
          />
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.4rem',
            fontWeight: '700',
            color: 'var(--color-white)',
          }}>
            Digital Elites
          </span>
        </div>

        {/* Gold divider */}
        <div style={{
          width: '40px',
          height: '2px',
          backgroundColor: 'var(--color-gold)',
        }} />

        {/* Mobile Links */}
        {navLinks.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.8rem',
              fontWeight: '700',
              color: pathname === link.href
                ? 'var(--color-gold)'
                : 'var(--color-white)',
              textDecoration: 'none',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.4s ease ${index * 0.07}s`,
              letterSpacing: '1px',
            }}
          >
            {link.label}
          </Link>
        ))}

        {/* Class badge — mobile */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginTop: '1rem',
          backgroundColor: 'rgba(201, 160, 43, 0.15)',
          border: '1px solid rgba(201, 160, 43, 0.4)',
          borderRadius: '20px',
          padding: '6px 18px',
        }}>
          <GraduationCap size={14} color="var(--color-gold)" />
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            fontWeight: '600',
            color: 'var(--color-gold)',
            letterSpacing: '0.5px',
          }}>
            Class of 2026
          </span>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          nav {
            padding: 0 1.25rem !important;
            grid-template-columns: 1fr auto !important;
          }
        }
      `}</style>
    </>
  )
}