import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Loading from "../component/Loading/Loading"; // Se você tiver um componente de Loading para exibir durante a checagem

const withAuth = (WrappedComponent) => {
  const AuthHOC = (props) => {
    const router = useRouter();
    const [authChecked, setAuthChecked] = useState(false);
    const [userName, setUserName] = useState(""); 

    useEffect(() => {
      const accessToken = Cookies.get("access");
      const storedUserName = Cookies.get("userName");

      if (!accessToken) {
        console.warn("Token de acesso ausente. Redirecionando para login...");
        router.push("/login");
      } else {
        if (storedUserName) {
          setUserName(storedUserName);
        }
        setAuthChecked(true);
      }
    }, [router]);

    // Exibe o componente carregando enquanto verifica a autenticação
    if (!authChecked) {
      return <Loading />;
    }

    // Retorna o componente original caso a autenticação seja válida
    return <WrappedComponent userName={userName} {...props} />;
  };

  return AuthHOC;
};

export default withAuth;
