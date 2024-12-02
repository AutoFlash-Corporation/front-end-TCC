import { useState } from "react";
import { useRouter } from "next/router";
import { loginUser } from "../utils/auth";
import Cookies from "js-cookie";
import styles from "../styles/login.module.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      console.log("Iniciando login com:", { username, password });
      const { access, refresh } = await loginUser(username, password);

      // Salvar tokens nos cookies
      Cookies.set("access", access, { expires: 1 }); // Expira em 1 dia
      Cookies.set("refresh", refresh, { expires: 7 }); // Expira em 7 dias
      Cookies.set("userName", username, { expires: 1 }); // Salva o nome do usuário no cookie (expira em 1 dia)

      console.log("Login bem-sucedido, tokens salvos nos cookies.");

      // Redirecionar para a página inicial
      router.push("/home");
    } catch (err) {
      console.error("Erro durante o login:", err);
      setError("Erro ao fazer login. Verifique suas credenciais e tente novamente.");
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