const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

exports.register = async (req, res) => {
  const { epastas, slaptazodis, vardas, pavarde, role_id } = req.body;

  if (!epastas || !slaptazodis || !vardas || !pavarde || !role_id) {
    return res.status(400).json({ error: 'Epastas, slaptazodis, vardas, pavarde, and role_id are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(slaptazodis, 10);
    const query = 'INSERT INTO naudotojas (epastas, slaptazodis, vardas, pavarde, role_id) VALUES (?, ?, ?, ?, ?)';
    await pool.execute(query, [epastas, hashedPassword, vardas, pavarde, role_id]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error registering user' });
  }
};

exports.login = async (req, res) => {
  const { epastas, slaptazodis } = req.body;

  if (!epastas || !slaptazodis) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const query = 'SELECT * FROM naudotojas WHERE epastas = ?';
  const [rows] = await pool.execute(query, [epastas]);

  if (rows.length === 0) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const user = rows[0];
  const match = await bcrypt.compare(slaptazodis, user.slaptazodis);

  if (match) {
    const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
    res.json({
      message: 'Login successful!',
      token,
      role_id: user.role_id,
      user_id: user.id
    });
  } else {
    res.status(403).json({ error: 'Invalid credentials' });
  }
};
