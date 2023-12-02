const getEstados = async () => {
    try {
      const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao obter a lista de estados:', error);
      throw error; // Propagar o erro para quem chamar essa função
    }
  };
  
  const getCidadesPorEstado = async (estado) => {
    try {
      const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`);
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error('Erro ao obter a lista de municípios:', error);
      throw error; // Propagar o erro para quem chamar essa função
    }
  };
  
  export { getEstados, getCidadesPorEstado };
  