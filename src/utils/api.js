import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // Ajuste para o endereço correto do backend
});

// Interceptador para adicionar o token de acesso em todas as requisições
api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("access"); // Pega o token dos cookies
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // Adiciona o token no cabeçalho
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptador para lidar com tokens expirados e tentar renová-los automaticamente
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Verifica se o erro é de autenticação (401) e se já tentou renovar
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Marca a tentativa para evitar loops infinitos

      try {
        const refreshToken = Cookies.get("refresh"); // Obtém o token de refresh dos cookies
        if (refreshToken) {
          // Faz a requisição para renovar o token de acesso
          const response = await axios.post(
            "http://127.0.0.1:8000/api/token/refresh/",
            { refresh: refreshToken }
          );

          const newAccessToken = response.data.access;

          // Atualiza o token de acesso nos cookies
          Cookies.set("access", newAccessToken, { expires: 1 });

          // Atualiza o cabeçalho da requisição original
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // Refaz a requisição original
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Erro ao renovar o token de acesso:", refreshError);
        // Redireciona para a página de login se o refresh falhar
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
