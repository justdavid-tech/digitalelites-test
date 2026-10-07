'use client'

import Image from 'next/image'
import {
  BookOpen, Target, Eye, Trophy, Quote, Code2,
  ExternalLink, Mail, User
} from 'lucide-react'

const leadership = [
  {
    name: 'Ag.HOD DCCE. Engr. A. Y. Nasir.',
    position: 'Head of Department',
    description: 'Provides academic leadership and strategic direction for the department.',
    photo: "/hod.jpeg",
  },
  {
    name: 'Engr. Kabiru I. Jahun',
    position: 'Registration and Records Officer, and Patron ACCES.',
    description: 'Oversees student registration and records while providing guidance and support as the Patron of ACCES.',
    photo: '/profile-1.jpeg',
  },
  {
    name: 'Usman Lamido',
    position: ' Chief Technogist, Computer and Communications engineering laboratory.',
    description: 'Leads the Computer and Communications Engineering Laboratory, managing technical resources and supporting teaching, research, and innovation.',
    photo: '/profile-2.jpeg'
  },
  {
    name: 'Dr. Usman I. Bature ',
    position: 'Computer Architecture and Embedded system Lecturer',
    description: 'Specializes in Computer Architecture and Embedded Systems, delivering practical and theoretical instruction for future engineers.',
    photo: '/profile-3.png',
  },
  {
    name: 'Engr. A. M. Hassan ',
    position: 'Examination Officer. 100L Adviser.',
    description: 'Manages examination activities and mentors 100-level students as their academic adviser.',
    photo: '/profile-4.jpeg',
  },
  {
    name: ' Dr. U. S. Toro ',
    position: 'Record/ Registration Officer',
    description: 'Serves as the Record and Registration Officer, specializing in Database Systems and Wireless Sensor Network research while lecturing and mentoring senior undergraduates.',
    photo: '/profile-5.jpg',
  },
]

