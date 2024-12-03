const pool = require('../db');

exports.borrowBook = async (req, res) => {
  const { knyga_id, naudotojas_id, data_nuo, data_iki } = req.body;

  if (!knyga_id || !naudotojas_id || !data_nuo || !data_iki) {
    return res.status(400).json({ error: 'Visi laukai turi būti užpildyti' });
  }

  try {
    const [overdueBooks] = await pool.query(
      `
      SELECT id FROM paskolinta_knyga
      WHERE naudotojas_id = ? AND data_iki < CURDATE()
      `,
      [naudotojas_id]
    );

    if (overdueBooks.length > 0) {
      return res.status(403).json({
        error: 'Turite vėluojančių knygų. Grąžinkite jas prieš skolindamiesi naujas knygas.',
      });
    }

    const [book] = await pool.query(
      `SELECT kopiju_kiekis FROM knyga WHERE id = ?`,
      [knyga_id]
    );

    if (book.length === 0) {
      return res.status(404).json({ error: 'Knyga nerasta' });
    }

    if (book[0].kopiju_kiekis < 1) {
      return res.status(400).json({ error: 'Nebeliko kopijų' });
    }

    await pool.query(
      `INSERT INTO paskolinta_knyga (knyga_id, naudotojas_id, data_nuo, data_iki) VALUES (?, ?, ?, ?)`,
      [knyga_id, naudotojas_id, data_nuo, data_iki]
    );

    await pool.query(
      `UPDATE knyga SET kopiju_kiekis = kopiju_kiekis - 1 WHERE id = ?`,
      [knyga_id]
    );

    res.status(200).json({ message: 'Knyga sėkmingai pasiskolinta' });
  } catch (error) {
    console.error('Klaida pasiskolinant knygą:', error);
    res.status(500).json({ error: 'Duomenų bazės klaida' });
  }
};

exports.getBorrowDates = (req, res) => {
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const data_nuo = today.toISOString().split('T')[0];
  const data_iki = nextWeek.toISOString().split('T')[0];

  res.json({ data_nuo, data_iki });
};

exports.getBorrowedBooks = async (req, res) => {
    const query = `
      SELECT paskolinta_knyga.id, knyga.pavadinimas, naudotojas.vardas, naudotojas.pavarde, paskolinta_knyga.data_nuo, paskolinta_knyga.data_iki
      FROM paskolinta_knyga
      JOIN knyga ON paskolinta_knyga.knyga_id = knyga.id
      JOIN naudotojas ON paskolinta_knyga.naudotojas_id = naudotojas.id
    `;
  
    try {
      const [results] = await pool.query(query);
      res.json(results);
    } catch (error) {
      console.error('Klaida gaunant paskolintas knygas:', error);
      res.status(500).json({ error: 'Duomenų bazės klaida' });
    }
  };

  exports.deleteBorrowedBook = async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({ error: 'Paskolintos knygos ID yra privalomas' });
    }
  
    try {
      const [borrowedBook] = await pool.execute('SELECT knyga_id FROM paskolinta_knyga WHERE id = ?', [id]);
  
      if (borrowedBook.length === 0) {
        return res.status(404).json({ error: 'Paskolinta knyga nerasta' });
      }
  
      const knyga_id = borrowedBook[0].knyga_id;
  
      const [result] = await pool.execute('DELETE FROM paskolinta_knyga WHERE id = ?', [id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Paskolinta knyga nerasta' });
      }

      await pool.execute('UPDATE knyga SET kopiju_kiekis = kopiju_kiekis + 1 WHERE id = ?', [knyga_id]);
  
      res.json({ message: 'Paskolinta knyga sėkmingai ištrinta ir knygos kopijų skaičius atnaujintas' });
    } catch (error) {
      console.error('Klaida trinant paskolintą knygą:', error);
      res.status(500).json({ error: 'Duomenų bazės klaida' });
    }
  };

  exports.getExpiringBorrowedBooks = async (req, res) => {
    const { naudotojas_id } = req.query;
  
    if (!naudotojas_id) {
      return res.status(400).json({ error: 'Naudotojas ID yra privalomas' });
    }
  
    const query = `
      SELECT paskolinta_knyga.id, knyga.pavadinimas, paskolinta_knyga.data_iki
      FROM paskolinta_knyga
      JOIN knyga ON paskolinta_knyga.knyga_id = knyga.id
      WHERE paskolinta_knyga.naudotojas_id = ? AND DATEDIFF(paskolinta_knyga.data_iki, CURDATE()) <= 3
    `;
  
    try {
      const [results] = await pool.query(query, [naudotojas_id]);
      res.json(results);
    } catch (error) {
      console.error('Klaida gaunant paskolintas knygas:', error);
      res.status(500).json({ error: 'Duomenų bazės klaida' });
    }
  };