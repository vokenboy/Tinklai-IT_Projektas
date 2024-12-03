const pool = require('../db');

exports.addLibrarian = async (req, res) => {
  const { vardas, pavarde } = req.body;

  if (!vardas || !pavarde) {
    return res.status(400).json({ error: 'Vardas ir pavardė yra privaloma' });
  }

  try {
    const [roleResults] = await pool.query('SELECT id FROM role WHERE role_name = ?', ['Bibliotekininkas']);
    
    if (roleResults.length === 0) {
      return res.status(404).json({ error: 'Rolė nerasta' });
    }

    const roleId = roleResults[0].id;

    await pool.query(
      'INSERT INTO naudotojas (vardas, pavarde, role_id) VALUES (?, ?, ?)',
      [vardas, pavarde, roleId]
    );

    res.status(201).json({ message: 'Bibliotekinikas pridėtas' });
  } catch (error) {
    console.error('Klaida pridedant bibliotekinika:', error);
    res.status(500).json({ error: 'Duomenų bazės klaida' });
  }
};
  
  exports.getLibrarians = async (req, res) => {
    const query = `
      SELECT naudotojas.id, naudotojas.vardas, naudotojas.pavarde,  naudotojas.epastas, role.role_name
      FROM naudotojas
      JOIN role ON naudotojas.role_id = role.id
      WHERE role.role_name = 'Bibliotekininkas'
    `;
  
    try {
      const [results] = await pool.query(query);
      res.json(results);
    } catch (error) {
      console.error('Klaida pridedant bibliotekinika:', error);
      res.status(500).json({ error: 'Duomenų bazės klaida' });
    }
  };

  exports.getUserById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const [results] = await pool.query(
        `
        SELECT naudotojas.id, naudotojas.vardas AS name, naudotojas.pavarde AS surname, naudotojas.epastas AS email, role.role_name AS role
        FROM naudotojas
        JOIN role ON naudotojas.role_id = role.id
        WHERE naudotojas.id = ?
        `,
        [id]
      );
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'Naudotojas nerastas' });
      }
  
      res.json(results[0]);
    } catch (error) {
      console.error('Klaida gaunant naudotoja:', error);
      res.status(500).json({ error: 'Duomenų bazės klaida' });
    }
  };
  
