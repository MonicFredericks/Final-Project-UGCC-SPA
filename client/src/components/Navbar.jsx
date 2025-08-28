import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, clearToken } from '../api';
import './Navbar.css';

function Dropdown({ label, items }) {
  const [open, setOpen] = useState(false);
  const [placeRight, setPlaceRight] = useState(false);
  const ref = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  React.useLayoutEffect(() => {
    if (!open || !menuRef.current) return;
    const rect = menuRef.current.getBoundingClientRect();
    const overflowRight = rect.right - window.innerWidth;
    setPlaceRight(overflowRight > 0);
  }, [open]);

  return (
    <div className="dropdown" ref={ref}>
      <button
        type="button"
        className="pill link dropdownTrigger"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {label}
        <svg className="chev" width="14" height="14" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M5 7l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      {open && (
        <div
          ref={menuRef}
          className={`menu ${placeRight ? 'right' : 'left'}`}
          role="menu"
        >
          {items.map((it, i) =>
            it.to ? (
              <Link key={i} to={it.to} className="menuItem" role="menuitem" onClick={() => setOpen(false)}>
                {it.label}
              </Link>
            ) : (
              <button key={i} type="button" className="menuItem" role="menuitem">
                {it.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const loggedIn = !!getToken();

  function logout() {
    clearToken();
    navigate('/login');
  }


   const menus = [
  {
    label: 'Clubs Constitution',
    items: [
      { label: 'Constitution of the University of Guyana Cybersecurity Club', to: '/constitution' },
    ],
  },
  {
    label: 'Past-Executives Members',
    items: [
      { label: 'UGCC Elections (2022-2023 Academic Year)', to: '/elections-2022-2023' },
      { label: 'UGCC Minutes of first Executive Meeting', to: '/first-executive-minutes' },
      { label: 'The Executive Committee (2018/2019)', to: '/executive-committee' }
    ],
  },

    {
      label: 'Activities (Past-Executives)',
      items: [
        { label: 'Year in Review for UGCC 2018/2019', to: '/year-in-review-2018-2019' },
        { label: 'UGCC Year in Review 2019/2020', to: '/year-in-review-2019-2020' },
      ],
    },

    {
      label: 'Useful Information',
      items: [
        { label: 'History- University of Guyana Cybersecurity Club', to: '/history-ugcc' },
        { label: 'The UGCC participated in an OAS funded debate at the OAS HQ in Washington.', to: '/oas-debate' },
        { label: ' Career Day 2025.', to: '/career-day-2025' },
      ],
    },
  ];

  return (
    <nav className="navbar">
      <div className="brandRow">
        <Link to="/" className="brand">
          <img className="logo" src="/logo.png" alt="UGCC Logo" />
          <span className="brandText">
            University of Guyana
            <br />
            <span className="brandSub">Cybersecurity Club</span>
          </span>
        </Link>

        <div className="auth">
          {loggedIn ? (
            <>
              <Link className="pill action" to="/profile">My Profile</Link>
              <button type="button" className="pill action" onClick={logout}>Logout</button>
            </>
          ) : (
            <Link className="pill action" to="/login">Login</Link>
          )}
        </div>
      </div>

      <div className="linksRow">
        <div className="dropdown">
          <Link to="/" className="pill link dropdownTrigger noCaret" aria-label="Go to Home">
            Home
            <svg className="chev" width="14" height="14" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M5 7l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </Link>
        </div>
        {menus.map((m) => (
          <Dropdown key={m.label} label={m.label} items={m.items} />
        ))}
       <div className="dropdown">
         <Link to="/register-interest" className="pill link dropdownTrigger noCaret">
            Register Interest
            <svg className="chev" width="14" height="14" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M5 7l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
         </Link>
       </div>
      </div>
    </nav>
  );
}
