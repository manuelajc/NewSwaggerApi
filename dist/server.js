const express = require('express');
const path = require('path');
const app = express();

// Middleware para verificar el token en las rutas protegidas
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // No hay token, no autorizado

  // Aquí puedes verificar el token, por ejemplo, usando jsonwebtoken
  // jwt.verify(token, SECRET_KEY, (err, user) => {
  //   if (err) return res.sendStatus(403); // Token no válido
  //   req.user = user; // Guardar los datos del usuario autenticado en req.user
  //   next();
  // });

  // Si no verificas el token en este ejemplo, solo continúa
  next();
};

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir el archivo openapi.json (sin autenticación)
app.get('/openapi.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'openapi.json'));
});

// Aplicar autenticación a todas las rutas bajo "/api"
app.use('/api', authenticateToken);

// Rutas protegidas bajo "/api"
app.post('/api/ingresar_radicado_pqrs', (req, res) => {
  res.json({ message: "Radicado cargado correctamente" });
});

app.get('/api/consultar_comunicado', (req, res) => {
  res.json({ message: "Consulta realizada correctamente" });
});

// Escuchar en el puerto 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


