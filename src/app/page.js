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

      <div className={styles.backgroundSecao2}>
        <div className={styles.Secao2Group}>
          <h2>Para quem é o AutoFlash?</h2>
        </div>
        <div className={styles.BlankSpace1}></div>
        <div className={styles.Secao2CardsGroup}>
          <div className={styles.Secao2Card}>
            <h3>Na escola</h3>
            <div className={styles.text}>
              Auxílio na memorização para exames, provas e reforço escolar.
            </div>
            <a href="/register/">Saiba mais</a>
          </div>
          <div className={styles.Secao2Card}>
            <h3>No trabalho</h3>
            <div className={styles.text}>
              {" "}
              Memorize novos conceitos e aprimore suas habilidades profissionais
              de maneira eficaz.
            </div>
            <a href="/register/">Saiba mais</a>
          </div>
          <div className={styles.Secao2Card}>
            <h3>Em casa</h3>
            <div className={styles.text}>
              Estudos de idiomas e aprimoramento pessoal.
            </div>
            <a href="/register/">Saiba mais</a>
          </div>
          <div className={styles.Secao2Card}>
            <h3>Em qualquer lugar</h3>
            <div className={styles.text}>
              Estude em qualquer lugar e a qualquer hora.
            </div>
            <a href="/register/">Saiba mais</a>
          </div>
        </div>
      </div>
    </div>
  );
}
