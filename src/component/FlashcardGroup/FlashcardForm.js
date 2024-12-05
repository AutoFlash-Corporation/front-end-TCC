import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import withAuth from "../../utils/withAuth";
import styles from "../FlashcardGroup/flashcardform.module.css";

const FlashcardForm = () => {
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [conteudos, setConteudos] = useState([]); // Para armazenar os conteúdos carregados
  const [flashcards, setFlashcards] = useState([]);
  const [mensagem, setMensagem] = useState("");

  const decodeJwt = (token) => {
    const payload = token.split(".")[1];
    const decodedToken = JSON.parse(atob(payload)); // Decodifica o token
    return decodedToken;
  };

  // Carregar conteúdos existentes ao montar o componente
  useEffect(() => {
    const fetchConteudos = async () => {
      try {
        const token = Cookies.get("access");
        const response = await axios.get(
          "http://127.0.0.1:8000/api/conteudo/lista/", // Endpoint correto para listar conteúdos
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data); // Log para verificar o retorno da API
        setConteudos(response.data); // Define os conteúdos no state
      } catch (error) {
        console.error("Erro ao carregar conteúdos:", error);
        setMensagem("Erro ao carregar conteúdos.");
      }
    };
    fetchConteudos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pergunta || !resposta || !conteudo) {
      setMensagem("Pergunta, resposta e conteúdo são obrigatórios.");
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
        conteudo, // Agora estamos enviando o ID do conteúdo
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
      setConteudo("");
    } catch (error) {
      console.error("Erro ao cadastrar flashcard:", error);
      setMensagem("Erro ao cadastrar flashcard.");
    }
  };

  return (
    <div className={styles.LoginGroup}>
      <h1>Cadastrar Flashcard</h1>
      {mensagem && <p style={{ color: "red" }}>{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="conteudo" className={styles.inputLabel}>
            Conteúdo:
          </label>
          <select
            id="conteudo"
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            required
            className={styles.inputField}
          >
            <option value="">Selecione um conteúdo</option>
            {conteudos.map((item) => (
              <option key={item.id} value={item.id}>
                {item.titulo} {/* Exibindo o nome do conteúdo */}
              </option>
            ))}
          </select>
        </div>
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
    </div>
  );
};

export default withAuth(FlashcardForm);
