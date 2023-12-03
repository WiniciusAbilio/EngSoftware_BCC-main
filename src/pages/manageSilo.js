import React, { useEffect, useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { getTabela, deleteTabela, updateTabela } from "../components/manageTabela";
import BotaoVoltar from '../components/botaoVoltar';
import '../styles/stylesManage.css';
import '../styles.css';

const ManageSilo = () => {
  const [silos, setSilos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    nomeSilo: '',
  });

  useEffect(() => {
    let mounted = true;
    getTabela('Silo').then(data => {
      if (mounted) {
        setSilos(data.silos);
      }
    });

    return () => (mounted = false);
  }, []);

  const handleDelete = (e, idSilo) => {
    if (window.confirm(`Você tem certeza que deseja deletar o Silo ${idSilo}?`)) {
      e.preventDefault();
      deleteTabela('Silo', idSilo)
        .then((result) => {
          alert(result.mensagem);
          setSilos(silos.filter(item => item.idSilo !== idSilo));
        },
        (error) => {
          alert("Failed to delete Silo");
        });
    }
  };

  const handleEdit = (idSilo) => {
    setEditingId(idSilo);
    const siloToEdit = silos.find(s => s.idSilo === idSilo);
    setEditData({
      nomeSilo: siloToEdit.nomeSilo,
    });
  };

  const handleSave = (idSilo) => {
    const updatedData = {
      id: idSilo,
      nomeSilo: editData.nomeSilo,
    };

    updateTabela('Silo', updatedData)
      .then(() => {
        setEditingId(null);
        setEditData({
          nomeSilo: '',
        });

        return getTabela('Silo');
      })
      .then((data) => {
        setSilos(data.silos);
      })
      .catch((error) => {
        console.error('Failed to save data:', error);
      });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({
      nomeSilo: '',
    });
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container-fluid side-container">
      <div className="row side-row" >
        <p id="manage"></p>
        <BotaoVoltar/>
        <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome Silo</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {silos.map((silo) => (
              <tr key={silo.idSilo}>
                <td>{silo.idSilo}</td>
                <td>
                  {editingId === silo.idSilo ? (
                    <Form.Control
                      type="text"
                      name="nomeSilo"
                      value={editData.nomeSilo}
                      onChange={handleChange}
                    />
                  ) : (
                    silo.nomeSilo
                  )}
                </td>
                <td>
                  {editingId === silo.idSilo ? (
                    <>
                      <Button className="mr-2" variant="success" onClick={() => handleSave(silo.idSilo)}>
                        <FaCheck />
                      </Button>
                      <Button variant="danger" onClick={handleCancel}>
                        <FaTimes />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="info" onClick={() => handleEdit(silo.idSilo)}>
                        <FaEdit />
                      </Button>
                      <Button className="mr-2" variant="danger" onClick={(e) => handleDelete(e, silo.idSilo)}>
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

export default ManageSilo;
