import { useEffect, useRef, useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const IMAGES = [
  { id: '1',  src: '/114.jpg', alt: 'UGCC photo 14' },
  { id: '2',  src: '/104.jpg', alt: 'UGCC photo 4' },
  { id: '11', src: '/106.jpg', alt: 'UGCC photo 6' },
  { id: '4',  src: '/107.jpg', alt: 'UGCC photo 7' },
  { id: '5',  src: '/108.jpg', alt: 'UGCC photo 8' },
  { id: '6',  src: '/109.jpg', alt: 'UGCC photo 9' },
  { id: '7',  src: '/110.jpg', alt: 'UGCC photo 10' },
  { id: '8',  src: '/111.jpg', alt: 'UGCC photo 11' },
  { id: '9',  src: '/112.jpg', alt: 'UGCC photo 12' },
  { id: '10', src: '/113.jpg', alt: 'UGCC photo 13' },
  { id: '3',  src: '/103.jpg', alt: 'UGCC photo 3' },
  { id: '12', src: '/115.jpg', alt: 'UGCC photo 15' },
];

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const hideTimer = useRef(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSent(true);
    setFormData({ name: '', email: '', message: '' }); 
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setSent(false), 4000);
  }

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <div className="home-wrapper">
      <div className="home-container">
        <section className="home-section">
          <h2 className="home-heading">About the Club</h2>
          <div className="about-scroll">
            <p className="home-paragraph">
              The Cybersecurity Club is for students who want to learn and utilize cybersecurity skills
              to fight the many threats in today&apos;s digital world and to educate community on the best
              cybersecurity practices. The University of Guyana Cybersecurity Club seeks to increase
              cybersecurity awareness and educate young students by fostering a security-minded environment
              through seminars and training sessions, where cybersecurity is prioritized. Therefore, the group
              consistently promotes awareness and works to improve the personal security of members of the public.
            </p>
            <p className="home-paragraph">
              Members collaborate on projects, share resources, and prepare for competitions,
              while building a supportive space for beginners and advanced learners alike.
            </p>
            <div style={{ marginTop: 8 }}>
              <Link to="/docs/pictures" className="learn-more">Learn More</Link>
            </div>
          </div>
        </section>

        <section className="home-section">
          <h2 className="home-heading">Awareness (Past Event)</h2>
          <Carousel images={IMAGES} />
        </section>
      </div>

      <section className="contact-section">
        <div className="join-cta">
          <a>Join Our Club</a>
        </div>

        <div className="home-container contact-grid">
          <section className="home-section contact-card">
            <h2 className="home-heading">Contact Us :</h2>

            {sent && (
              <div className="sentBanner" role="status" aria-live="polite">
                Your message has been sent. We will get back to you shortly.
              </div>
            )}
            <form className="contactForm" onSubmit={handleSubmit}>
              <div className="formRow">
                <label htmlFor="name">Your Name:</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  minLength={2}
                  maxLength={60}
                  pattern="[A-Za-z][A-Za-z .'\-]{1,59}"
                  title="Use letters, spaces, apostrophes (’ or '), periods (.), or hyphens (-), 2–60 characters."
                />
              </div>

              <div className="formRow">
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength={254}
                  inputMode="email"
                />
              </div>

              <div className="formRow">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Leave your message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  minLength={10}
                  maxLength={1000}
                />
              </div>

              <button type="submit" className="sendBtn">Send Message</button>
            </form>
          </section>

          <section className="home-section contact-card">
            <h2 className="home-heading">Visit or Call Us:</h2>

            <ul className="contactList">
              <li>
                <span className="emoji">📍</span>
                <a
                  className="contact-accent"
                  href="https://www.google.com/maps/place/University+of+Guyana/@6.8124181,-58.1203786,17z/data=!3m1!4b1!4m6!3m5!1s0x8dafee8b8961b077:0x4344fdd2804fe1ae!8m2!3d6.8124181!4d-58.1178037!16zL20vMDd0MmJn?entry=ttu&g_ep=EgoyMDI1MDgxOS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Directions: University of &nbsp;&nbsp;&nbsp;&nbsp;Guyana,Turkeyen Campus.
                </a>
              </li>

              <li>
                <span className="emoji">📞</span>
                <span className="contact-accent">225-4386</span>
              </li>

              <li>
                <span className="emoji">✉️</span>
                <a className="contact-accent" href="mailto:ugcc.csi@uog.edu.gy">
                  ugcc.csi@uog.edu.gy
                </a>
              </li>

              <li className="hours">
                <span className="emoji">🕒</span> <span className="contact-accent">Hours:</span>
                <ul>
                  <li>Mon–Fri: 9:00 AM – 5:00 PM</li>
                  <li>Sat: 10:00 AM – 4:00 PM</li>
                </ul>
              </li>
            </ul>
          </section>
        </div>
      </section>

      <footer className="footer">
        <p className="footerText">© 2025 UG Cybersecurity Club. All rights reserved.</p>
      </footer>
    </div>
  );
}

function Carousel({ images = [], intervalMs = 5000 }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images.length) return;
    const id = setInterval(() => {
      setIndex(prev => {
        const next = (prev + 1) % images.length;
        scrollToIndex(trackRef.current, next);
        return next;
      });
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  function onScroll(e) {
    const el = e.currentTarget;
    const w = el.clientWidth || 1;
    const newIdx = Math.round(el.scrollLeft / w);
    if (newIdx !== index) setIndex(newIdx);
  }

  return (
    <>
      <div className="carousel">
        <div className="carousel-track" ref={trackRef} onScroll={onScroll}>
          {images.map(img => (
            <div key={img.id} className="carousel-slide">
              <img className="carousel-image" src={img.src} alt={img.alt ?? ''} />
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === index ? 'is-active' : ''}`}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => {
              setIndex(i);
              scrollToIndex(trackRef.current, i);
            }}
          />
        ))}
      </div>
    </>
  );
}

function scrollToIndex(trackEl, i) {
  if (!trackEl) return;
  const w = trackEl.clientWidth || 0;
  trackEl.scrollTo({ left: i * w, behavior: 'smooth' });
}
