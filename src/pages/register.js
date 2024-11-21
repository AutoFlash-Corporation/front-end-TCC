import React from "react";
import RegisterForm from "@/component/RegisterForm";
import styles from "../styles/register.module.css";
import Logo from "@/component/Logo";

const RegisterPage = () => {
  return (
    <div className={styles.Background}>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
