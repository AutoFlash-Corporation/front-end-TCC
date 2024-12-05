import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "../FlashcardGroup/flashcardautoform.module.css";

const FlashcardAutoForm = () => {
  const [conteudo, setConteudo] = useState("");
  const [conteudos, setConteudos] = useState([]);
  const [nivel, setNivel] = useState("medio");
  const [numeroCards, setNumeroCards] = useState(5);
  const [mensagem, setMensagem] = useState("");
  const [flashcards, setFlashcards] = useState([]);

  // Carregar conteúdos existentes ao montar o componente
  useState(() => {
    const fetchConteudos = async () => {
      try {
        const token = Cookies.get("access");
        const response = await axios.get(
          "http://127.0.0.1:8000/api/conteudo/lista/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setConteudos(response.data);
      } catch (error) {
        console.error("Erro ao carregar conteúdos:", error);
        setMensagem("Erro ao carregar conteúdos.");
      }
    };
    fetchConteudos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!conteudo || !nivel || !numeroCards) {
      setMensagem("Todos os campos são obrigatórios.");
      return;
    }

    try {
      const token = Cookies.get("access");

      const payloadData = {
        conteudo, // ID do conteúdo selecionado
        nivel,
        numero_cards: numeroCards,
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/gerar_flashcard/", // Endpoint específico
        payloadData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMensagem("Flashcards gerados com sucesso!");
      setFlashcards(response.data.flashcards); // Atualiza a lista de flashcards gerados
    } catch (error) {
      console.error("Erro ao gerar flashcards:", error);
      setMensagem("Erro ao gerar flashcards.");
    }
  };

  return (
    <div className={styles.Background}>
    <div className={styles.LoginGroup}>
      <h1>Gerar Flashcards Automáticos</h1>
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
                {item.titulo}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="nivel" className={styles.inputLabel}>
            Nível de Dificuldade:
          </label>
          <select
            id="nivel"
            value={nivel}
            onChange={(e) => setNivel(e.target.value)}
            required
            className={styles.inputField}
          >
            <option value="facil">Fácil</option>
            <option value="medio">Médio</option>
            <option value="dificil">Difícil</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="numeroCards" className={styles.inputLabel}>
            Número de Flashcards:
          </label>
          <select
            id="numeroCards"
            value={numeroCards}
            onChange={(e) => setNumeroCards(Number(e.target.value))}
            required
            className={styles.inputField}
          >
            {[...Array(11)].map((_, index) => {
              const value = index + 5; // Gera valores de 5 a 15
              return (
                <option key={value} value={value}>
                  {value}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.ButtonGroup}>
          <button type="submit" className={styles.ButtonLink}>
            Gerar Flashcards
          </button>
        </div>
      </form>

    </div>
    </div>
  );
};

export default FlashcardAutoForm;
