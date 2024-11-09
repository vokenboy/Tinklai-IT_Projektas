const pool = require('../db');

exports.borrowBook = async (req, res) => {
  const { knyga_id, naudotojas_id, data_nuo, data_iki } = req.body;

  if (!knyga_id || !naudotojas_id || !data_nuo || !data_iki) {
      return res.status(400).json({ error: 'All fields are required' });
  }

  try {
      const [book] = await pool.execute('SELECT kopiju_kiekis FROM knyga WHERE id = ?', [knyga_id]);

      if (book.length === 0) {
          return res.status(404).json({ error: 'Book not found' });
      }

      if (book[0].kopiju_kiekis < 1) {
          return res.status(400).json({ error: 'No copies available' });
      }

      await pool.execute(
          'INSERT INTO paskolinta_knyga (knyga_id, naudotojas_id, data_nuo, data_iki, grazinta) VALUES (?, ?, ?, ?, ?)',
          [knyga_id, naudotojas_id, data_nuo, data_iki, false]
      );

      await pool.execute('UPDATE knyga SET kopiju_kiekis = kopiju_kiekis - 1 WHERE id = ?', [knyga_id]);

      res.status(200).json({ message: 'Book borrowed successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error borrowing the book' });
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

