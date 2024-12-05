import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from '../../component/ContentGroup/contentform.module.css'; // Ajuste o caminho conforme seu CSS

const EditContentPage = () => {
  const router = useRouter();
  const { id } = router.query; // Pega o ID da URL

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (id) {
      // Quando o ID está disponível, faz a chamada para buscar o conteúdo
      fetchConteudo(id);
    }

    // Extraindo o userId do token
    const token = Cookies.get('access');
    if (token) {
      const payload = token.split('.')[1];
      const decodedToken = JSON.parse(atob(payload));
      setUserId(decodedToken.user_id); // Definindo o userId
    }
  }, [id]);

  // Função para buscar o conteúdo a partir do ID
  const fetchConteudo = async (id) => {
    try {
      const token = Cookies.get('access'); // Pega o token do cookie
      if (!token) {
        setMensagem('Token de acesso não encontrado.');
        return;
      }

      const response = await axios.get(`http://127.0.0.1:8000/api/conteudo/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const conteudo = response.data;
      setTitulo(conteudo.titulo); // Preenche o campo título com o valor recebido
      setDescricao(conteudo.descricao); // Preenche o campo descrição com o valor recebido
    } catch (error) {
      setMensagem('Erro ao carregar conteúdo.');
    }
  };

  // Função para atualizar o conteúdo
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    try {
      const token = Cookies.get('access');
      if (!token) {
        setMensagem('Token de acesso não encontrado.');
        return;
      }

      const payload = { titulo, descricao, usuario: userId };

      await axios.put(
        `http://127.0.0.1:8000/api/conteudo/${id}/atualizar/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setMensagem('Conteúdo atualizado com sucesso!');
      // Após a atualização, redireciona para a lista de conteúdos
      router.push('/conteudos/');
    } catch (error) {
      setMensagem('Erro ao atualizar conteúdo.');
    }
  };

  return (
    <div className={styles.LoginGroup}>
      <h1>Editar Conteúdo</h1>
      {mensagem && <p style={{ color: 'red' }}>{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        {/* Campo para título editável */}
        <div className={styles.inputGroup}>
          <label htmlFor="titulo" className={styles.inputLabel}>
            Título:
          </label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)} // Atualiza o título enquanto digita
            required
            className={styles.inputField}
          />
        </div>

        {/* Campo para descrição editável */}
        <div className={styles.inputGroup}>
          <label htmlFor="descricao" className={styles.inputLabel}>
            Descrição:
          </label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)} // Atualiza a descrição enquanto digita
            required
            className={styles.inputField}
            style={{ height: '100px' }}
          />
        </div>

        {/* Botão de submit */}
        <div className={styles.ButtonGroup}>
          <button type="submit" className={styles.ButtonLink}>
            Atualizar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContentPage;
