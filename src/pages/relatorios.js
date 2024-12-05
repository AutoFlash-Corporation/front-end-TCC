import React, { useState } from "react";
import Menu from "@/component/Menu/Menu";
import SearchBar from "../component/SearchBar/SearchBar"; // Importando a barra de pesquisa
import style from "@/styles/home.module.css";
import MyCalendar from "@/component/Calendar/Calendar";
import Logo from "@/component/Logo/Logo";
import ShowBox from "@/component/ShowBox/ShowBox";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoPersonAdd } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { IoPaperPlaneSharp } from "react-icons/io5";

import withAuth from "../utils/withAuth"

const Relatorios = ({ userName }) => {
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
          <main>
          <ShowBox
                icon={<FaPeopleGroup />}
                title="Total de cards"
                value="5 234"
                description="Ver todos"
                link="/card"
            />
            <ShowBox
                icon={<IoPersonAdd />}
                title="Cards revisados hoje"
                value="150"
                description="Ver todos"
                link="/card"
            />
            <ShowBox
                icon={<IoWallet />}
                title="Previsão para amanhã"
                value="98"
                description="Ver Cards"
                link="/card"
            />
            <ShowBox
                icon={<IoPaperPlaneSharp />}
                title="Total de conteúdos"
                value="15"
                description="Ver todos"
                link="/conteudos"
            />
          </main>
          <MyCalendar />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default withAuth(Relatorios);
