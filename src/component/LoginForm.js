import { useState } from "react";
import { loginUser } from "../utils/api";
import styles from "../styles/login.module.css";
import logo from "../image/logo.png";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await loginUser(username, password);
      //Retorno da API
      console.log("Resposta da API:", response);  // Verifique o formato da resposta
      console.log("Login bem-sucedido!", response.data);
    } catch (error) {
      console.error("Erro ao fazer login!", error);
    }
  };

  return (
    <div>
      <div className={styles.Logo}>
        <div className={styles.LogoGroup}>
          <div className={styles.LogoLink}>
          </div>
        </div>
      </div>

      <div className={styles.LoginGroup}>
        <h1>Bem vindo de volta!</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div className={styles.LoginGroup}></div>
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
              <a href="/forgot-password" className={styles.linkSingup}>
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