export default function AboutClient() {
  return (
    <main style={{ paddingTop: '70px', minHeight: '100vh' }}>

      {/* Header */}
      <section style={{
        backgroundColor: 'var(--color-deep-blue)',
        padding: '4rem 2rem',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.78rem',
          fontWeight: '600',
          color: 'var(--color-gold)',
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
          marginBottom: '0.75rem',
        }}>
          Our Identity
        </p>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: '700',
          color: 'var(--color-white)',
        }}>
          About the Department
        </h1>
      </section>

      {/* Department Overview */}
      <section style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '4rem 2rem',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: '700',
          color: 'var(--color-deep-blue)',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <BookOpen size={24} color="var(--color-gold)" />
          Department History
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          color: 'var(--color-gray)',
          lineHeight: '1.8',
          marginBottom: '3rem',
        }}>
          The Department of Computer and Communication Engineering at Abubakar Tafawa
          Balewa University was established to train engineers capable of designing,
          building, and maintaining the hardware and software systems that power
          modern technology. Over the years, the department has grown into one of
          the most respected engineering programs in the institution, producing
          graduates who excel across the technology industry and beyond.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          marginBottom: '3rem',
        }}
          className="mission-vision-grid"
        >
          <div style={{
            backgroundColor: 'var(--color-light)',
            borderRadius: '12px',
            padding: '2rem',
            borderTop: '3px solid var(--color-gold)',
          }}>
            <Target size={22} color="var(--color-deep-blue)" style={{ marginBottom: '0.75rem' }} />
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.2rem',
              fontWeight: '700',
              color: 'var(--color-deep-blue)',
              marginBottom: '0.6rem',
            }}>
              Mission
            </h3>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.92rem',
              color: 'var(--color-gray)',
              lineHeight: '1.7',
            }}>
              To produce highly skilled, innovative, and ethical
              computer engineers equipped to solve real-world problems through
              technology.
            </p>
          </div>

          <div style={{
            backgroundColor: 'var(--color-light)',
            borderRadius: '12px',
            padding: '2rem',
            borderTop: '3px solid var(--color-gold)',
          }}>
            <Eye size={22} color="var(--color-deep-blue)" style={{ marginBottom: '0.75rem' }} />
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.2rem',
              fontWeight: '700',
              color: 'var(--color-deep-blue)',
              marginBottom: '0.6rem',
            }}>
              Vision
            </h3>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.92rem',
              color: 'var(--color-gray)',
              lineHeight: '1.7',
            }}>
              To be a leading center of excellence in computer
              engineering education, research, and innovation in Africa and beyond.
            </p>
          </div>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: '700',
          color: 'var(--color-deep-blue)',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <Trophy size={24} color="var(--color-gold)" />
          Achievements
        </h2>
        <ul style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.95rem',
          color: 'var(--color-gray)',
          lineHeight: '2',
          paddingLeft: '1.25rem',
        }}>
          <li>Consistently one of the top engineering departments in the university</li>
          <li>Graduates working at leading tech companies across Nigeria and beyond</li>
          <li>Multiple award-winning final year projects</li>
        </ul>
      </section>

      {/* HOD Message */}
      <section style={{
        backgroundColor: 'var(--color-deep-blue)',
        padding: '4rem 2rem',
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '220px 1fr',
          gap: '3rem',
          alignItems: 'center',
        }}
          className="hod-grid"
        >
          <div style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '5px solid var(--color-gold)',
            position: 'relative',
            backgroundColor: 'rgba(255,255,255,0.1)',
            margin: '0 auto',
          }}>
            <Image src="/hod.jpeg" alt="HOD" fill sizes="200px" style={{ objectFit: 'cover' }} />
          </div>

          <div>
            <Quote size={26} color="var(--color-gold)" style={{ marginBottom: '1rem' }} />
            <p style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              fontStyle: 'italic',
              color: 'var(--color-white)',
              lineHeight: '1.7',
              marginBottom: '1.5rem',
            }}>
              "It has been an honor watching this set of finalists
              grow from nervous first-year students into confident, capable
              engineers. This platform, Digital Elites, is a fitting tribute to
              the bonds you've built and the milestones you've achieved. I am
              incredibly proud of each and every one of you."
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              fontWeight: '700',
              color: 'var(--color-gold)',
            }}>
              Ag.HOD DCCE. Engr. A. Y. Nasir.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.6)',
            }}>
              Head of Department, Computer and Communication Engineering
            </p>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '4rem 2rem',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: '700',
          color: 'var(--color-deep-blue)',
          textAlign: 'center',
          marginBottom: '3rem',
        }}>
          Department Leadership
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
        }}>
          {leadership.map((person, index) => (
            <div key={index} style={{
              textAlign: 'center',
              backgroundColor: 'var(--color-light)',
              borderRadius: '12px',
              padding: '2rem 1.5rem',
              border: '1px solid var(--color-gray-light)',
            }}>
              <div style={{
                width: '300px',
                height: '300px',
                borderRadius: '10%',
                backgroundColor: 'var(--color-white)',
                border: '3px solid var(--color-gold)',
                margin: '0 auto 1rem',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {person.photo ? (
                  <Image src={person.photo} alt={person.name} fill sizes="120px" style={{ objectFit: 'cover' }} />
                ) : (
                  <User size={40} color="var(--color-gray-light)" />
                )}
              </div>
              <h4 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem',
                fontWeight: '700',
                color: 'var(--color-deep-blue)',
                marginBottom: '0.2rem',
              }}>
                {person.name}
              </h4>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem',
                fontWeight: '600',
                color: 'var(--color-gold)',
                marginBottom: '0.6rem',
              }}>
                {person.position}
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem',
                color: 'var(--color-gray)',
                lineHeight: '1.5',
              }}>
                {person.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 768px) {
          .mission-vision-grid {
            grid-template-columns: 1fr !important;
          }
          .hod-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
          }
        }
      `}</style>
    </main>
  )
}
