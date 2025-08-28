import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

const app = express(); 


const ALLOWED = ['http://localhost:5173', 'http://127.0.0.1:5173'];
app.use(cors({
  origin: (origin, cb) => cb(null, !origin || ALLOWED.includes(origin)),
  credentials: true,
}));
app.use((req, res, next) => { res.setHeader('Vary', 'Origin'); next(); });

app.use(express.json());

app.use((req, _res, next) => {
  if (['POST','PUT','PATCH'].includes(req.method)) {
    console.log(`${req.method} ${req.url}`, req.body);
  }
  next();
});


const ah = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);


const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'ugcc',
  waitForConnections: true,
  connectionLimit: 10,
});
const q = (sql, params) => pool.execute(sql, params);

function requireAuth(req, res, next) {
  const token = (req.headers.authorization || '').split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Missing token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}


app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.get('/api/_debug/db', ah(async (_req, res) => {
  const [[{ db }]] = await q('SELECT DATABASE() AS db');
  const [tables] = await q('SHOW TABLES');
  res.json({ 
    db, 
    tables: tables.map(obj => Object.values(obj)[0]) 
  });
}));

app.get('/api/executives', ah(async (req, res) => {
  const scope = (req.query.scope || 'current').toLowerCase();
  const [rows] = await q(
    scope === 'past'
      ? 'SELECT * FROM executives WHERE term_end < CURDATE() ORDER BY term_end DESC'
      : 'SELECT * FROM executives WHERE term_start <= CURDATE() AND term_end >= CURDATE() ORDER BY role'
  );
  res.json(rows);
}));

app.get('/api/activities', ah(async (req, res) => {
  const scope = (req.query.scope || 'upcoming').toLowerCase();
  const [rows] = await q(
    scope === 'past'
      ? 'SELECT * FROM activities WHERE start_date < CURDATE() ORDER BY start_date DESC'
      : 'SELECT * FROM activities WHERE start_date >= CURDATE() ORDER BY start_date ASC'
  );
  res.json(rows);
}));

app.post('/api/interests', ah(async (req, res) => {
  const { first_name, last_name, email, phone, program, message } = req.body || {};
  const [r] = await q(
    'INSERT INTO interests(first_name,last_name,email,phone,program,message) VALUES (?,?,?,?,?,?)',
    [first_name, last_name, email, phone, program, message]
  );
  res.json({ ok: true, id: r.insertId, data: { first_name, last_name, email, phone, program, message } });
}));

app.get('/api/interests/:id', ah(async (req, res) => {
  const [rows] = await q('SELECT * FROM interests WHERE id=?', [req.params.id]);
  if (!rows.length) return res.status(404).json({ error: 'Not found' });
  res.json(rows[0]);
}));

app.post('/api/auth/register', ah(async (req, res) => {
  const { full_name, email, password } = req.body || {};
  console.log('REG1 body:', { full_name, email, hasPassword: !!password });

  if (!full_name || !email || !password) return res.status(400).json({ error: 'Missing fields' });

  const [existing] = await q('SELECT id FROM users WHERE email=?', [email]);
  console.log('REG2 existing rows:', existing.length);
  if (existing.length) return res.status(409).json({ error: 'Email already registered' });

  const hash = await bcrypt.hash(password, 10);
  console.log('REG3 hashCreated:', !!hash);

  const [result] = await q(
    'INSERT INTO users(full_name,email,password_hash) VALUES (?,?,?)',
    [full_name, email, hash]
  );
  console.log('REG4 insertId:', result.insertId);

  if (!process.env.JWT_SECRET) {
    console.log('REG5 missing JWT_SECRET');
    return res.status(500).json({ error: 'JWT_SECRET not set in .env' });
  }

  const token = jwt.sign({ id: result.insertId, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  console.log('REG6 tokenIssued:', !!token);
  res.json({ token, user: { id: result.insertId, full_name, email } });
}));

app.post('/api/auth/login', ah(async (req, res) => {
  const { email, password } = req.body || {};
  const [rows] = await q('SELECT id, full_name, password_hash FROM users WHERE email=?', [email]);
  if (!rows.length) return res.status(401).json({ error: 'Invalid email or password' });
  const user = rows[0];
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: 'Invalid email or password' });

  const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, full_name: user.full_name });
}));

app.get('/api/profile', requireAuth, ah(async (req, res) => {
  const userId = req.user.id;
  const [[user]] = await q('SELECT id, full_name, email FROM users WHERE id=?', [userId]);
  const [[profile]] = await q('SELECT * FROM profiles WHERE user_id=?', [userId]);
  res.json({ user, profile: profile || null });
}));

app.put('/api/profile', requireAuth, ah(async (req, res) => {
  const userId = req.user.id;
  const { full_name, student_id, program, phone, bio, avatar_url } = req.body || {};
  if (full_name) await q('UPDATE users SET full_name=? WHERE id=?', [full_name, userId]);
  await q(
    `INSERT INTO profiles(user_id,student_id,program,phone,bio,avatar_url)
     VALUES(?,?,?,?,?,?)
     ON DUPLICATE KEY UPDATE student_id=VALUES(student_id), program=VALUES(program),
     phone=VALUES(phone), bio=VALUES(bio), avatar_url=VALUES(avatar_url)`,
    [userId, student_id, program, phone, bio, avatar_url]
  );
  const [[user]] = await q('SELECT id, full_name, email FROM users WHERE id=?', [userId]);
  const [[profile]] = await q('SELECT * FROM profiles WHERE user_id=?', [userId]);
  res.json({ ok: true });
}));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const isDev = process.env.NODE_ENV !== 'production';
app.use((err, _req, res, _next) => {
  console.error(err);
  if (isDev) {
    return res.status(500).json({
      error: err.message,
      code: err.code,
      detail: err.sqlMessage || err.stack,
    });
  }
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`API running on port ${PORT}`));
