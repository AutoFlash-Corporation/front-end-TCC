import React, { useState } from "react";
import Menu from "@/component/Menu/Menu";
import SearchBar from "../component/SearchBar/SearchBar"; // Importando a barra de pesquisa
import style from "@/styles/home.module.css";
import MyCalendar from "@/component/Calendar/Calendar";
import Logo from "@/component/Logo/Logo";
import ShowBox from "../component/ShowBox/ShowBox";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoPersonAdd } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { IoPaperPlaneSharp } from "react-icons/io5";

import withAuth from "../utils/withAuth"

const Home = ({ userName }) => {

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

export default withAuth(Home);