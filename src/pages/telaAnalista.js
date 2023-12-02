// TelaAnalista.js
import React from 'react';
import { Link } from 'react-router-dom'; // Importe a funcionalidade de Link para criar links
import '../styles/stylesTelaAdm.css';
import Logout from '../components/logout';

const TelaAnalista = () => {
  return (
    <div className="container">
      <div className="container-adm">
        <div className="wrap-adm">

          <h1>Bem-vindo, Analista!</h1>

          <div className='container-login-form-btn'>
            <Link to='/criarRelatorio'>
              <button className='logon-form-btn'>
                Relatório
              </button>
            </Link>
          </div>

        <Logout/>
  
        </div>
      </div>
    </div>

  );
};

export default TelaAnalista;
