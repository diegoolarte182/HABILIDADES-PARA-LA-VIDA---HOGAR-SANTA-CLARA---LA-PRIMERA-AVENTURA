import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// ✅ Debug: confirmar que este archivo está corriendo
console.log('✅ index.tsx cargado');

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('❌ No se encontró el elemento #root en el HTML');
  throw new Error('Could not find root element to mount to');
}

// ✅ Debug: confirmar que sí encontró #root
console.log('✅ #root encontrado:', rootElement);

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
