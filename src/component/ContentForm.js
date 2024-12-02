import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import withAuth from "../utils/withAuth"; 

const ContentForm = ({ userName }) => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("access"); // Obtém o token do Cookie
      console.log("Token de acesso:", token);

      if (!token) {
        setMensagem("Token de acesso não encontrado.");
        return;
      }

      // Decodifica o token manualmente usando 'atob'
      const payload = token.split('.')[1]; // Pega a parte do payload do token
      const decodedToken = JSON.parse(atob(payload)); // Decodifica a string Base64 para JSON

      const userId = decodedToken.user_id; // Assumindo que o ID do usuário está no campo 'user_id'

      console.log("ID do usuário:", userId);

      // Cria o payload com o ID do usuário
      const payloadData = { 
        titulo, 
        descricao, 
        usuario: userId // Usa o ID do usuário
      };
      console.log("Payload enviado:", payloadData);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/conteudo/", // Substitua pelo seu endpoint do Django
        payloadData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Inclui o token
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Resposta da API:", response.data);

      setMensagem("Conteúdo cadastrado com sucesso!");
      setTitulo("");
      setDescricao("");
    } catch (error) {
      // Tratamento de erros
      console.error("Erro na requisição:", error);

      if (error.response) {
        console.log("Erro da API:", error.response.data);
        setMensagem(`Erro: ${JSON.stringify(error.response.data)}`);
      } else {
        setMensagem("Erro ao cadastrar conteúdo.");
      }
    }
  };

  return (
    <div>
      <h1>Cadastrar Conteúdo</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default withAuth(ContentForm);
