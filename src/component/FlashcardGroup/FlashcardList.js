import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FaTrash, FaEdit } from "react-icons/fa"; // Importando ícones
import withAuth from "../../utils/withAuth";
import styles from "../FlashcardGroup/flashcardList.module.css";

const FlashcardList = () => {
  const [conteudos, setConteudos] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [conteudoSelecionado, setConteudoSelecionado] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [erroFlashcards, setErroFlashcards] = useState("");

  const fetchConteudos = async () => {
    try {
      const token = Cookies.get("access");
      if (!token) {
        setMensagem("Token de acesso não encontrado.");
        return;
      }

      const response = await axios.get("http://127.0.0.1:8000/api/conteudo/lista/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConteudos(response.data);
    } catch (error) {
      console.error("Erro ao buscar conteúdos:", error);
      setMensagem("Erro ao listar conteúdos.");
    }
  };

  const fetchTodosFlashcards = async () => {
    try {
      const token = Cookies.get("access");
      if (!token) {
        setMensagem("Token de acesso não encontrado.");
        return;
      }

      const response = await axios.get("http://127.0.0.1:8000/api/flashcard/lista/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFlashcards(response.data);
      setConteudoSelecionado(null);
      setErroFlashcards("");
    } catch (error) {
      console.error("Erro ao buscar todos os flashcards:", error);
      setMensagem("Erro ao listar flashcards.");
    }
  };

  const fetchFlashcardsPorConteudo = async (conteudoId) => {
    try {
      const token = Cookies.get("access");
      if (!token) {
        setMensagem("Token de acesso não encontrado.");
        return;
      }

      const response = await axios.get(
        `http://127.0.0.1:8000/api/flashcard/conteudo/${conteudoId}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.length === 0) {
        setFlashcards([]);
        setErroFlashcards("Nenhum flashcard vinculado a este conteúdo foi encontrado.");
      } else {
        setFlashcards(response.data);
        setErroFlashcards("");
      }
    } catch (error) {
      console.error("Erro ao buscar flashcards:", error);
      setMensagem("Erro ao listar flashcards.");
      setFlashcards([]);
      setErroFlashcards("Esse conteúdo ainda não possui flashcards vinculados! :(");
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
      fetchTodosFlashcards(); // Atualiza a lista de flashcards
    } catch (error) {
      console.error("Erro ao excluir flashcard:", error);
      setMensagem("Erro ao excluir flashcard.");
    }
  };

  const handleEdit = (id) => {
    window.location.href = `/editarFlashcard/${id}`;
  };

  const handleSelectConteudo = (conteudo) => {
    setConteudoSelecionado(conteudo);
    fetchFlashcardsPorConteudo(conteudo.id);
  };

  useEffect(() => {
    fetchConteudos();
    fetchTodosFlashcards();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentSidebar}>
        <div>
          <a href="/registerFlashcard/" className={styles.addFlashcardButton}>
            Cadastrar novo 
          </a>
          <button onClick={fetchTodosFlashcards} className={styles.listAllButton}>
            Listar todos
          </button>
        </div>
        <h1 className={styles.contentTitle}>Conteúdos</h1>
        <div>
          {conteudos.map((conteudo) => (
            <button
              key={conteudo.id}
              onClick={() => handleSelectConteudo(conteudo)}
              className={`${styles.contentButton} ${
                conteudoSelecionado?.id === conteudo.id ? styles.activeButton : ""
              }`}
            >
              {conteudo.titulo}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.contentDisplay}>
        {conteudoSelecionado ? (
          <div>
            <h2>{conteudoSelecionado.titulo}</h2>
            {erroFlashcards ? (
              <p className={styles.noContentSelected}>{erroFlashcards}</p>
            ) : (
              <div className={styles.flashcardGrid}>
                {flashcards.map((flashcard) => (
                  <div key={flashcard.id} className={styles.flashcardCard}>
                    <h3 className={styles.cardTitle}>{flashcard.pergunta}</h3>
                    <p className={styles.cardDescription}>{flashcard.resposta}</p>
                    <div className={styles.cardActions}>
                      <FaEdit
                        className={styles.editIcon}
                        onClick={() => handleEdit(flashcard.id)}
                      />
                      <FaTrash
                        className={styles.deleteIcon}
                        onClick={() => handleDelete(flashcard.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2>Todos os Flashcards</h2>
            <div className={styles.flashcardGrid}>
              {flashcards.length > 0 ? (
                flashcards.map((flashcard) => (
                  <div key={flashcard.id} className={styles.flashcardCard}>
                    <h3 className={styles.cardTitle}>{flashcard.pergunta}</h3>
                    <p className={styles.cardDescription}>{flashcard.resposta}</p>
                    <div className={styles.cardActions}>
                      <FaEdit
                        className={styles.editIcon}
                        onClick={() => handleEdit(flashcard.id)}
                      />
                      <FaTrash
                        className={styles.deleteIcon}
                        onClick={() => handleDelete(flashcard.id)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.noFlashcards}>Nenhum flashcard encontrado.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(FlashcardList);
