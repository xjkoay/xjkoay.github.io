export default function ContactSection() {
  return (
    <section className="contact-section" id="contact-section">
      <div className="contact-card">
        <h2 className="contact-title">Let's Connect</h2>
        <p className="contact-subtitle">
          Whether it's AI transformation, a creative collaboration, or just talking about one piece — I'd love to hear from you.
        </p>

        <div className="contact-links">
          <a
            className="contact-link"
            href="mailto:xjkoay@gmail.com"
          >
            <span className="contact-link-icon">✉️</span>
            xjkoay@gmail.com
          </a>

          <a
            className="contact-link"
            href="tel:+60175261320"
          >
            <span className="contact-link-icon">📱</span>
            +6017-526 1320
          </a>

          <a
            className="contact-link"
            href="https://linkedin.com/in/koay-xian-jing-118200155"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-link-icon">💼</span>
            LinkedIn Profile
          </a>
        </div>

        <div className="contact-company">
          <p className="contact-company-name">QuarkX</p>
          <p className="contact-company-desc">
            Tailored AI consulting & engineering services.
            From strategy to deployment — turning ambitions into production reality.
          </p>
        </div>

        <p style={{
          marginTop: '2rem',
          fontSize: '0.75rem',
          color: 'rgba(248, 250, 252, 0.3)',
          fontFamily: 'var(--font-mono)'
        }}>
          📍 Kuala Lumpur, Malaysia
        </p>
      </div>
    </section>
  )
}
