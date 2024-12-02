import React from "react";
import styles from "../styles/contentform.module.css";
import Logo from "@/component/Logo";
import ContentForm from "@/component/ContentForm";
import Menu from "@/component/Menu";

const RegisterContentPage = () => {
  return (
    <div className={styles.Background}>
    
      <ContentForm />

      <a href="/conteudos/" className={styles.addContentButton}>
        Ver lista de conteúdos
      </a>

    </div>
  );
};

export default RegisterContentPage;
