import React from "react";
import Link from "next/link";
import Image from "next/image";

import Header from "@/component/Header/Header";
import logo from "../image/logo.svg";

import styles from "../app/page.module.css";
import Carousel from "@/component/Carousel/Carousel";

export default function Home({ siteTitle = "AutoFlash", links = [] }) {
  return (
    <div className={styles.body}>
      {/* Cabeçalho */}
      <Header
        siteTitle="AutoFlash"
        links={[
          {
            path: "/register/",
            label: "Cadastre-se",
            className: "HeaderLinksingup",
          },
          {
            path: "/login/",
            label: "Entrar",
            className: "HeaderLinklogin",
          },
        ]}
      />

      {/* Seção principal */}
      <div className={styles.background}>
        <div className={styles.MainGroup}>
          <h1>Otimize sua Memorização</h1>
          <p>
            O AutoFlash utiliza a repetição espaçada para melhorar sua memória e
            aprendizado, tornando os estudos mais eficazes!
          </p>
          <a href="/register/">
            <button>Cadastre-se gratuitamente</button>
          </a>
        </div>
      </div>
    </div>
  );
}
