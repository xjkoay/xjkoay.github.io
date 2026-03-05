import { useEffect, useRef, useState } from 'react'

export default function SectionOverlay({ section, isActive }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      className={`section ${section.align === 'right' ? '' : ''}`}
      ref={ref}
      id={`section-${section.id}`}
    >
      <div className={`section-content ${section.align === 'right' ? 'section-content--right' : ''}`}>
        <div className={`info-panel ${visible ? 'visible' : ''}`}>
          <span className="info-panel-icon">{section.icon}</span>
          <h2 className="info-panel-title">{section.title}</h2>
          <p className="info-panel-subtitle">{section.subtitle}</p>
          <p className="info-panel-description">{section.description}</p>
          {section.tags && (
            <div className="info-panel-tags">
              {section.tags.map((tag, i) => (
                <span
                  key={i}
                  className={`tag ${tag.variant ? `tag--${tag.variant}` : ''}`}
                >
                  {tag.text}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
