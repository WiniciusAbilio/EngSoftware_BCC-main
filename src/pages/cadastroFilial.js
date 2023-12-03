import React from 'react';
import '../styles.css';
import EstadosCidades from '../components/estadosCidades';
import BotaoVoltar from '../components/botaoVoltar';

function CadastroFilial() {
  // Função que será passada para o componente EstadosCidades
  const onEstadoChange = (estadoSelecionado) => {
    // Lógica para lidar com a mudança de estado, se necessário
    console.log('Estado selecionado:', estadoSelecionado);
  };

  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form" action="http://localhost:8000/processarCadastroFilial/" method="post">
            <span className="login-form-title">Cadastro de Filial</span>
            <span className="login-form-title"></span>
  
            <div className='wrap-input'>
              <input className='input' name='nomeFilial' type='text' placeholder='Nome da Filial' required/>
            </div>
            
            {/* Passa a função onEstadoChange para o componente EstadosCidades */}
            <EstadosCidades onEstadoChange={onEstadoChange}/>
            
            <div className='container-login-form-btn'>
              <button className='logon-form-btn' type='submit'>
                CADASTRAR
              </button>
              <BotaoVoltar/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastroFilial;
