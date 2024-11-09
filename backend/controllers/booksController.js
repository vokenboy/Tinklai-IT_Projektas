const pool = require('../db');

exports.getBooks = async (req, res) => {
  const query = `
    SELECT knyga.id, knyga.pavadinimas, knyga.autorius, zanras.zanras_name AS zanras, knyga.kopiju_kiekis
    FROM knyga
    LEFT JOIN zanras ON knyga.zanras_id = zanras.id
  `;

  try {
    const [results] = await pool.query(query);
    res.json(results);
  } catch (error) {
    console.error('Nepavyko gauti knygų:', error);
    res.status(500).json({ error: 'Duomenų bazės klaida' });
  }
};

exports.addBook = async (req, res) => {
  const { pavadinimas, autorius, zanras_id, kopiju_kiekis } = req.body;

  if (!pavadinimas || !autorius || !zanras_id || !kopiju_kiekis) {
    return res.status(400).json({ error: 'Visi laukai turi būti užpildyti' });
  }

  const query = 'INSERT INTO knyga (pavadinimas, autorius, zanras_id, kopiju_kiekis) VALUES (?, ?, ?, ?)';
  const values = [pavadinimas, autorius, zanras_id, kopiju_kiekis];

  try {
    const [zanrasCheck] = await pool.query('SELECT id FROM zanras WHERE id = ?', [zanras_id]);
    if (zanrasCheck.length === 0) {
      return res.status(400).json({ error: 'Invalid zanras_id' });
    }

    await pool.query(query, values);
    res.status(201).json({ message: 'Sėkmingai pridėta knyga' });
  } catch (error) {
    console.error('Klaida:', error);
    res.status(500).json({ error: 'Duomenų bazės klaida' });
  }
};
