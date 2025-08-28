import '../pages/Home.css';

export default function RegisterInterest() {
  function onSubmit(e) {
    e.preventDefault();
    alert('Thanks! We received your interest.');
    e.currentTarget.reset();
    e.currentTarget.querySelector('input, textarea')?.focus();
  }

  return (
    <div className="home-wrapper">
      <div className="home-container">
        <section className="home-section contact-card">
          <h2 className="home-heading">Register Your Interest</h2>
          <form className="contactForm" onSubmit={onSubmit}>
            <div className="formRow">
              <label htmlFor="firstName">First name:</label>
              <input id="firstName" type="text" placeholder="First name" required />
            </div>

            <div className="formRow">
              <label htmlFor="lastName">Last name:</label>
              <input id="lastName" type="text" placeholder="Last name" required />
            </div>

            <div className="formRow">
              <label htmlFor="email">Email:</label>
              <input id="email" type="email" placeholder="Email" required />
            </div>

            <div className="formRow">
              <label htmlFor="phone">Phone:</label>
              <input id="phone" type="tel" placeholder="Phone" />
            </div>

            <div className="formRow">
              <label htmlFor="program">Program:</label>
              <input id="program" type="text" placeholder="Program" />
            </div>
            <div className="formRow">
              <label htmlFor="reason">Why are you interested?</label>
              <textarea id="reason" rows="6" placeholder="Leave your message" required />
            </div>

            <button type="submit" className="sendBtn">Submit</button>
          </form>
        </section>
      </div>
    </div>
  );
}
