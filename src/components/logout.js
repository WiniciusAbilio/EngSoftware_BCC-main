import React from 'react';

function Logout() {

  const handleLogout = () => {
    if (localStorage.getItem('token')) {
      // Remove o token do LocalStorage
      localStorage.removeItem('token');
      console.log('Token removido com sucesso.');
      // Redireciona para a página de logout ou para onde for apropriado
      window.location.pathname = '/'
    } else {
      console.log('Nenhum token encontrado no LocalStorage.');
    }
  };

  return (
    <div className='container-login-form-btn'>
      {/* Use onClick para chamar a função handleLogout quando o botão for clicado */}
      <button className='logon-form-btn' onClick={handleLogout}>
        LOGOUT
      </button>
    </div>
  );
}

export default Logout;
