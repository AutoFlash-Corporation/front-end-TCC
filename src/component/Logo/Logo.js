import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../Logo/logo.module.css"; // Importa o CSS específico para o Logo
import logo from "../../image/logo.svg"; // Ajuste o caminho se necessário

const Logo = ({ siteTitle = "AutoFlash" }) => {
  return (
    <div className={styles.LogoContainer}>
      <Link href="/">
        <Image
          src={logo}
          width={70}
          height={70}
          alt={`Logo do site ${siteTitle}`}
        />
      </Link>
      <h1 className={styles.LogoTitle}>{siteTitle}</h1>
    </div>
  );
};

export default Logo;
