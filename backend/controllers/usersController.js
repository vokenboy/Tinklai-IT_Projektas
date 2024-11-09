const pool = require('../db');

exports.addLibrarian = async (req, res) => {
  const { vardas, pavarde } = req.body;

  if (!vardas || !pavarde) {
    return res.status(400).json({ error: 'Name and surname are required' });
  }

  try {
    const [roleResults] = await pool.query('SELECT id FROM role WHERE role_name = ?', ['Bibliotekininkas']);
    
    if (roleResults.length === 0) {
      return res.status(404).json({ error: 'Role not found' });
    }

    const roleId = roleResults[0].id;

    await pool.query(
      'INSERT INTO naudotojas (vardas, pavarde, role_id) VALUES (?, ?, ?)',
      [vardas, pavarde, roleId]
    );

    res.status(201).json({ message: 'Librarian added successfully' });
  } catch (error) {
    console.error('Error in addLibrarian:', error);
    res.status(500).json({ error: 'Database error' });
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
      console.error('Error fetching librarians:', error);
      res.status(500).json({ error: 'Database error' });
    }
  };
