import React from "react";
import LoginForm from "@/component/LoginForm";
import styles from "../styles/login.module.css";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/component/Logo";


const LoginPage = () => {
  return (
    <div className={styles.Background}>
      <Logo />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
