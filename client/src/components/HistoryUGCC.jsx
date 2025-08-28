import '../pages/Home.css';
import historyPDF from '../assets/Club History.pdf';

export default function HistoryUGCC() {
  return (
    <div className="home-wrapper">
      <div className="home-container">
        <section className="home-section pdfCard">
          <h1 className="home-heading" style={{ margin: '8px 12px 12px' }}>
            History – University of Guyana Cybersecurity Club
          </h1>

          <div className="pdfWrap">
            <iframe
              className="pdfFrame"
              src={`${historyPDF}#view=FitH`}
              title="UGCC History"
            />
          </div>

          <p className="home-paragraph" style={{ textAlign: 'center', marginTop: 10 }}>
            Having trouble viewing? <a href={historyPDF}>Download the PDF</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
