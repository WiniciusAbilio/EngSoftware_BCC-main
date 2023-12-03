import React from 'react';
import axios from 'axios';
import '../styles.css';
import { TokenJWT } from '../components/utilsTokenJWT';
import BotaoVoltar from '../components/botaoVoltar';

function CadastroUsuario() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const config = {
      headers: {
        'Authorization': `${TokenJWT}`, // Adicione o token JWT ao cabeçalho
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/processarCadastroUsuario/', formData, config);

      if (response.status === 200) {
        window.location.pathname = '/telaAdm'
        console.log('Usuário cadastrado com sucesso!');
      } else {
        // A resposta foi um erro
        console.error('Falha ao cadastrar usuário. Status:', response.status);
      }
    } catch (error) {
      // Ocorreu um erro ao enviar a solicitação
      console.error('Erro ao enviar solicitação:', error);
    }
  };

  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form" onSubmit={handleSubmit}>

            <span className="login-form-title">Cadastro de Usuário</span>

            <div className='wrap-input'>
              <input className='input' name='email' type='email' placeholder='Email' required/>
            </div>

            <div className='wrap-input'>
              <input className='input' name='nome' type='text' placeholder='Name' required/>
            </div>

            <div className='wrap-input'>
              <input className='input' name='password' type='password' placeholder='Password' required/>
            </div>

            <div className='wrap-input'>
              <select className='input' name='tipoUsuario'>
                <option value='normal'>Normal</option>
                <option value='especialista'>Especialista</option>
                <option value='admin'>Admin</option>
              </select>
            </div>

            <div className='container-login-form-btn'>
              <button className='logon-form-btn' type='submit'>
                CADASTRAR
              </button>
            </div>
            <BotaoVoltar/>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastroUsuario;
