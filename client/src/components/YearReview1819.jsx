import '../pages/Home.css';
import pdf1819 from '../assets/Year 2018-2019.pdf';

export default function YearReview1819() {
  return (
    <div className="home-wrapper">
      <div className="home-container">
        <section className="home-section pdfCard">
          <h1 className="home-heading" style={{ margin: '8px 12px 12px' }}>
            Year in Review for UGCC 2018/2019
          </h1>
          <div className="pdfWrap">
            <iframe className="pdfFrame" src={`${pdf1819}#view=FitH`} title="UGCC Year in Review 2018/2019" />
          </div>
          <p className="home-paragraph" style={{ textAlign: 'center', marginTop: 10 }}>
            Having trouble viewing? <a href={pdf1819}>Download the PDF</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
