import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Loading from "../component/Loading"; // Ajuste o caminho se necessário
import Menu from "@/component/Menu";

const RevisaoPage = () => {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false); // Apenas para verificar a autenticação

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
      <Menu />
    </div>
  );
};

export default RevisaoPage;
