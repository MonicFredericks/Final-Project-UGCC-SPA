import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../pages/Home.css';

export default function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();

    if (form.password !== form.confirm) {
      alert('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      alert('Registration successful. Please log in.');
      setForm({ firstName: '', lastName: '', email: '', password: '', confirm: '' });
      navigate('/login', { replace: true });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="home-wrapper">
      <div className="home-container">
        <section className="home-section contact-card">
          <h2 className="home-heading">Create Account</h2>

          <form className="contactForm" onSubmit={onSubmit}>
            <div className="formRow">
              <label htmlFor="firstName">First name:</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First name"
                value={form.firstName}
                onChange={onChange}
                required
              />
            </div>

            <div className="formRow">
              <label htmlFor="lastName">Last name:</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last name"
                value={form.lastName}
                onChange={onChange}
                required
              />
            </div>

            <div className="formRow">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={onChange}
                required
              />
            </div>

            <div className="formRow">
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={onChange}
                required
              />
            </div>

            <div className="formRow">
              <label htmlFor="confirm">Confirm password:</label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                placeholder="Confirm password"
                value={form.confirm}
                onChange={onChange}
                required
              />
            </div>

            <button type="submit" className="sendBtn" disabled={loading}>
              {loading ? 'Creating account…' : 'Register'}
            </button>
          </form>

          <p className="home-paragraph" style={{ textAlign: 'center', marginTop: 12 }}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </section>
      </div>
    </div>
  );
}
