import { useState } from "react";
import { useRouter } from "next/router";
import { loginUser } from "../utils/api";
import styles from "../styles/login.module.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Para mostrar erro
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await loginUser(username, password);
      
      // Verifique a estrutura da resposta da API
      console.log("Resposta completa da API:", response);

      // Agora, dependendo do formato da resposta, altere o código para acessar corretamente o token
      if (response.status === 200 && response.data && response.data.token) {
        const token = response.data.token;
        localStorage.setItem("token", token); // Salva o token no localStorage
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
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Exibe o erro, se houver */}
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
