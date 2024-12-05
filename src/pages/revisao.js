import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "../styles/revision.module.css";
import Menu from "../component/Menu/Menu";

const RevisionScreen = () => {
  const [showConfirmation, setShowConfirmation] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const [conteudos, setConteudos] = useState([]);
  const [selectedConteudo, setSelectedConteudo] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Carregar os conteúdos ao montar o componente
  useEffect(() => {
    const fetchConteudos = async () => {
      try {
        const token = Cookies.get("access");
        if (!token) throw new Error("Token de acesso não encontrado.");

        const response = await axios.get("http://127.0.0.1:8000/api/conteudo/lista/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setConteudos(response.data);
      } catch (error) {
        console.error("Erro ao buscar conteúdos:", error);
        setMessage("Erro ao carregar conteúdos.");
      }
    };

    fetchConteudos();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const token = Cookies.get("access");
      if (!token) throw new Error("Token de acesso não encontrado.");

      const response = await axios.get(
        `http://127.0.0.1:8000/api/flashcard/conteudo/${selectedConteudo}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.length > 0) {
        setFlashcards(response.data);
        setCurrentFlashcardIndex(0); // Começa com o primeiro flashcard
        setMessage("");
      } else {
        setMessage("Nenhum flashcard disponível para este conteúdo.");
        setFlashcards([]);
        setCurrentFlashcardIndex(null);
      }
    } catch (error) {
      console.error("Erro ao buscar flashcards:", error);
      if (error.response && error.response.status === 404) {
        setMessage("Nenhum flashcard encontrado para este conteúdo.");
      } else {
        setMessage("Erro ao carregar flashcards.");
      }
    }
  };

  const submitReview = async (resultado) => {
    try {
      const token = Cookies.get("access");
      if (!token) throw new Error("Token de acesso não encontrado.");

      if (currentFlashcardIndex === null) {
        setMessage("Nenhum flashcard disponível para revisar.");
        return;
      }

      const currentFlashcard = flashcards[currentFlashcardIndex];
      await axios.post(
        `http://127.0.0.1:8000/api/flashcard/${currentFlashcard.id}/atualizar_revisao/`,
        { resultado },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Avança para o próximo flashcard, se existir
      if (currentFlashcardIndex + 1 < flashcards.length) {
        setCurrentFlashcardIndex(currentFlashcardIndex + 1);
      } else {
        setMessage("Todos os flashcards deste conteúdo foram revisados.");
        setCurrentFlashcardIndex(null);
      }

      setShowAnswer(false);
    } catch (error) {
      console.error("Erro ao enviar revisão:", error);
      setMessage("Erro ao salvar revisão.");
    }
  };

  const handleStartRevision = () => {
    if (!selectedConteudo) {
      setMessage("Por favor, selecione um conteúdo antes de continuar.");
      return;
    }
    setShowConfirmation(false);
    fetchFlashcards();
  };

  const handleRedirectHome = () => {
    router.push("/home");
  };

  return (
    <div className={styles.pageContainer}>
      <Menu />
      <div className={styles.contentContainer}>
        {showConfirmation ? (
          <div className={styles.confirmationBox}>
            <h3>Selecione um conteúdo para iniciar a revisão</h3>
            <select
              className={styles.selectConteudo}
              value={selectedConteudo}
              onChange={(e) => setSelectedConteudo(e.target.value)}
            >
              <option value="">Selecione um conteúdo</option>
              {conteudos.map((conteudo) => (
                <option key={conteudo.id} value={conteudo.id}>
                  {conteudo.titulo}
                </option>
              ))}
            </select>
            <div className={styles.confirmationButtons}>
              <button
                className={styles.startButton}
                onClick={handleStartRevision}
              >
                Iniciar
              </button>
              <button
                className={styles.cancelButton}
                onClick={handleRedirectHome}
              >
                Cancelar
              </button>
            </div>
            {message && <p className={styles.errorMessage}>{message}</p>}
          </div>
        ) : (
          <>
            {message && <p className={styles.message}>{message}</p>}

            {currentFlashcardIndex !== null && !showAnswer && (
              <>
                <div className={styles.questionBox}>
                  <h3 className={styles.boxTitle}>Pergunta</h3>
                  <p className={styles.content}>
                    {flashcards[currentFlashcardIndex]?.pergunta}
                  </p>
                </div>
                <button
                  className={styles.showAnswerButton}
                  onClick={() => setShowAnswer(true)}
                >
                  Mostrar resposta
                </button>
              </>
            )}

            {currentFlashcardIndex !== null && showAnswer && (
              <>
                <div className={styles.answerBox}>
                  <h3 className={styles.boxTitle}>Resposta</h3>
                  <p className={styles.content}>
                    {flashcards[currentFlashcardIndex]?.resposta}
                  </p>
                </div>
                <div className={styles.feedbackButtons}>
                  <button
                    className={styles.errorButton}
                    onClick={() => submitReview("nao_lembrei")}
                  >
                    Não Lembrei
                  </button>
                  <button
                    className={styles.difficultButton}
                    onClick={() => submitReview("lembrei_dificuldade")}
                  >
                    Lembrei com Dificuldade
                  </button>
                  <button
                    className={styles.goodButton}
                    onClick={() => submitReview("lembrei_bem")}
                  >
                    Lembrei Bem
                  </button>
                  <button
                    className={styles.easyButton}
                    onClick={() => submitReview("lembrei_facilidade")}
                  >
                    Lembrei com Facilidade
                  </button>
                </div>
                <button
                  className={styles.showQuestionButton}
                  onClick={() => setShowAnswer(false)}
                >
                  Mostrar pergunta novamente
                </button>
              </>
            )}

            {currentFlashcardIndex === null && flashcards.length === 0 && (
              <div className={styles.noFlashcardsMessage}>
                <p>Todos os flashcards deste conteúdo foram revisados. 🎉</p>
                <button
                  className={styles.goBackButton}
                  onClick={handleRedirectHome}
                >
                  Voltar para a Home
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RevisionScreen;

