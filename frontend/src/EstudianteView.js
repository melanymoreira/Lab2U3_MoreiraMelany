import React, { useState } from 'react';
import { io } from 'socket.io-client';
import './EstudianteView.css'; // Importa los estilos

const socket = io('http://localhost:3001');

const pcs = Array.from({ length: 25 }, (_, i) =>
  `PC${(i + 1).toString().padStart(2, '0')}`
);

function EstudianteView() {
  const [nombre, setNombre] = useState('');
  const [computadora, setComputadora] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre && computadora) {
      socket.emit('registrar-computadora', {
        estudiante: nombre,
        computadora,
      });
      alert('Computadora registrada');
    }
  };

  return (
    <div className="estudiante-container">
      <h1>Panel De Estudiante</h1>
      <h2>Selecciona tu Computadora</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del estudiante"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <div className="pc-grid">
          {pcs.map((pc) => (
            <div
              key={pc}
              className={`pc-item ${computadora === pc ? 'selected' : ''}`}
              onClick={() => setComputadora(pc)}
            >
              <span className="pc-icon" role="img" aria-label="pc">🖥️</span>
              <div className="pc-label">{pc}</div>
            </div>
          ))}
        </div>
        <button type="submit" disabled={!computadora || !nombre}>
          Registrar
        </button>
      </form>
    </div>
  );
}

export default EstudianteView;