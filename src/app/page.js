import React from "react";
import Header from "@/component/Header";
import styles from "../app/page.module.css";

export default function Home() {
  return (
    <div className={styles.body}>
      <Header
        siteTitle="AutoFlash"
        links={[
          {
            path: "/register/",
            label: "Cadastre-se",
            className: "HeaderLink-singup",
          },
          {
            path: "/login/",
            label: "Entrar",
            className: "HeaderLink-login",
          },
        ]}
      />
      <div className={styles.background}>
        <div className={styles.MainGroup}>
          <h1>Otimize sua memorização</h1>
          <p>Qualquer assunto, em qualquer hora, para todas as idades!</p>
          <a href="/register/">
            <button>Cadastre-se gratuitamente</button>
          </a>
        </div>
      </div>
    </div>
  );
}
