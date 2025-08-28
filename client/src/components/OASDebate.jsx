import '../pages/Home.css';

const PICS = [
  '/01.jpg',
  '/02.jpg',
  '/03.jpg',
  '/04.jpg',
  '/05.jpg',
  '/06.jpg',
  '/07.jpg',
  '/08.jpg',
  '/09.jpg',
  '/10.jpg',
];

export default function OASDebate() {
  return (
    <div className="home-wrapper">
      <div className="home-container">
        <section className="home-section">

          <h1 className="home-heading" style={{ textAlign: 'center', marginBottom: 12 }}>
            UG Cybersecurity Club
          </h1>

          <p className="home-paragraph" style={{ fontStyle: 'italic', margin: '0 0 12px 4px' }}>
            The UGCC participated in an OAS-funded debate at the OAS HQ in Washington
          </p>

          <div className="galleryGrid">
            {PICS.map((src, i) => (
              <figure key={i} className="photoFrame">
                <img className="photoImg" src={src} alt={`OAS debate photo ${i + 1}`} />
              </figure>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
