import React, { useState } from 'react';
import aaIMG from '../assets/aa.png';
import '../styles.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Valide os campos do formulário, se necessário
    try {
      const response = await fetch('http://127.0.0.1:8000/processarLogin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (response.ok) {
        const data = await response.json();

        console.log(data);

        if (data.error === "senha_invalida" || data.error === "usuario_nao_encontrado") {
          setShowPopup(true);
          return;
        }

        localStorage.setItem('token', data.access_token); // Salva o token no localStorage
        window.location.pathname = "/redirecionamentoPadrao"; // Use navigate para redirecionar o usuário
        return;
      } else {
        console.error('Erro de autenticação');
      }
    } catch (error) {
      console.error('Erro ao processar a solicitação:', error);
    }
  };

  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form" onSubmit={handleLogin}>
            <span className="login-form-title">Bem Vindo!</span>
            <span className="login-form-title">
              <img src={aaIMG} alt="hihi" />
            </span>

            <div className="wrap-input">
              <input
                className="input"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="wrap-input">
              <input
                className="input"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="container-login-form-btn">
              <button className="logon-form-btn" type="submit">
                LOGIN
              </button>
            </div>
          </form>

          {showPopup && (
            <div className="popup">
              <p>Usuário ou senha incorretos. Tente novamente.</p>
              <button onClick={() => setShowPopup(false)}>Fechar</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;