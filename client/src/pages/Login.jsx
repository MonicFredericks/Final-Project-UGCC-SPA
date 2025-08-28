import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, setToken } from '../api';

export default function Login() {
  const [mode, setMode] = useState('login'); 
  const [form, setForm] = useState({ full_name:'', email:'', password:'' });
  const [err, setErr] = useState('');
  const nav = useNavigate();

  function handleChange(e){ setForm({ ...form, [e.target.name]: e.target.value }); }

  async function submit(e){
    e.preventDefault();
    setErr('');
    try {
      const res = mode === 'login' ? await api.login(form) : await api.register(form);
      setToken(res.token);
      nav('/profile', { replace: true });
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <>
      <h1>{mode === 'login' ? 'Login' : 'Register'}</h1>
      {err && <p style={{color:'crimson'}}>{err}</p>}
      <form onSubmit={submit} style={{ display:'grid', gap:8, maxWidth:400 }}>
        {mode === 'register' && (
          <input name="full_name" placeholder="Full name" onChange={handleChange} required />
        )}
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">{mode === 'login' ? 'Login' : 'Create account'}</button>
      </form>
      <p style={{marginTop:8}}>
        {mode === 'login' ? 'No account yet?' : 'Already have an account?'}{' '}
        <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
          {mode === 'login' ? 'Register' : 'Login'}
        </button>
      </p>
    </>
  );
}
