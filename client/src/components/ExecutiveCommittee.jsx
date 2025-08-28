import '../pages/Home.css';

export default function ExecutiveCommittee() {
  return (
    <div className="home-wrapper">
      <div className="home-container">
        <section className="home-section">
          <h1 className="home-heading" style={{ textAlign: 'center', marginBottom: 12 }}>
            UG Cybersecurity Club
          </h1>
          <p className="home-paragraph" style={{ fontStyle: 'italic', margin: '0 0 12px 4px' }}>
            The Executive Committee (2018/2019)
          </p>

          <div className="gallery2">
            <figure className="photoFrame">
              <img className="photoImg" src="/1.jpg" alt="Executive committee (left)" />
            </figure>
            <figure className="photoFrame">
              <img className="photoImg" src="/2.jpg" alt="Executive committee (right)" />
            </figure>
          </div>
        </section>
      </div>
    </div>
  );
}
