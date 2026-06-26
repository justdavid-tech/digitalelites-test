import { Users, BookOpen, Image, Trophy } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: '80+',
    label: 'Total Finalists',
  },
  {
    icon: BookOpen,
    value: '50+',
    label: 'Finalist Profiles',
  },
  {
    icon: Image,
    value: '20+',
    label: 'Gallery Memories',
  },
  {
    icon: Trophy,
    value: '2026',
    label: 'Graduating Class',
  },
]

export default function Stats() {
  return (
    <section style={{
      backgroundColor: 'var(--color-white)',
      padding: '5rem 2rem',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
      }}>

        {/* Section Label */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.78rem',
          fontWeight: '600',
          color: 'var(--color-gold)',
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
          textAlign: 'center',
          marginBottom: '1rem',
        }}>
          By The Numbers
        </p>

        {/* Section Heading */}
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          fontWeight: '700',
          color: 'var(--color-deep-blue)',
          textAlign: 'center',
          marginBottom: '3.5rem',
          lineHeight: '1.2',
        }}>
          The Class of 2026 in Numbers
        </h2>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
        }}>
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '2.5rem 1.5rem',
                borderRadius: '8px',
                border: '1px solid var(--color-gray-light)',
                backgroundColor: 'var(--color-white)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}>

                {/* Top gold accent line */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  backgroundColor: 'var(--color-gold)',
                }} />

                {/* Icon */}
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(13, 43, 107, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}>
                  <Icon size={24} color="var(--color-deep-blue)" />
                </div>

                {/* Value */}
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                  fontWeight: '700',
                  color: 'var(--color-deep-blue)',
                  lineHeight: '1',
                  marginBottom: '0.5rem',
                }}>
                  {stat.value}
                </span>

                {/* Label */}
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--color-gray)',
                  fontWeight: '500',
                  letterSpacing: '0.3px',
                }}>
                  {stat.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}