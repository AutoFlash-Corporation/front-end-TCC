import React, { useState } from "react";
import Menu from "@/component/Menu";
import SearchBar from "../component/SearchBar"; // Importando a barra de pesquisa
import style from "@/styles/home.module.css";
import MyCalendar from "@/component/Calendar";
import Logo from "@/component/Logo";
import ShowBox from "@/component/ShowBox";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoPersonAdd } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { IoPaperPlaneSharp } from "react-icons/io5";

import withAuth from "../utils/withAuth"

const Home = ({ userName }) => {
  const [searchResults, setSearchResults] = useState([]); // Armazenando resultados da pesquisa

  // Função para lidar com a pesquisa
  const handleSearch = (query) => {
    console.log("Pesquisando:", query);
    setSearchResults([`Resultado para: ${query}`]); // Simulação de resultado
  };

  return (
    <div>
      {/* Barra de pesquisa */}
      <SearchBar onSearch={handleSearch} />

      {/* Exibindo os resultados da pesquisa */}
      <div>
        {searchResults.map((result, index) => (
          <p key={index}>{result}</p>
        ))}
      </div>
      <div>
        <Menu />

        <div className={style.Background}>
          <header>
            <h2>Bem-vindo(a) de volta{userName ? `, ${userName}` : "!"}</h2>
          </header>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default withAuth(Home);
