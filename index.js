const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta básica de ejemplo
app.get('/', (req, res) => {
  res.send('¡Bienvenido a mi API!');
});

// Ruta para obtener todos los elementos (por ejemplo, usuarios)
app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'Juan' },
    { id: 2, name: 'María' }
  ];
  res.json(users);
});

// Ruta para obtener un solo elemento por ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = { id: userId, name: 'Usuario Ejemplo' };
  res.json(user);
});

// Ruta para crear un nuevo elemento
app.post('/users', (req, res) => {
  const newUser = req.body;
  newUser.id = Math.floor(Math.random() * 1000); // Generar un ID aleatorio para el ejemplo
  res.status(201).json(newUser);
});

// Ruta para actualizar un elemento existente
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const updatedUser = req.body;
  updatedUser.id = userId;
  res.json(updatedUser);
});

// Ruta para eliminar un elemento
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  res.status(204).send();
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
