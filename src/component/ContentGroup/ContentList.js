import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import withAuth from "../../utils/withAuth";
import styles from "../ContentGroup/contentlist.module.css"; // Importando o arquivo CSS com styles

const ContentList = () => {
  const [conteudos, setConteudos] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [forceUpdate, setForceUpdate] = useState(0);

  const decodeJwt = (token) => {
    const payload = token.split(".")[1];
    const decodedToken = JSON.parse(atob(payload));
    return decodedToken;
  };

  const fetchConteudos = async () => {
    try {
      const token = Cookies.get("access");

      if (!token) {
        setMensagem("Token de acesso não encontrado.");
        return;
      }

      const decodedToken = decodeJwt(token);
      const userId = decodedToken.user_id;

      const response = await axios.get(
        `http://127.0.0.1:8000/api/conteudo/lista/?usuario=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setConteudos(response.data);
    } catch (error) {
      console.error("Erro ao buscar conteúdos:", error);
      setMensagem("Erro ao listar os conteúdos.");
    }
  };

  const handleDelete = async (id) => {
    const token = Cookies.get("access");
    if (!token) {
      setMensagem("Token de acesso não encontrado.");
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/api/conteudo/${id}/excluir/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setMensagem("Conteúdo excluído com sucesso!");
      setForceUpdate((prev) => prev + 1); // Força uma atualização dos conteúdos
    } catch (error) {
      console.error("Erro ao excluir conteúdo:", error);
      setMensagem("Erro ao excluir conteúdo.");
    }
  };

  const handleEdit = (id) => {
    // Redireciona para a página de edição
    window.location.href = `/editarConteudo/${id}`;
  };

  useEffect(() => {
    fetchConteudos();
  }, [forceUpdate]);

  return (
    <div className={styles.contentContainer}>
      <a href="/registerContent/" className={styles.addContentButton}>
        Cadastrar novo conteúdo
      </a>
      <h1 className={styles.contentTitle}>Conteúdos já cadastrados:</h1>
      {mensagem && <p className={styles.message}>{mensagem}</p>}
      <div className={styles.contentGrid}>
        {conteudos.length > 0 ? (
          conteudos.map((conteudo) => (
            <div key={conteudo.id} className={styles.contentCard}>
              <h2 className={styles.cardTitle}>{conteudo.titulo}</h2>
              <p className={styles.cardDescription}>{conteudo.descricao}</p>
              <div className={styles.cardFooter}>
                <span className={styles.cardFooterText}>
                  {conteudos.length} card{conteudos.length !== 1 ? "s" : ""}{" "}
                  adicionados
                </span>
              </div>
              {/* Botões de Editar e Excluir */}
              <div className={styles.cardActions}>
                <button
                  onClick={() => handleEdit(conteudo.id)}
                  className={styles.cardEditButton} 
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(conteudo.id)}
                  className={styles.cardDeleteButton}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noContent}>Nenhum conteúdo encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default withAuth(ContentList);
