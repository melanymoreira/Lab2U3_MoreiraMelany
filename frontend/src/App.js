
import React, { useState } from 'react';
import DocenteView from './DocenteView';
import EstudianteView from './EstudianteView';
import './App.css';

function App() {
  const [rol, setRol] = useState('');

  return (
    <div className="app-container">
      <h1 className="app-title">Laboratorio de Computadoras</h1>
      {!rol && (
        <div className="role-selection">
          <button className="role-btn docente" onClick={() => setRol('docente')}>Docente</button>
          <button className="role-btn estudiante" onClick={() => setRol('estudiante')}>Estudiante</button>
        </div>
      )}
      {rol === 'docente' && <DocenteView />}
      {rol === 'estudiante' && <EstudianteView />}
    </div>
  );
}

export default App;