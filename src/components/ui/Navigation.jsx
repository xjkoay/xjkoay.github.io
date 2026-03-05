export default function Navigation({ sections, activeSection, onNavigate }) {
  return (
    <nav className="nav-dots" aria-label="Section navigation">
      {sections.map((section, i) => (
        <button
          key={section.id}
          className={`nav-dot ${activeSection === i ? 'active' : ''}`}
          data-label={section.label}
          onClick={() => onNavigate(i)}
          aria-label={`Navigate to ${section.label}`}
          title={section.label}
        />
      ))}
    </nav>
  )
}
