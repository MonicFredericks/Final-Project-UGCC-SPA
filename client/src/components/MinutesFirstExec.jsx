import '../pages/Home.css';
import minutesPDF from '../assets/Meeting Cybersecurity club.pdf';

export default function MinutesFirstExec() {
  return (
    <div className="home-wrapper">
      <div className="home-container">
        <section className="home-section pdfCard">
          <h1 className="home-heading" style={{ margin: '8px 12px 12px' }}>
            UGCC Minutes of First Executive Meeting
          </h1>

          <div className="pdfWrap">
            <iframe className="pdfFrame" src={`${minutesPDF}#view=FitH`} title="UGCC Minutes – First Executive" />
          </div>

          <p className="home-paragraph" style={{ marginTop: 10, textAlign: 'center' }}>
            Having trouble viewing? <a href={minutesPDF}>Download the PDF</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
