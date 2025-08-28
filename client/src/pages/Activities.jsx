import { useEffect, useState } from 'react';
import { api } from '../api';

export default function Activities() {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  useEffect(() => {
    api.activities('upcoming').then(setUpcoming);
    api.activities('past').then(setPast);
  }, []);

  return (
    <>
      <h1>Activities</h1>
      <h2>Upcoming</h2>
      <ul>{upcoming.map(a => <li key={a.id}><strong>{a.title}</strong> — {a.start_date} ({a.location})</li>)}</ul>
      <h2>Past</h2>
      <ul>{past.map(a => <li key={a.id}><strong>{a.title}</strong> — {a.start_date}</li>)}</ul>
    </>
  );
}
