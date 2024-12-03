import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import withAuth from "../utils/withAuth";
import styles from "../styles/flashcardform.module.css";

const FlashcardForm = () => {
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [mensagem, setMensagem] = useState("");

  const decodeJwt = (token) => {
    const payload = token.split(".")[1];
    const decodedToken = JSON.parse(atob(payload)); // Decodifica o token
    return decodedToken;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        pergunta,
        resposta,
        usuario: userId,
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/flashcard/",
        payloadData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMensagem("Flashcard cadastrado com sucesso!");
      setFlashcards((prevFlashcards) => [...prevFlashcards, response.data]);
      setPergunta("");
      setResposta("");
    } catch (error) {
      setMensagem("Erro ao cadastrar flashcard.");
    }
  };

  return (
    <div className={styles.LoginGroup}>
      <h1>Cadastrar Flashcard</h1>
      {mensagem && <p style={{ color: "red" }}>{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="pergunta" className={styles.inputLabel}>
            Pergunta:
          </label>
          <input
            type="text"
            id="pergunta"
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="resposta" className={styles.inputLabel}>
            Resposta:
          </label>
          <textarea
            id="resposta"
            value={resposta}
            onChange={(e) => setResposta(e.target.value)}
            required
            className={styles.inputField}
            style={{ height: "100px" }}
          />
        </div>
        <div className={styles.ButtonGroup}>
          <button type="submit" className={styles.ButtonLink}>
            Cadastrar
          </button>
        </div>
      </form>

      <a href="/card/" className={styles.addContentButton}>
        Ver lista de cards
      </a>

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

export default withAuth(FlashcardForm);
