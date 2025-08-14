import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

function DocenteView() {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conectado como docente:', socket.id);
    });

    socket.on('notificacion-docente', (data) => {
      setNotificaciones((prev) => [...prev, data]);
      alert(`Estudiante ${data.estudiante} seleccionó ${data.computadora}`);
    });

    socket.on('disconnect', () => {
      console.log('Docente desconectado');
    });

    return () => {
      socket.off('notificacion-docente');
    };
  }, []);

  return (
    <div className="estudiante-container">
      <h1>Panel De Docente</h1>
      <h2>Notificaciones</h2>
      <ul>
        {notificaciones.map((n, i) => (
          <li key={i}>{`Estudiante ${n.estudiante} seleccionó ${n.computadora}`}</li>
        ))}
      </ul>
    </div>

  );
}

export default DocenteView;