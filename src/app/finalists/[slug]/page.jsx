import Image from 'next/image'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'

export const revalidate = 10
import { urlFor } from '@/sanity/lib/image'
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaSnapchat,
  FaWhatsapp,
  FaTelegram,
  FaXTwitter,
} from "react-icons/fa6";

import { RiThreadsLine } from "react-icons/ri";

import {
  Cake,
  MapPin,
  Heart,
  Gamepad2,
  BookOpen,
  BookX,
  GraduationCap,
  AlertCircle,
  Quote,
  Sparkles,
  Link as LinkIcon,
  Phone,
} from "lucide-react";
import ShareButton from '@/components/finalists/ShareButton'
import BackButton from '@/components/finalists/BackButton'

async function getFinalist(slug) {
  return await client.fetch(
    `*[_type == "finalist" && slug.current == $slug][0]`,
    { slug }
  )
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const finalist = await getFinalist(slug)

  if (!finalist) {
    return { title: 'Profile Not Found | Digital Elites' }
  }

  const title = `${finalist.fullName} ${finalist.nickname ? `("${finalist.nickname}")` : ''}`
  const description = `Read the graduating profile of ${finalist.fullName} from the ATBU Computer and Communication Engineering Class of 2026.`
  const imageUrl = finalist.photo 
    ? urlFor(finalist.photo).width(800).height(800).url() 
    : 'https://digitalelites.com.ng/digital-logo.jpeg'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://digitalelites.com.ng/finalists/${slug}`,
      siteName: 'Digital Elites',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: `${finalist.fullName}'s Profile Photo`,
        },
      ],
      locale: 'en_NG',
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

export default async function FinalistProfilePage({ params }) {
  const { slug } = await params
  const finalist = await getFinalist(slug)

  if (!finalist) {
    notFound()
  }

  return (
    <main style={{ paddingTop: '70px' }}>

      {/* Header */}
      <section style={{
        backgroundColor: 'var(--color-deep-blue)',
        padding: '2rem 2rem 6rem',
        textAlign: 'center',
        position: 'relative',
      }}>
        {/* Top Back Navigation Bar */}
        <div style={{
          maxWidth: '900px',
          margin: '0 auto 1.5rem',
          display: 'flex',
          justifyContent: 'flex-start',
        }}>
          <BackButton label="Back" fallbackHref="/finalists" />
        </div>

        <div style={{
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '5px solid var(--color-gold)',
          margin: '0 auto 1.5rem',
          position: 'relative',
          backgroundColor: 'rgba(255,255,255,0.1)',
        }}>
          {finalist.photo ? (
            <Image
              src={urlFor(finalist.photo).width(400).height(400).url()}
              alt={finalist.fullName}
              fill
              sizes="180px"
              style={{ objectFit: 'cover' }}
            />
          ) : null}
        </div>

        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: '700',
          color: 'var(--color-white)',
          marginBottom: '0.5rem',
        }}>
          {finalist.fullName}
        </h1>

        {finalist.nickname && (
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.1rem',
            color: 'var(--color-gold)',
            fontStyle: 'italic',
          }}>
            "{finalist.nickname}"
          </p>
        )}

        <ShareButton />

        {finalist.socialMediaHandles && finalist.socialMediaHandles.length > 0 && (
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            marginTop: '1.5rem',
            flexWrap: 'wrap',
          }}>
            {finalist.socialMediaHandles.map((social, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                padding: '8px 16px',
                borderRadius: '30px',
                border: '1px solid rgba(255,255,255,0.2)',
              }}>
                <SocialIcon platform={social.platform} />
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--color-white)',
                  fontWeight: '500',
                }}>
                  {social.handle}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Quote */}
      {finalist.personalQuote && (
        <section style={{
          maxWidth: '700px',
          margin: '-3rem auto 0',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 2,
        }}>
          <div style={{
            backgroundColor: 'var(--color-white)',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-start',
          }}>
            <Quote size={24} color="var(--color-gold)" style={{ flexShrink: 0 }} />
            <p style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.2rem',
              fontStyle: 'italic',
              color: 'var(--color-deep-blue)',
              lineHeight: '1.6',
            }}>
              {finalist.personalQuote}
            </p>
          </div>
        </section>
      )}

 {/* Info Sections */}
