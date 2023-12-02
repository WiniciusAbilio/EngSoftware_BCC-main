// ManageFilial.js

import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { getTabela, deleteTabela, updateTabela } from "../components/manageTabela";
import { getEstados, getCidadesPorEstado } from "../components/utilsEstadosCidades";

import '../styles/stylesManage.css';
import '../styles.css';

const ManageFilial = () => {
  const [filial, setFilial] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    nomeFilial: '',
    estado: '',
    cidade: '',
  });
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);

  useEffect(() => {
    let mounted = true;
    getTabela('Filial').then(data => {
      if (mounted) {
        setFilial(data);
      }
    });

    // Buscar estados da API do IBGE usando a função do arquivo apiService.js
    getEstados()
      .then(data => {
        if (mounted) {
          setEstados(data);
        }
      })
      .catch(error => {
        console.error('Erro ao obter a lista de estados:', error);
      });

    return () => (mounted = false);
  }, []);

  const handleDelete = (e, idFilial) => {
    if (window.confirm('Cuidado ao deletar uma filial, todos os silos relacionados a ela também serão deletados! Você tem certeza?')) {
      e.preventDefault();
      deleteTabela('Filial',idFilial)
        .then((result) => {
          alert(result.mensagem);
          setFilial(filial.filter(item => item.idFilial !== idFilial));
        },
        (error) => {
          alert("Falha ao deletar a filial");
        });
    }
  };

  const handleEdit = (idFilial) => {
    setEditingId(idFilial);
    const filialToEdit = filial.find(fil => fil.idFilial === idFilial);
    setEditData({
      nomeFilial: filialToEdit.nomeFilial,
      estado: filialToEdit.estado,
      cidade: filialToEdit.cidade,
    });

    // Buscar cidades quando o estado é selecionado
    if (filialToEdit.estado) {
      getCidadesPorEstado(filialToEdit.estado)
        .then(data => {
          setCidades(data);
        })
        .catch(error => {
          console.error('Erro ao obter a lista de municípios:', error);
        });
    }
  };

  const handleSave = (idFilial) => {
    // Aqui você pode enviar os dados editados para o backend ou fazer a lógica necessária

    const updatedData = {
        id: idFilial,
        nomeFilial: editData.nomeFilial,
        estado: editData.estado,
        cidade: editData.cidade,
      };
    
      // Chama a funcao de update
      updateTabela('Filial',updatedData)
      .then(() => {
        // Limpar os dados de edição e finalizar a edição
        setEditingId(null);
        setEditData({
          nomeFilial: '',
          estado: '',
          cidade: '',
        });
  
        // Chama a função para obter os dados atualizados
        return getTabela('Filial');
      })
      .then((data) => {
        // Atualiza o estado com os novos dados
        setFilial(data);
      })
      .catch((error) => {
        console.error('Erro ao salvar dados:', error);
        // Tratar o erro conforme necessário
      });


  };

  const handleCancel = () => {
    // Cancelar a edição, limpar os dados de edição e redefinir o ID de edição
    setEditingId(null);
    setEditData({
      nomeFilial: '',
      estado: '',
      cidade: '',
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
      <div className="row side-row" >
        <p id="manage"></p>
        <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
          <thead>
            <tr>
            <th>ID</th>
              <th>Nome Filial</th>
              <th>Estado</th>
              <th>Cidade</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {filial.map((fil) => (
              <tr key={fil.idFilial}>
                <td>{fil.idFilial}</td>
                <td>
                  {editingId === fil.idFilial ? (
                    <Form.Control
                      type="text"
                      name="nomeFilial"
                      value={editData.nomeFilial}
                      onChange={handleChange}
                    />
                  ) : (
                    fil.nomeFilial
                  )}
                </td>
                <td>
                  {editingId === fil.idFilial ? (
                    <Form.Control
                      as="select"
                      name="estado"
                      value={editData.estado}
                      onChange={(e) => {
                        handleChange(e);
                        // Buscar cidades quando o estado é selecionado
                        const selectedState = e.target.value;
                        if (selectedState) {
                          getCidadesPorEstado(selectedState)
                            .then(data => {
                              setCidades(data);
                            })
                            .catch(error => {
                              console.error('Erro ao obter a lista de municípios:', error);
                            });
                        }
                      }}
                    >
                      <option value="">Selecione um estado</option>
                      {estados.map((estado) => (
                        <option key={estado.sigla} value={estado.sigla}>
                          {estado.nome}
                        </option>
                      ))}
                    </Form.Control>
                  ) : (
                    fil.estado
                  )}
                </td>
                <td>
                  {editingId === fil.idFilial ? (
                    <Form.Control
                      as="select"
                      name="cidade"
                      value={editData.cidade}
                      onChange={handleChange}
                    >
                      <option value="">Selecione uma cidade</option>
                      {Array.isArray(cidades) && cidades.map((cidade) => (
                        <option key={cidade.id} value={cidade.nome}>
                          {cidade.nome}
                        </option>
                      ))}
                    </Form.Control>
                  ) : (
                    fil.cidade
                  )}
                </td>
                <td>
                  {editingId === fil.idFilial ? (
                    <>
                      <Button className="mr-2" variant="success" onClick={() => handleSave(fil.idFilial)}>
                        <FaCheck />
                      </Button>
                      <Button variant="danger" onClick={handleCancel}>
                        <FaTimes />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="info" onClick={() => handleEdit(fil.idFilial)}>
                        <FaEdit />
                      </Button>
                      <Button className="mr-2" variant="danger" onClick={(e) => handleDelete(e, fil.idFilial)}>
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

export default ManageFilial;

