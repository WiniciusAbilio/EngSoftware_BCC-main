import React from 'react';
import axios from 'axios';
import '../styles.css';
import SelectFiliais from '../components/selectFiliais';
import { TokenJWT } from '../components/utilsTokenJWT';
import BotaoVoltar from '../components/botaoVoltar';

function CadastroSilo() {
  const [nomeSilo, setNomeSilo] = React.useState('');
  const [selectedFilial, setSelectedFilial] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      idFilial: selectedFilial,
      nomeSilo: nomeSilo
    };


    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TokenJWT}`,
      },
    };

    try {
      const response = await axios.post('http://localhost:8000/processarCadastroSilo/', data, config);

      if (response.status === 200) {
        window.location.href = '/telaAdm';
        console.log('Silo cadastrado com sucesso!');
      } else {
        console.error('Falha ao cadastrar silo. Status:', response.status);
      }
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error);
    }
  };

  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form" onSubmit={handleSubmit}>
            <span className="login-form-title">Cadastro de Silo</span>

            <SelectFiliais onFilialChange={(filial) => setSelectedFilial(filial)} />

            <div className='wrap-input'>
              <input
                className='input'
                name='nomeSilo'
                type='text'
                placeholder='Nome do Silo'
                required
                value={nomeSilo}
                onChange={(e) => setNomeSilo(e.target.value)}
              />
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

export default CadastroSilo;
