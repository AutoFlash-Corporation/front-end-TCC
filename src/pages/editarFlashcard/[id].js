import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import styles from "../../component/ContentGroup/contentform.module.css"; // Ajuste o caminho conforme seu CSS

const EditFlashcardPage = () => {
  const router = useRouter();
  const { id } = router.query; // Pega o ID da URL

  const [pergunta, setPergunta] = useState('');
  const [resposta, setResposta] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [conteudos, setConteudos] = useState([]); // Para armazenar os conteúdos
  const [mensagem, setMensagem] = useState('');
  const [userId, setUserId] = useState('');

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
        setConteudos(response.data); // Define os conteúdos no state
      } catch (error) {
        setMensagem("Erro ao carregar conteúdos.");
      }
    };

    fetchConteudos();

    // Extraindo o userId do token
    const token = Cookies.get("access");
    if (token) {
      const payload = token.split('.')[1];
      const decodedToken = JSON.parse(atob(payload));
      setUserId(decodedToken.user_id); // Definindo o userId
    }
    
    if (id) {
      fetchFlashcard(id);
    }
  }, [id]);

  // Função para buscar o flashcard a partir do ID
  const fetchFlashcard = async (id) => {
    try {
      const token = Cookies.get("access"); // Pega o token do cookie
      if (!token) {
        setMensagem("Token de acesso não encontrado.");
        return;
      }

      const response = await axios.get(`http://127.0.0.1:8000/api/flashcard/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const flashcard = response.data;
      setPergunta(flashcard.pergunta); // Preenche o campo pergunta com o valor recebido
      setResposta(flashcard.resposta); // Preenche o campo resposta com o valor recebido
      setConteudo(flashcard.conteudo); // Preenche o campo conteudo com o valor recebido
    } catch (error) {
      setMensagem("Erro ao carregar flashcard.");
    }
  };

  // Função para atualizar o conteúdo
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

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

      const payload = {
        pergunta,
        resposta,
        conteudo, // Enviando o ID do conteúdo
        usuario: userId, // Incluindo o userId
      };

      const response = await axios.put(
        `http://127.0.0.1:8000/api/flashcard/${id}/atualizar/`, // Endpoint para atualizar flashcard
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMensagem("Flashcard atualizado com sucesso!");
      router.push("/card/"); // Após a atualização, redireciona para a lista de Flashcards
    } catch (error) {
      setMensagem("Erro ao atualizar flashcard.");
    }
  };

  return (
    <div className={styles.LoginGroup}>
      <h1>Editar Flashcard</h1>
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
            Atualizar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFlashcardPage;
