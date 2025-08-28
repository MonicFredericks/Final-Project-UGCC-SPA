import { useState } from 'react';
import { api } from '../api';

export default function RegisterInterest() {
  const [form, setForm] = useState({ first_name:'', last_name:'', email:'', phone:'', program:'', message:'' });
  const [ok, setOk] = useState(false);

  function handleChange(e){ setForm({ ...form, [e.target.name]: e.target.value }); }
  async function submit(e){
    e.preventDefault();
    await api.registerInterest(form);
    setOk(true);
  }

  if (ok) return <p>Thanks! We’ve recorded your interest and will contact you soon.</p>;

  return (
    <>
      <h1>Register Your Interest</h1>
      <form onSubmit={submit} style={{ display:'grid', gap:8, maxWidth:500 }}>
        <input name="first_name" placeholder="First name" onChange={handleChange} required />
        <input name="last_name" placeholder="Last name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <input name="program" placeholder="Program" onChange={handleChange} />
        <textarea name="message" placeholder="Why are you interested?" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
