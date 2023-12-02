import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { getTabela, deleteTabela, updateTabela } from "../components/manageTabela";

import '../styles/stylesManage.css';
import '../styles.css';

const ManageUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [tipoUsuarioOptions] = useState(["normal", "especialista", "admin"]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    nome: '',
    email: '',
    senha: '',
    tipoUsuario: '',
  });

  useEffect(() => {
    let mounted = true;
    getTabela('Usuario').then(data => {
      if (mounted) {
        setUsuarios(data.usuarios);
      }
    });

    return () => (mounted = false);
  }, []);

  const handleDelete = (e, email) => {
    if (window.confirm('Você tem certeza que deseja excluir este usuário?')) {
      e.preventDefault();
      deleteTabela('Usuario', email)
        .then((result) => {
          alert(result.mensagem);
          setUsuarios(usuarios.filter(user => user.email !== email));
        },
        (error) => {
          alert("Falha ao excluir o usuário");
        });
    }
  };

  const handleEdit = (email) => {
    setEditingId(email);
    const userToEdit = usuarios.find(user => user.email === email);
    setEditData({
      nome: userToEdit.nome,
      email: userToEdit.email,
      senha: userToEdit.senha,
      tipoUsuario: userToEdit.tipoUsuario,
    });
  };

  const handleSave = (idUsuario) => {
    // Lógica para salvar os dados editados (pode ser uma chamada à API)
    const updatedData = {
      nome: editData.nome,
      email: editData.email,
      senha: editData.senha,
      tipoUsuario: editData.tipoUsuario,
    };
  
    // Chama a função de update
    updateTabela('Usuario', updatedData)
      .then(() => {
        // Após a atualização bem-sucedida, obtém os dados atualizados
        getTabela('Usuario').then(data => {
          // Limpar os dados de edição e finalizar a edição
          setEditingId(null);
          setEditData({
            nome: '',
            email: '',
            senha: '',
            tipoUsuario: '',
          });
          // Atualizar a lista de usuários com os dados mais recentes
          setUsuarios(data.usuarios);
        });
      })
      .catch(error => {
        console.error('Erro ao salvar usuário:', error);
        // Tratar o erro conforme necessário
      });
  };
  
  

  const handleCancel = () => {
    // Cancelar a edição, limpar os dados de edição e redefinir o ID de edição
    setEditingId(null);
    setEditData({
      nome: '',
      email: '',
      senha: '',
      tipoUsuario: '',
    });
  };

  const handleChange = (e) => {
    // Atualizar os dados de edição conforme o usuário digita
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container-fluid side-container">
      <div className="row side-row">
        <p id="manage"></p>
        <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
          <thead>
            <tr>
              <th>Email</th>
              <th>Nome</th>
              <th>Senha</th>
              <th>Tipo Usuário</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
  {usuarios.map((user) => (
    <tr key={user.email}>
      <td>{user.email}</td>
      <td>
        {editingId === user.email ? (
          <Form.Control
            type="text"
            name="nome"
            value={editData.nome}
            onChange={handleChange}
          />
        ) : (
          user.nome
        )}
      </td>
      <td>
        {editingId === user.email ? (
          <Form.Control
            type="password"
            name="senha"
            value={editData.senha}
            onChange={handleChange}
          />
        ) : (
          user.senha
        )}
      </td>
      <td>
        {editingId === user.email ? (
            <Form.Control
            as="select"
            name="tipoUsuario"
            value={editData.tipoUsuario}
            onChange={handleChange}
            >
            {tipoUsuarioOptions.map((opcao) => (
                <option key={opcao} value={opcao}>
                {opcao}
                </option>
            ))}
            </Form.Control>
        ) : (
            user.tipoUsuario
        )}
        </td>

      <td>
        {editingId === user.email ? (
          <>
            <Button className="mr-2" variant="success" onClick={() => handleSave(user.email)}>
              <FaCheck />
            </Button>
            <Button variant="danger" onClick={handleCancel}>
              <FaTimes />
            </Button>
          </>
        ) : (
          <>
            <Button variant="info" onClick={() => handleEdit(user.email)}>
              <FaEdit />
            </Button>
            <Button className="mr-2" variant="danger" onClick={(e) => handleDelete(e, user.email)}>
              <RiDeleteBin5Line />
            </Button>
          </>
        )}
      </td>
    </tr>
  ))}
</tbody>
        </Table>
      </div>
    </div>
  );
};

export default ManageUsuario;
