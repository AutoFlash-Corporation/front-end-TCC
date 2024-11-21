import React from "react";
import Link from "next/link";
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

      <div className={styles.linkWrapper}>
        <Link href="/Login" className={styles.link}>
          Login
        </Link>
      </div>
    </div>
  );
}
