'use client'
import Image from 'next/image'
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from 'react-icons/fa'
import { FaXTwitter, FaThreads } from 'react-icons/fa6'
import { ExternalLink, Code2 } from 'lucide-react'

const socialLinks = [
  {
    icon: FaGithub,
    name: 'GitHub',
    url: 'https://github.com/justdavid-tech',
  },
  {
    icon: FaLinkedin,
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/justdavid-tech-219296367',
  },
  {
    icon: FaXTwitter,
    name: 'X',
    url: 'https://x.com/justdavid_tech',
  },
  {
    icon: FaFacebook,
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=100086701681128',
  },
  {
    icon: FaInstagram,
    name: 'Instagram',
    url: 'https://www.instagram.com/justdavid_tech',
  },
  {
    icon: FaThreads,
    name: 'Threads',
    url: 'https://www.threads.com/@justdavid_tech',
  },
  {
    icon: FaTiktok,
    name: 'TikTok',
    url: 'https://www.tiktok.com/@justdavidtech',
  },
  {
    icon: FaWhatsapp,
    name: 'WhatsApp',
    url: 'https://wa.me/2349039977439',
  },
  {
    icon: FaYoutube,
    name: 'YouTube',
    url: 'https://youtube.com/@justdavid_tech',
  },
]

export default function AboutDeveloper() {
  return (
    <>
      <style>{`
        .dev-btn-primary {
          transition: all 0.25s ease !important;
        }
        .dev-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(13, 43, 107, 0.2);
          background-color: var(--color-deep-blue-dark) !important;
        }
        .dev-btn-secondary {
          transition: all 0.25s ease !important;
        }
        .dev-btn-secondary:hover {
          transform: translateY(-2px);
          background-color: rgba(13, 43, 107, 0.05) !important;
          border-color: var(--color-deep-blue) !important;
        }
        .dev-social-icon {
          transition: all 0.25s ease !important;
        }
        .dev-social-icon:hover {
          transform: translateY(-3px);
          background-color: var(--color-gold) !important;
          color: var(--color-white) !important;
          border-color: var(--color-gold) !important;
          box-shadow: 0 4px 12px rgba(201, 160, 43, 0.25);
        }
        @media (max-width: 480px) {
          .dev-cta-container {
            flex-direction: column !important;
            align-items: stretch !important;
            padding: 0 1rem;
          }
          .dev-btn-primary, .dev-btn-secondary {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>

      <section style={{
        backgroundColor: 'var(--color-white)',
        padding: '5rem 2rem',
      }}>
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          textAlign: 'center',
        }}>

          {/* Profile Image */}
          <div style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            border: '4px solid var(--color-white)',
            boxShadow: '0 8px 30px rgba(13, 43, 107, 0.15)',
            overflow: 'hidden',
            position: 'relative',
            margin: '0 auto 1.5rem',
          }}>
            <Image 
              src="/developer.jpg" 
              alt="Justdavidtech" 
              fill 
              style={{ objectFit: 'cover' }} 
              sizes="150px"
            />
          </div>

          {/* Label */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.78rem',
            fontWeight: '600',
            color: 'var(--color-gold)',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}>
            Designed and Developed By
          </p>

          {/* Name */}
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: '700',
            color: 'var(--color-deep-blue)',
            marginBottom: '0.3rem',
          }}>
            Justdavidtech
          </h2>

          {/* Handle */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            color: 'var(--color-gold)',
            fontStyle: 'italic',
            marginBottom: '0.75rem',
            letterSpacing: '0.5px',
          }}>
            @justdavidtech.com
          </p>

          {/* Title */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: 'var(--color-gray)',
            marginBottom: '1.5rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            Web Designer & Developer
          </p>

          {/* Divider */}
          <div style={{
            width: '40px',
            height: '2px',
            backgroundColor: 'var(--color-gold)',
            margin: '0 auto 1.5rem',
          }} />

          {/* Bio */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--color-black)',
            lineHeight: '1.8',
            marginBottom: '2.5rem',
          }}>
            I bring ideas to life through clean, modern, and purposeful web experiences.
            From concept to deployment, I specialize in crafting digital products that
            are fast, beautiful, and built to last. Digital Elites is one of those
            products built with care for the Class of 2026.
          </p>

          {/* CTA Buttons */}
          <div className="dev-cta-container" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '3rem',
          }}>
            <a
              href="https://justdavidtech.com/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="dev-btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'var(--color-deep-blue)',
                color: 'var(--color-white)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                fontWeight: '700',
                padding: '12px 28px',
                borderRadius: '4px',
                textDecoration: 'none',
              }}
            >
              <ExternalLink size={16} />
              View Projects
            </a>
            <a
              href="https://justdavidtech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="dev-btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'transparent',
                color: 'var(--color-deep-blue)',
                border: '1px solid var(--color-deep-blue)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                fontWeight: '700',
                padding: '12px 28px',
                borderRadius: '4px',
                textDecoration: 'none',
              }}
            >
              <ExternalLink size={16} />
              Explore Website
            </a>
          </div>

          {/* Social Links */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}>
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                  className="dev-social-icon"
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(13, 43, 107, 0.05)',
                    border: '1px solid rgba(13, 43, 107, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    color: 'var(--color-deep-blue)',
                    textDecoration: 'none',
                  }}
                >
                  <Icon size={18} />
                </a>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}