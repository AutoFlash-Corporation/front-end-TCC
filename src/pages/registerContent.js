import React from "react";
import styles from "../component/ContentGroup/contentform.module.css";
import Logo from "@/component/Logo/Logo";
import ContentForm from "../component/ContentGroup/ContentForm";
import Menu from "@/component/Menu/Menu";

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
