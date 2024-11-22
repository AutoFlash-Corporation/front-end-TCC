import { useState } from "react";
import api from "../utils/api";
import styles from "../styles/register.module.css";

function RegisterForm() {
  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
  
    // Validação de username
    const usernamePattern = /^[A-Za-z0-9@._+-]+$/;
    if (!usernamePattern.test(username)) {
      setError("Username inválido. Ele deve conter apenas letras, números e @/./+/-/_.");
      return;
    }
  
    if (password !== confirmPassword) {
      setError("Senhas não conferem");
      return;
    }
  
    const userData = {
      username: username,
      password: password,
      email: email,
      nome: nome,
    };
  
    console.log("Dados enviados:", userData);
  
    try {
      const response = await api.post("/register/", userData);
      console.log("Usuário cadastrado com sucesso", response.data);
    } catch (error) {
      console.error("Erro ao cadastrar usuário", error);
      setError("Erro ao cadastrar usuário, tente novamente.");
    }
  };  

  return (
    <div className={styles.RegisterGroup}>
      <h1>Cadastre-se</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <div className={styles.inputGroup}>
          <label htmlFor="nome" className={styles.inputLabel}>
            Nome:
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>

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
          <label htmlFor="email" className={styles.inputLabel}>
            E-mail:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword" className={styles.inputLabel}>
            Confirme a Senha:
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>
        <div className={styles.ButtonGroup}>
          <p>
            Já possui uma conta?{" "}
            <a href="/login/" className={styles.linkSingup}>
              Faça o Login
            </a>
          </p>
          <button type="submit" className={styles.ButtonLink}>
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;