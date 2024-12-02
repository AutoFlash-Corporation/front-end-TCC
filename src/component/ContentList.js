import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import withAuth from "../utils/withAuth";
import styles from "../styles/contentlist.module.css"; // Importando o arquivo CSS com styles

const ContentList = () => {
  const [conteudos, setConteudos] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [forceUpdate, setForceUpdate] = useState(0);

  const decodeJwt = (token) => {
    const payload = token.split('.')[1];
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("access");

      if (!token) {
        setMensagem("Token de acesso não encontrado.");
        return;
      }

      const decodedToken = decodeJwt(token);
      const userId = decodedToken.user_id;

      const payloadData = {
        titulo: "Novo Conteúdo",
        descricao: "Descrição do conteúdo",
        usuario: userId,
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/conteudo/",
        payloadData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setConteudos((prevConteudos) => [...prevConteudos, response.data]);
      setForceUpdate((prev) => prev + 1);
      setMensagem("Conteúdo cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar conteúdo:", error);
      setMensagem("Erro ao cadastrar conteúdo.");
    }
  };

  useEffect(() => {
    fetchConteudos();
  }, [forceUpdate]);

  return (
    <div className={styles.contentContainer}>
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
                  {conteudos.length} card{conteudos.length !== 1 ? 's' : ''} adicionados
                </span>
                <button className={styles.cardFooterButton}>Ver mais</button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noContent}>Nenhum conteúdo encontrado.</p>
        )}
      </div>
      <button onClick={handleSubmit} className={styles.addContentButton}>
        Cadastrar Novo Conteúdo
      </button>
    </div>
  );
};

export default withAuth(ContentList);