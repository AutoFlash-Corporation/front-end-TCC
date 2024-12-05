import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import withAuth from "../../utils/withAuth";
import styles from "../FlashcardGroup/flashcardList.module.css"; // Arquivo CSS específico para a listagem de flashcards

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [forceUpdate, setForceUpdate] = useState(0);

  const decodeJwt = (token) => {
    const payload = token.split(".")[1];
    const decodedToken = JSON.parse(atob(payload)); // Decodifica o token
    return decodedToken;
  };

  const fetchFlashcards = async () => {
    try {
      const token = Cookies.get("access");

      if (!token) {
        setMensagem("Token de acesso não encontrado.");
        return;
      }

      const decodedToken = decodeJwt(token);
      const userId = decodedToken.user_id;

      const response = await axios.get(
        `http://127.0.0.1:8000/api/flashcard/lista/?usuario=${userId}`, // Endpoint para listar flashcards
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setFlashcards(response.data); // Atualiza o estado com os flashcards
    } catch (error) {
      console.error("Erro ao buscar flashcards:", error);
      setMensagem("Erro ao listar flashcards.");
    }
  };

  const handleDelete = async (id) => {
    const token = Cookies.get("access");
    if (!token) {
      setMensagem("Token de acesso não encontrado.");
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/api/flashcard/${id}/excluir/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setMensagem("Flashcard excluído com sucesso!");
      setForceUpdate((prev) => prev + 1); // Força uma atualização dos flashcards
    } catch (error) {
      console.error("Erro ao excluir flashcard:", error);
      setMensagem("Erro ao excluir flashcard.");
    }
  };

  const handleEdit = (id) => {
    // Redireciona para a página de edição do flashcard
    window.location.href = `/editarFlashcard/${id}`;
  };

  useEffect(() => {
    fetchFlashcards();
  }, [forceUpdate]); // Atualiza sempre que forceUpdate mudar

  return (
    <div className={styles.flashcardContainer}>
      <a href="/registerFlashcard/" className={styles.addFlashcardButton}>
        Cadastrar novo flashcard
      </a>
      <h1 className={styles.flashcardTitle}>Flashcards já cadastrados:</h1>
      {mensagem && <p className={styles.message}>{mensagem}</p>}
      <div className={styles.flashcardGrid}>
        {flashcards.length > 0 ? (
          flashcards.map((flashcard) => (
            <div key={flashcard.id} className={styles.flashcardCard}>
              <h2 className={styles.cardTitle}>{flashcard.pergunta}</h2>
              <p className={styles.cardDescription}>{flashcard.resposta}</p>
              <div className={styles.cardFooter}>
                <span className={styles.cardFooterText}>
                  Flashcard adicionado
                </span>
              </div>
              {/* Botões de Editar e Excluir */}
              <div className={styles.cardActions}>
                <button
                  onClick={() => handleEdit(flashcard.id)}
                  className={styles.cardEditButton}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(flashcard.id)}
                  className={styles.cardDeleteButton}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noContent}>Nenhum flashcard encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default withAuth(FlashcardList);
