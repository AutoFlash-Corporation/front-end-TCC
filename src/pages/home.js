// pages/home.js
import React from "react";
import { useRouter } from "next/router";

const Home = ({ isAuthenticated }) => {
  const router = useRouter();

  if (!isAuthenticated) {
    // Redireciona para a página de login se não estiver autenticado
    router.push("/login");
    return null; // Impede o carregamento da página
  }

  return (
    <div>
      <main>
        <h1>Bem-vindo à Home!</h1>
        <p>Você está logado e foi redirecionado para a página inicial.</p>
      </main>
    </div>
  );
};

export async function getServerSideProps(context) {
  // Verifica se o token está nos cookies
  const token = context.req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      isAuthenticated: true,
    },
  };
}

export default Home;
