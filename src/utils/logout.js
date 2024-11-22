import Cookies from "js-cookie";
import { useRouter } from "next/router";

const logout = () => {
  // Apagar os cookies de autenticação
  Cookies.remove("access");
  Cookies.remove("refresh");
  Cookies.remove("userName");

  // Redirecionar para a página de login
  const router = useRouter();
  router.push("/login");
};

export default logout;
