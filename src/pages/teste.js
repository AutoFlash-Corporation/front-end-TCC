import React, { useState } from "react";
import SearchBar from "../component/SearchBar"; // Importando a barra de pesquisa

import withAuth from "../utils/withAuth";
import ContentForm from "@/component/ContentForm";
import ContentList from "@/component/ContentList";
import FlashcardForm from "@/component/FlashcardForm";

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
        <ContentForm />
        <ContentList />
        <FlashcardForm />
      </div>
    </div>
  );
};

export default withAuth(Home);
