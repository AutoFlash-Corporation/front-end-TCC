import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import withAuth from "../../utils/withAuth";
import styles from "../ContentGroup/contentlist.module.css";

const ContentList = () => {
  const [conteudos, setConteudos] = useState([]);
  const [conteudoSelecionado, setConteudoSelecionado] = useState(null);
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
      setForceUpdate((prev) => prev + 1);
      if (conteudoSelecionado && conteudoSelecionado.id === id) {
        setConteudoSelecionado(null);
      }
    } catch (error) {
      console.error("Erro ao excluir conteúdo:", error);
      setMensagem("Erro ao excluir conteúdo.");
    }
  };

  const handleEdit = (id) => {
    window.location.href = `/editarConteudo/${id}`;
  };

  const handleSelect = (conteudo) => {
    setConteudoSelecionado(conteudo);
  };

  useEffect(() => {
    fetchConteudos();
  }, [forceUpdate]);

  return (
    <div className={styles.pageContainer}>
      {/* Coluna de conteúdos */}
      <div className={styles.contentSidebar}>
        <div>
          <a href="/registerContent/" className={styles.addContentButton}>
            Cadastrar novo conteúdo
          </a>
        </div>
        <div className={styles.contentContainer}>
          <h1 className={styles.contentTitle}>Conteúdos</h1>
          {conteudos.map((conteudo) => (
            <button
              key={conteudo.id}
              onClick={() => handleSelect(conteudo)}
              className={`${styles.contentButton} ${
                conteudoSelecionado?.id === conteudo.id
                  ? styles.activeButton
                  : ""
              }`}
            >
              {conteudo.titulo}
            </button>
          ))}
        </div>
      </div>

      {/* Área de exibição do conteúdo selecionado */}
      <div className={styles.contentDisplay}>
        {conteudoSelecionado ? (
          <div className={styles.selectedContent}>
            <h2>{conteudoSelecionado.titulo}</h2>
            <p>{conteudoSelecionado.descricao}</p>
            <div className={styles.actionButtons}>
              <button
                onClick={() => handleEdit(conteudoSelecionado.id)}
                className={styles.editButton}
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(conteudoSelecionado.id)}
                className={styles.deleteButton}
              >
                Excluir
              </button>
            </div>
          </div>
        ) : (
          <p className={styles.noContentSelected}>
            Selecione um conteúdo para visualizá-lo aqui.
          </p>
        )}
      </div>
    </div>
  );
};

export default withAuth(ContentList);
