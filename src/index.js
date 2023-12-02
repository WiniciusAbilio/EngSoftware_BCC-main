import React from 'react';
import { createRoot } from 'react-dom/client'; // Importe o createRoot corretamente
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
