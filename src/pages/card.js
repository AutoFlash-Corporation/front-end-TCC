import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Loading from "../component/Loading"; // Ajuste o caminho se necessário
import Menu from "@/component/Menu";
import SearchBar from "@/component/SearchBar";

const CardPage = () => {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false); // Apenas para verificar a autenticação
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

    if (!accessToken) {
      console.warn("Token de acesso ausente. Redirecionando para login...");
      router.push("/login");
    } else {
      setAuthChecked(true); // Concluiu a verificação e está autenticado
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
      </div>
    </div>
  );
};

export default CardPage;
