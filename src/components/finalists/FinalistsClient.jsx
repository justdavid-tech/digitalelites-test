'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { Search, User, Users, ArrowRight } from 'lucide-react'

const PAGE_SIZE = 12

export default function FinalistsClient({ finalists }) {
  const [query, setQuery] = useState('')
  const [genderFilter, setGenderFilter] = useState('All')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const filtered = useMemo(() => {
    let result = finalists

    if (genderFilter !== 'All') {
      result = result.filter((f) => f.gender === genderFilter)
    }

    if (query.trim()) {
      const q = query.toLowerCase()
      result = result.filter((f) =>
        f.fullName?.toLowerCase().includes(q) ||
        f.nickname?.toLowerCase().includes(q)
      )
    }

    return result
  }, [finalists, query, genderFilter])

  const visibleFinalists = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const handleFilterChange = (filter) => {
    setGenderFilter(filter)
    setVisibleCount(PAGE_SIZE)
  }

  const handleSearchChange = (e) => {
    setQuery(e.target.value)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <>
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
          Class of 2026
        </p>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: '700',
          color: 'var(--color-white)',
          marginBottom: '2.5rem',
        }}>
          Search Finalists
        </h1>

        {/* Search Bar */}
        <div style={{
          maxWidth: '500px',
          margin: '0 auto',
          position: 'relative',
        }}>
          <Search size={18} color="var(--color-white)" style={{
            position: 'absolute',
            left: '18px',
            top: '50%',
            transform: 'translateY(-50%)',
          }} />
          <input
            type="text"
            placeholder="Search by name or nickname..."
            value={query}
            onChange={handleSearchChange}
            style={{
              width: '100%',
              padding: '14px 18px 14px 48px',
              borderRadius: '30px',
              border: '2px solid white',
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              outline: 'none',
              color: 'white'
            }}
          />
        </div>
      </section>

      {/* Filters */}
      <section style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '2.5rem 2rem 0',
        display: 'flex',
        justifyContent: 'center',
        gap: '0.75rem',
        flexWrap: 'wrap',
      }}>
        {['All', 'Male', 'Female'].map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterChange(filter)}
            style={{
              padding: '8px 22px',
              borderRadius: '30px',
              border: genderFilter === filter
                ? '1px solid var(--color-deep-blue)'
                : '1px solid var(--color-gray-light)',
              backgroundColor: genderFilter === filter
                ? 'var(--color-deep-blue)'
                : 'transparent',
              color: genderFilter === filter
                ? 'var(--color-white)'
                : 'var(--color-gray)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {filter}
          </button>
        ))}
      </section>

      {/* Results count */}
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '1.5rem 2rem 0',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}>
        <Users size={14} color="var(--color-gray)" />
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          color: 'var(--color-gray)',
        }}>
          {filtered.length} finalist{filtered.length !== 1 ? 's' : ''} found
        </span>
      </div>

      {/* Grid */}
      <section style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '1.5rem 2rem 5rem',
      }}>
        {visibleFinalists.length > 0 ? (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '1.5rem',
            }}>
              {visibleFinalists.map((finalist) => (
                <Link
                  key={finalist._id}
                  href={`/finalists/${finalist.slug?.current}`}
                  style={{
                    textDecoration: 'none',
                    backgroundColor: 'var(--color-white)',
                    border: '1px solid var(--color-gray-light)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '1/1',
                    backgroundColor: 'var(--color-light)',
                  }}>
                    {finalist.photo ? (
                      <Image
                        src={urlFor(finalist.photo).width(400).height(400).url()}
                        alt={finalist.fullName}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 250px"
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <User size={40} color="var(--color-gray-light)" />
                      </div>
                    )}
                  </div>

                  <div style={{ padding: '1rem' }}>
                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1rem',
                      fontWeight: '700',
                      color: 'var(--color-deep-blue)',
                      marginBottom: '0.2rem',
                    }}>
                      {finalist.fullName}
                    </h3>
                    {finalist.nickname && (
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.85rem',
                        color: 'var(--color-gold)',
                        fontStyle: 'italic',
                        marginBottom: '0.75rem',
                      }}>
                        "{finalist.nickname}"
                      </p>
                    )}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      color: 'var(--color-deep-blue)',
                    }}>
                      View Profile
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <button
                  onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                  style={{
                    padding: '14px 36px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: 'var(--color-deep-blue)',
                    color: 'var(--color-white)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Load More Finalists
                </button>
              </div>
            )}
          </>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            backgroundColor: 'var(--color-light)',
            borderRadius: '10px',
          }}>
            <Search size={40} color="var(--color-gray)" style={{ marginBottom: '1rem' }} />
            <p style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.2rem',
              color: 'var(--color-deep-blue)',
              marginBottom: '0.5rem',
            }}>
              No finalists found
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'var(--color-gray)',
            }}>
              Try a different name or filter.
            </p>
          </div>
        )}
      </section>
    </>
  )
}