import React from 'react';
import { Link } from 'react-router-dom'; // Importe o Link do react-router-dom (ou outra biblioteca de roteamento)

function Voltar() {
  return (
    <div className='container-login-form-btn'>
      {/* Use Link em vez de button para criar um link */}
      <Link to="/">
        <button className='logon-form-btn'>
          Voltar
        </button>
      </Link>
    </div>
  );
}

export default Voltar;
