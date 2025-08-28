import '../pages/Home.css';
import electionsPDF from '../assets/Election2022-2023.pdf';

export default function Elections2022() {
  return (
    <div className="home-wrapper">
      <div className="home-container">
        <section className="home-section pdfCard">
          <h1 className="home-heading" style={{ margin: '8px 12px 12px' }}>
            UGCC Elections (2022–2023 Academic Year)
          </h1>

          <div className="pdfWrap">
            <iframe className="pdfFrame" src={`${electionsPDF}#view=FitH`} title="UGCC Elections 2022–2023" />
          </div>

          <p className="home-paragraph" style={{ marginTop: 10, textAlign: 'center' }}>
            Having trouble viewing? <a href={electionsPDF}>Download the PDF</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
