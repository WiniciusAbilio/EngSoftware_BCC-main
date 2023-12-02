import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login';
import CadastroUsuario from './pages/cadastroUsuario';
import CadastroFilial from './pages/cadastroFilial';
import CadastroSilo from './pages/cadastroSilo';
import TelaAdm from './pages/telaAdm';
import TelaAnalista from './pages/telaAnalista';
import ManageFilial from './pages/manageFilial';
import ManageUsuario from './pages/manageUsuario';

function checkUserRole() {
  const token = localStorage.getItem('token');
  if (token) {
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = atob(payloadBase64);
    const payload = JSON.parse(decodedPayload);
    return payload.usuario_tipo;
  }
  return null;
}

function RedirecionamentoPadrao() {

  const userRole = checkUserRole();

  if (userRole === 'admin') {
    window.location.pathname = '/telaAdm'
  } else if (userRole === 'especialista') {
    window.location.pathname = '/telaEspecialista'
  } else{
    window.location.pathname = '/telaAnalista'
  }
  return null;
}

function App() {
  const userRole = checkUserRole();

  return (
    <Routes>
      <Route path="/redirecionamentoPadrao" element={<RedirecionamentoPadrao />} />
      <Route path="/" element={userRole ? <Navigate to="/redirecionamentoPadrao" replace={true} /> : <Login />} />
      
      {userRole === 'admin' && (
        <>
          <Route path="/telaAdm" element={<TelaAdm />} />
          <Route path="/cadastroUsuario" element={<CadastroUsuario />} />
          <Route path="/cadastroFilial" element={<CadastroFilial />} />
          <Route path="/cadastroSilo" element={<CadastroSilo />} />
          <Route path="/manageFilial" element={<ManageFilial />} />
          <Route path="/manageUsuario" element={<ManageUsuario />} />
        </>
      )}
      {userRole === 'especialista' && (<></>)}
      {userRole === 'normal' && (<>
        <Route path="/telaAnalista" element={<TelaAnalista />} />
      </>)}
    </Routes>
  );
}

export default App;
