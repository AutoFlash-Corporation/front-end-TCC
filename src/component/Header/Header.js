import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../Header/header.module.css";
import logo from "../../image/logo.svg"; // Ajuste o caminho se necessário

const Header = ({ siteTitle = "AutoFlash", links = [] }) => {
  return (
    <header className={styles.Header}>
      <div className={styles.HeaderGroup}>
        <div className={styles.HeaderLink}>
          <Link href="/">
            <Image src={logo} width={60} height={60} alt={`Logo do site ${siteTitle}`} />
          </Link>
          <h1>{siteTitle}</h1>
        </div>
        <nav className={styles.HeaderButton}>
          {links.length > 0 ? (
            links.map((link, index) =>
              link.path && link.label ? (
                <Link key={index} href={link.path} className={styles[link.className]}>
                  {link.label}
                </Link>
              ) : (
                console.error(`Link inválido:`, link)
              )
            )
          ) : (
            <p>Sem links disponíveis</p>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
