import '../pages/Home.css';
import constitutionPDF from '../assets/Constitution.pdf'; 

export default function Constitution() {
  return (
    <div className="home-wrapper">
      <div className="home-container">
        <section className="home-section pdfCard">
          <h1 className="home-heading" style={{ margin: '8px 12px 12px' }}>
            Constitution of the University of Guyana Cybersecurity Club
          </h1>

          <div className="pdfWrap">
            <iframe
              className="pdfFrame"
              src={`${constitutionPDF}#view=FitH`}
              title="UGCC Constitution"
            />
          </div>

          <p className="home-paragraph" style={{ marginTop: 10, textAlign: 'center' }}>
            Having trouble viewing? <a href={constitutionPDF}>Download the PDF</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
