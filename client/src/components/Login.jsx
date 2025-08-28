import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../pages/Home.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      alert('Login successful');
      setForm({ email: '', password: '' });
      navigate('/', { replace: true });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="home-wrapper">
      <div className="home-container">
        <section className="home-section contact-card">
          <h2 className="home-heading">Login</h2>

          <form className="contactForm" onSubmit={onSubmit}>
            <div className="formRow">
              <label htmlFor="email">Email:</label>
              <input
                id="email" name="email" type="email" placeholder="Enter your email"
                value={form.email} onChange={onChange} required
              />
            </div>

            <div className="formRow">
              <label htmlFor="password">Password:</label>
              <input
                id="password" name="password" type="password" placeholder="Enter your password"
                value={form.password} onChange={onChange} required
              />
            </div>

            <button type="submit" className="sendBtn" disabled={loading}>
              {loading ? 'Signing in…' : 'Login'}
            </button>
          </form>

          <p className="home-paragraph" style={{ textAlign: 'center', marginTop: 12 }}>
            Don&apos;t have an account? <Link to="/register">Create one</Link>
          </p>
        </section>
      </div>
    </div>
  );
}
