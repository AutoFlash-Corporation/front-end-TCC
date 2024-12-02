import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";

const FlashcardForm = () => {
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [mensagem, setMensagem] = useState("");
  
  const decodeJwt = (token) => {
    const payload = token.split('.')[1];
    const decodedToken = JSON.parse(atob(payload)); // Decodifica o token
    return decodedToken;
  };

  const handlePerguntaChange = (e) => setPergunta(e.target.value);
  const handleRespostaChange = (e) => setResposta(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se os campos estão preenchidos
    if (!pergunta || !resposta) {
      setMensagem("Pergunta e resposta são obrigatórias.");
      return;
    }

    try {
      const token = Cookies.get("access");

      if (!token) {
        setMensagem("Token de acesso não encontrado.");
        return;
      }

      const decodedToken = decodeJwt(token);
      const userId = decodedToken.user_id;

      const payloadData = {
        pergunta: pergunta, // Pergunta preenchida
        resposta: resposta, // Resposta preenchida
        usuario: userId, // ID do usuário
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/flashcard/", // URL do seu endpoint
        payloadData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Flashcard cadastrado:", response.data);
      setMensagem("Flashcard cadastrado com sucesso!");

      // Atualiza a lista de flashcards
      setFlashcards((prevFlashcards) => [...prevFlashcards, response.data]);
    } catch (error) {
      console.error("Erro ao cadastrar flashcard:", error);
      setMensagem("Erro ao cadastrar flashcard.");
    }
  };

  return (
    <div>
      <h1>Cadastrar Flashcard</h1>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Pergunta:
          <input
            type="text"
            value={pergunta}
            onChange={handlePerguntaChange}
            required
          />
        </label>

        <label>
          Resposta:
          <input
            type="text"
            value={resposta}
            onChange={handleRespostaChange}
            required
          />
        </label>

        <button type="submit">Cadastrar Flashcard</button>
      </form>

      <h2>Flashcards Cadastrados</h2>
      <ul>
        {flashcards.map((flashcard) => (
          <li key={flashcard.id}>
            <p>{flashcard.pergunta} - {flashcard.resposta}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlashcardForm;
