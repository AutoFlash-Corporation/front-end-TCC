import api from "./api"; // Importa a instância da API

export const loginUser = async (username, password) => {
  try {
    const response = await api.post('login/', { username, password });

    if (response.status === 200 && response.data) {
      return response.data; // Retorna os dados caso o login seja bem-sucedido
    } else {
      throw new Error('Erro desconhecido. Tente novamente.');
    }
  } catch (error) {
    // Verifica se o erro está relacionado a dados da API
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.detail || 'Erro desconhecido. Tente novamente.';
      throw new Error(errorMessage);
    }
    console.error("Erro ao fazer login:", error.message);
    throw new Error('Erro ao fazer login. Tente novamente.');
  }
};
