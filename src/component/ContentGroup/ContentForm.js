import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import withAuth from "../../utils/withAuth";
import styles from "../ContentGroup/contentform.module.css";

const ContentForm = ({ userName }) => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("access");

      if (!token) {
        setMensagem("Token de acesso não encontrado.");
        return;
      }

      const payload = token.split('.')[1];
      const decodedToken = JSON.parse(atob(payload));
      const userId = decodedToken.user_id;

      const payloadData = { 
        titulo, 
        descricao, 
        usuario: userId 
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

      setMensagem("Conteúdo cadastrado com sucesso!");
      setTitulo("");
      setDescricao("");
    } catch (error) {
      if (error.response) {
        setMensagem(`Erro: ${JSON.stringify(error.response.data)}`);
      } else {
        setMensagem("Erro ao cadastrar conteúdo.");
      }
    }
  };

  return (
    <div className={styles.LoginGroup}>
      <h1>Cadastrar Conteúdo</h1>
      {mensagem && <p style={{ color: "red" }}>{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="titulo" className={styles.inputLabel}>
            Título:
          </label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="descricao" className={styles.inputLabel}>
            Descrição:
          </label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
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
    </div>
  );
};

export default withAuth(ContentForm);
