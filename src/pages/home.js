import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Menu from "@/component/Menu/Menu";
import style from "@/styles/home.module.css";
import MyCalendar from "@/component/Calendar/Calendar";
import ShowBox from "../component/ShowBox/ShowBox";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoPersonAdd } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { IoPaperPlaneSharp } from "react-icons/io5";

import withAuth from "../utils/withAuth";

const Home = ({ userName }) => {
  const [totalFlashcards, setTotalFlashcards] = useState(0);
  const [totalConteudos, setTotalConteudos] = useState(0);
  const [flashcardsHoje, setFlashcardsHoje] = useState(0);
  const [flashcardsAmanha, setFlashcardsAmanha] = useState(0);
  const [error, setError] = useState("");

  // Função para buscar o total de flashcards
  const fetchTotalFlashcards = async () => {
    try {
      const token = Cookies.get("access");
      if (!token) throw new Error("Token de acesso não encontrado.");

      const response = await axios.get("http://127.0.0.1:8000/api/flashcard/contar/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTotalFlashcards(response.data.total_flashcards);
    } catch (err) {
      console.error("Erro ao buscar total de flashcards:", err);
      setError("Erro ao carregar dados de flashcards.");
    }
  };

  // Função para buscar o total de conteúdos
  const fetchTotalConteudos = async () => {
    try {
      const token = Cookies.get("access");
      if (!token) throw new Error("Token de acesso não encontrado.");

      const response = await axios.get("http://127.0.0.1:8000/api/conteudo/contar/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTotalConteudos(response.data.total_conteudos);
    } catch (err) {
      console.error("Erro ao buscar total de conteúdos:", err);
      setError("Erro ao carregar dados de conteúdos.");
    }
  };

  // Função para buscar flashcards para revisar hoje
  const fetchFlashcardsHoje = async () => {
    try {
      const token = Cookies.get("access");
      if (!token) throw new Error("Token de acesso não encontrado.");

      const response = await axios.get("http://127.0.0.1:8000/api/flashcards/hoje/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFlashcardsHoje(response.data.flashcards_para_hoje);
    } catch (err) {
      console.error("Erro ao buscar flashcards para hoje:", err);
      setError("Erro ao carregar dados de revisão para hoje.");
    }
  };

  // Função para buscar previsão de flashcards para amanhã
  const fetchFlashcardsAmanha = async () => {
    try {
      const token = Cookies.get("access");
      if (!token) throw new Error("Token de acesso não encontrado.");

      const response = await axios.get("http://127.0.0.1:8000/api/flashcards-para-amanha/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFlashcardsAmanha(response.data.flashcards_para_amanha);
    } catch (err) {
      console.error("Erro ao buscar previsão de flashcards para amanhã:", err);
      setError("Erro ao carregar previsão de revisão para amanhã.");
    }
  };

  // Carregar os dados ao montar o componente
  useEffect(() => {
    fetchTotalFlashcards();
    fetchTotalConteudos();
    fetchFlashcardsHoje();
    fetchFlashcardsAmanha();
  }, []);

  return (
    <div>
      <div>
        <Menu />

        <div className={style.Background}>
          <header>
            <h2>Bem-vindo(a) de volta{userName ? `, ${userName}` : "!"}</h2>
          </header>

          <main>
            <ShowBox
              icon={<FaPeopleGroup />}
              title="Total de cards"
              value={totalFlashcards}
              description="Ver todos"
              link="/card"
            />
            <ShowBox
              icon={<IoPersonAdd />}
              title="Cards para revisar hoje"
              value={flashcardsHoje}
              description="Vamos lá"
              link="/revisao"
            />
            <ShowBox
              icon={<IoWallet />}
              title="Cards para amanhã"
              value={flashcardsAmanha}
              description="Ver Cards"
              link="/card"
            />
            <ShowBox
              icon={<IoPaperPlaneSharp />}
              title="Total de conteúdos"
              value={totalConteudos}
              description="Ver todos"
              link="/conteudos"
            />
          </main>
          {error && <p className={style.error}>{error}</p>}
          <MyCalendar />
        </div>
      </div>
    </div>
  );
};

export default withAuth(Home);
