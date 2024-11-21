import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { loginUser } from "../utils/auth";
import Cookies from "js-cookie";
import styles from "../styles/login.module.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Para mostrar erro
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Verifica se já está autenticado
  const router = useRouter();

  useEffect(() => {
    // Verifica se o token de acesso já está presente
    const accessToken = Cookies.get("access");

    if (accessToken) {
      setIsAuthenticated(true); // Se o token existir, o usuário já está autenticado
      router.push("/home"); // Redireciona diretamente para a home
    }
  }, [router]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await loginUser(username, password);

      if (response.status === 200 && response.data && response.data.token) {
        const token = response.data.token;
        Cookies.set("access", token, { expires: 7 }); // Armazena o token nos cookies por 7 dias
        router.push("/home"); // Redireciona para a página home
      } else {
        setError("Erro ao fazer login, tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Erro ao fazer login. Tente novamente.");
    }
  };

  return (
    <div>
      <div className={styles.Logo}>
        <div className={styles.LogoGroup}>
          <div className={styles.LogoLink}></div>
        </div>
      </div>

      <div className={styles.LoginGroup}>
        <h1>Bem-vindo de volta!</h1>

        {isAuthenticated && (
          <p style={{ color: "green" }}>
            Você já está autenticado! Redirecionando para a página inicial...
          </p>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.inputLabel}>
              Usuário:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.inputLabel}>
              Senha:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.ButtonGroup}>
            <a href="/forgot-password" className={styles.linkForgot}>
              Esqueceu a senha?
            </a>

            <button type="submit" className={styles.ButtonLink}>
              Entrar
            </button>

            <p>
              Ainda não possui uma conta?{" "}
              <a href="/register/" className={styles.linkSingup}>
                Registre-se
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;