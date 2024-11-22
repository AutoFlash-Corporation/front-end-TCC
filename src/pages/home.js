import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Loading from "../component/Loading"; // Ajuste o caminho se necessário
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

const Home = () => {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false); // Verifica autenticação
  const [userName, setUserName] = useState(""); // Nome do usuário
  const [searchResults, setSearchResults] = useState([]); // Armazenando resultados da pesquisa

  // Função para lidar com a pesquisa
  const handleSearch = (query) => {
    console.log("Pesquisando:", query);
    // Aqui você pode fazer uma busca em um banco de dados, API, ou filtrar os dados
    // Exemplo simples:
    setSearchResults([`Resultado para: ${query}`]); // Simulação de resultado
  };

  useEffect(() => {
    const accessToken = Cookies.get("access");
    const storedUserName = Cookies.get("userName"); // Obtém o nome do usuário do cookie

    if (!accessToken) {
      console.warn("Token de acesso ausente. Redirecionando para login...");
      router.push("/login");
    } else {
      // Verifica se o nome de usuário existe no cookie
      if (storedUserName) {
        setUserName(storedUserName); // Define o nome do usuário
      }
      setAuthChecked(true); // Verificação concluída
    }
  }, [router]);

  // Enquanto a verificação não foi concluída, exibe o Loading
  if (!authChecked) {
    return <Loading />;
  }

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
                title="Conteúdos"
                value="15"
                description="Ver todos"
                link="/card"
            />
          </main>
          <MyCalendar />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Home;
