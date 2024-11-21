import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',  // Ajuste para o endereço correto do seu backend
});

export default api;  // Aqui estamos exportando a instância

// Função para login
export const loginUser = async (username, password) => {
  try {
    console.log('Enviando dados para login:', { username, password }); 
    const response = await api.post('login/', { username, password });
    return response.data;  // Retorna os dados da resposta do backend
  } catch (error) {
    console.error("Erro ao fazer login:", error.response?.data || error.message);
    throw error;  // Lança o erro para ser tratado onde a função for chamada
  }
};
