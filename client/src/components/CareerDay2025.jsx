import '../pages/Home.css';

const PICS = [
  '/11.jpg',
  '/12.jpg',
  '/14.jpg',
  '/15.jpg',
  '/13.jpg',
];

export default function CareerDay2025() {
  return (
    <div className="home-wrapper">
      <div className="home-container">
        <section className="home-section">
          <h1 className="home-heading" style={{ textAlign: 'center', marginBottom: 12 }}>
            UG Cybersecurity Club
          </h1>
          <p className="home-paragraph" style={{ fontStyle: 'italic', margin: '0 0 12px 4px' }}>
            Career Day 2025
          </p>
          <div className="galleryGrid">
            {PICS.map((src, i) => (
              <figure key={i} className="photoFrame">
                <img className="photoImg" src={src} alt={`Career Day 2025 photo ${i + 1}`} />
              </figure>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