<style>{`
  .de-info-grid {
    max-width: 900px;
    margin: 0 auto;
    padding: 4rem 2rem;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
  }
  @media (max-width: 640px) {
    .de-info-grid {
      grid-template-columns: minmax(0, 1fr);
      padding: 2.5rem 1.25rem;
      gap: 1.25rem;
    }
  }
`}</style>

<section className="de-info-grid">

        {/* Personal Info */}
        <InfoCard title="Personal Information">
          <InfoRow icon={Cake} label="Birthday" value={finalist.birthday} />
          <InfoRow icon={MapPin} label="State of Origin" value={finalist.stateOfOrigin} />
          <InfoRow icon={Heart} label="Relationship Status" value={finalist.relationshipStatus} />
          <InfoRow icon={Gamepad2} label="Hobbies" value={finalist.hobbies} />
          <InfoRow icon={Phone} label="Phone Number" value={finalist.phoneNumber} />
        </InfoCard>

        {/* Academic Info */}
        <InfoCard title="Academic Information">
          <InfoRow icon={BookOpen} label="Favorite Course" value={finalist.favoriteCourse} />
          <InfoRow icon={BookX} label="Hardest Course" value={finalist.hardestCourse} />
          <InfoRow icon={GraduationCap} label="Favorite Lecturer" value={finalist.favoriteLecturer} />
          <InfoRow icon={AlertCircle} label="Most Stressful Level" value={finalist.mostStressfulLevel} />
        </InfoCard>

        {/* Fun Questions - full width */}
        <div style={{ gridColumn: '1 / -1' }}>
          <InfoCard title="Fun Questions" icon={Sparkles}>
            <InfoRow label="Class Crush" value={finalist.classCrush} />
            <InfoRow label="Best Experience" value={finalist.bestExperience} />
            <InfoRow label="ATBU In One Word" value={finalist.atbuInOneWord} />
            <InfoRow label="If Not Computer and Communication Engineering" value={finalist.ifNotComputerEngineering} />
          </InfoCard>
        </div>
      </section>
    </main>
  )
}

function InfoCard({ title, children }) {
  return (
    <div style={{
      backgroundColor: 'var(--color-light)',
      borderRadius: '10px',
      padding: '1.75rem',
      border: '1px solid var(--color-gray-light)',
    }}>
      <h3 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '1.1rem',
        fontWeight: '700',
        color: 'var(--color-deep-blue)',
        marginBottom: '1.25rem',
        borderBottom: '2px solid var(--color-gold)',
        paddingBottom: '0.6rem',
      }}>
        {title}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {children}
      </div>
    </div>
  )
}

function InfoRow({ icon: Icon, label, value }) {
  if (!value) return null
  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
      {Icon && <Icon size={16} color="var(--color-gold)" style={{ marginTop: '3px', flexShrink: 0 }} />}
      <div style={{ minWidth: 0, overflowWrap: 'anywhere' }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          fontWeight: '600',
          color: 'var(--color-gray)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '2px',
        }}>
          {label}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.95rem',
          color: 'var(--color-black)',
        }}>
          {value}
        </p>
      </div>
    </div>
  )
}

function SocialIcon({ platform }) {
  const iconProps = { size: 16, color: "var(--color-gold)" };

  switch (platform?.toLowerCase()) {
    case "instagram":
      return <FaInstagram {...iconProps} />;

    case "facebook":
      return <FaFacebook {...iconProps} />;

    case "twitter":
    case "x":
      return <FaXTwitter {...iconProps} />;

    case "linkedin":
      return <FaLinkedin {...iconProps} />;

    case "tiktok":
      return <FaTiktok {...iconProps} />;

    case "youtube":
      return <FaYoutube {...iconProps} />;

    case "threads":
      return <RiThreadsLine {...iconProps} />;

    case "snapchat":
      return <FaSnapchat {...iconProps} />;

    case "whatsapp":
      return <FaWhatsapp {...iconProps} />;

    case "telegram":
      return <FaTelegram {...iconProps} />;

    default:
      return <LinkIcon {...iconProps} />;
  }
}