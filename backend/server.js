const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  socket.on('registrar-computadora', (data) => {
    console.log(`Estudiante ${data.estudiante} seleccionó ${data.computadora}`);
    // Notifica a todos los docentes conectados
    io.emit('notificacion-docente', data);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

server.listen(3001, () => {
  console.log('Servidor Socket.io escuchando en puerto 3001');
});