import '../pages/Home.css';
import picturesPDF from '../assets/pictures.pdf';

export default function Pictures() {
  return (
    <div className="home-wrapper">
      <div className="home-container">
        <section className="home-section pdfCard">
          <h1 className="home-heading" style={{ margin: '8px 12px 12px' }}>
            UGCC Pictures / Learn More
          </h1>

          <div className="pdfWrap">
            <iframe
              className="pdfFrame"
              src={`${picturesPDF}#view=FitH`}
              title="UGCC Pictures"
            />
          </div>

          <p className="home-paragraph" style={{ marginTop: 10, textAlign: 'center' }}>
            Having trouble viewing? <a href={picturesPDF}>Download the PDF</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
