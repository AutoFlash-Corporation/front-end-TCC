import api from "./api";

export const getProfile = async () => {
  try {
    const response = await api.get("profile/");
    return response.data;
  } catch (error) {
    console.error("Erro ao carregar perfil:", error);
    throw new Error("Erro ao carregar perfil. Tente novamente.");
  }
};

export const updateProfile = async (updatedData) => {
  try {
    const response = await api.patch("/profile/", updatedData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    throw new Error("Erro ao atualizar perfil. Tente novamente.");
  }
};
