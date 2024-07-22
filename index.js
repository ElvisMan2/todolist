const express = require('express');
const app = express();
const port = 3000;
const db = require('./db'); // Importar la conexión a la base de datos

// Middleware para parsear JSON
app.use(express.json());

// Ruta básica de ejemplo
app.get('/', (req, res) => {
  res.send('¡Bienvenido a mi API!');
});

// Ruta para obtener todos los usuarios
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Ruta para obtener un usuario por ID
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results[0]);
  });
});

// Ruta para crear un nuevo usuario
app.post('/users', (req, res) => {
  const newUser = req.body;
  db.query('INSERT INTO users SET ?', newUser, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: results.insertId, ...newUser });
  });
});

// Ruta para actualizar un usuario existente
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  db.query('UPDATE users SET ? WHERE id = ?', [updatedUser, userId], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: userId, ...updatedUser });
  });
});

// Ruta para eliminar un usuario
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  db.query('DELETE FROM users WHERE id = ?', [userId], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(204).send();
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
