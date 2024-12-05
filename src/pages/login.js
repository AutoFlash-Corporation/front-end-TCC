import React from "react";
import LoginForm from "../component/LoginForm/LoginForm";
import styles from "../styles/login.module.css";
import Logo from "../component/Logo/Logo";


const LoginPage = () => {
  return (
    <div className={styles.Background}>
      <Logo />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
