import React from "react";
import styles from "../component/ContentGroup/contentform.module.css";
import ContentForm from "../component/ContentGroup/ContentForm";

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
