import React, { useState, useEffect } from 'react';
import '../styles/stylesSelects.css';
import { TokenJWT } from './utilsTokenJWT';

function SelectFiliais({ onFilialChange }) {
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8000/listarFilial/', {
          method: 'GET',
          headers: {
            'Authorization': `${TokenJWT}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        }
      } catch (error) {
        console.error('Erro ao processar a solicitação:', error);
      }
    }

    fetchData();

  }, []);

  useEffect(() => {
    console.log('selectedValue:', selectedValue);
    // Chame a função de mudança quando o valor for alterado
    onFilialChange(selectedValue);
  }, [selectedValue, onFilialChange]);

  const handleFilialChange = (event) => {
    const selectedFilial = event.target.value;
    setSelectedValue(selectedFilial);
  };

  return (
    <div className="select-container" style={{ marginBottom: '1rem' }}>
      <select
        id="selectData"
        name="idFilial"
        value={selectedValue}
        onChange={handleFilialChange}
        className="custom-select"
        required
      >
        <option value="" disabled>
          Selecione a Filial
        </option>
        {data.map((item) => (
          <option key={item.idFilial} value={item.idFilial}>
            {item.nomeFilial}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectFiliais;
