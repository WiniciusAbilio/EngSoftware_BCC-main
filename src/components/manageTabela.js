import axios from 'axios';
import { TokenJWT } from './utilsTokenJWT';

// Adicione o token JWT ao cabeçalho da requisição
const headers = {
  Authorization: `${TokenJWT}`, // Substitua TokenJWT pelo seu token real
};

export function getTabela(tabela) {
  return axios.get(`http://localhost:8000/listar${tabela}/`, { headers })
    .then(response => response.data);
}

export function deleteTabela(tabela, id) {
  return axios.delete(`http://localhost:8000/deletar${tabela}/`, {
    headers,
    data: {
      id: id,
    }
  })
  .then(response => response.data);
}

export function updateTabela(tabela, data) {
  return axios.post(`http://localhost:8000/atualizar${tabela}/`, data, {
    headers,
  })
  .then(response => response.data);
}
