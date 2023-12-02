import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { getSilos, deleteSilo } from "../components/silosLista";
import UpdateSiloModal from "./updateSiloModal";

import '../styles/stylesManage.css';
<link rel="stylesheet" type="text/css" href="styles.css" />

const ManageSilo = () => {
    const [silos, setSilos] = useState([]);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editSilo, setEditSilo] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        let mounted = true;
        if (silos.length && !isUpdated) {
            return;
        }
        getSilos()
            .then(data => {
                if (mounted) {
                    setSilos(data);
                }
            })
        return () => {
            mounted = false;
            setIsUpdated(false);
        }
    }, [isUpdated, silos])

    const handleUpdate = (e, sil) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditSilo(sil);
    };

    const handleDelete = (e, idSilo) => {
        if (window.confirm('Are you sure ?')) {
            e.preventDefault();
            deleteSilo(idSilo)
                .then((result) => {
                    alert(result);
                    setIsUpdated(true);
                },
                    (error) => {
                        alert("Failed to Delete Silo");
                    })
        }
    };


    let EditModelClose = () => setEditModalShow(false);

    return (
        <div className="container-fluid side-container">
            <div className="row side-row" >
                <p id="manage"></p>
                <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome Silo</th>
                            <th>Filial</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {silos.map((sil) =>

                            <tr key={sil.idSilo}>
                                <td>{sil.idSilo}</td>
                                <td>{sil.nomeFilial}</td>
                                <td>

                                    <Button className="mr-2" variant="danger"
                                        onClick={event => handleDelete(event, sil.idSilo)}>
                                        <RiDeleteBin5Line />
                                    </Button>
                                    <span>&nbsp;&nbsp;&nbsp;</span>
                                    <Button className="mr-2"
                                        onClick={event => handleUpdate(event, sil)}>
                                        <FaEdit />
                                    </Button>
                                    <UpdateSiloModal show={editModalShow} silo={editSilo}  
                                        onHide={EditModelClose}></UpdateSiloModal>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
            </div>
        </div>
    );

};
export default ManageSilo;