import { useEffect, useState } from 'react';
import { api } from '../api';

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser]       = useState(null);
  const [p, setP] = useState({ student_id:'', program:'', phone:'', bio:'', avatar_url:'', full_name:'' });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.getProfile().then(({ user, profile }) => {
      setUser(user);
      setP({ full_name:user.full_name, student_id:profile?.student_id || '', program:profile?.program || '', phone:profile?.phone || '', bio:profile?.bio || '', avatar_url:profile?.avatar_url || '' });
      setLoading(false);
    });
  }, []);

  function handleChange(e){ setP({ ...p, [e.target.name]: e.target.value }); }

  async function save(e){
    e.preventDefault();
    await api.saveProfile(p);
    setSaved(true);
  }

  if (loading) return <p>Loading…</p>;

  return (
    <>
      <h1>Welcome, {user.full_name}!</h1>
      <form onSubmit={save} style={{ display:'grid', gap:8, maxWidth:500 }}>
        <input name="full_name" value={p.full_name} onChange={handleChange} placeholder="Full name" />
        <input name="student_id" value={p.student_id} onChange={handleChange} placeholder="Student ID" />
        <input name="program" value={p.program} onChange={handleChange} placeholder="Program" />
        <input name="phone" value={p.phone} onChange={handleChange} placeholder="Phone" />
        <input name="avatar_url" value={p.avatar_url} onChange={handleChange} placeholder="Avatar URL" />
        <textarea name="bio" value={p.bio} onChange={handleChange} placeholder="Short bio" />
        <button type="submit">Save Profile</button>
      </form>
      {saved && <p style={{ color: 'green' }}>Profile saved.</p>}
    </>
  );
}
