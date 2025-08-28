import '../pages/Home.css';

export default function PdfPage({ title, src }) {
  return (
    <div className="home-wrapper">
      <div className="home-container">
        <section className="home-section pdfCard">
          <h1 className="home-heading" style={{ margin: '8px 12px 12px' }}>{title}</h1>

          <div className="pdfWrap">
            <iframe className="pdfFrame" src={`${src}#view=FitH`} title={title} />
          </div>

          <p className="home-paragraph" style={{ marginTop: 10, textAlign: 'center' }}>
            Having trouble viewing? <a href={src}>Download the PDF</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
