import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Loading from "../component/Loading"; // Ajuste o caminho se necessário
import Menu from "@/component/Menu";
import SearchBar from "@/component/SearchBar";

import withAuth from "../utils/withAuth"

const AutoCardPage = () => {
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
    </div>
  </div>
  );
};

export default withAuth(AutoCardPage);
