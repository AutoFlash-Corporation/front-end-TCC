"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Use `usePathname` para capturar a rota
import styles from "../styles/menu.module.css";
import logo from "../image/logo.png";
import { PiSquaresFourLight } from "react-icons/pi";
import { IoPricetagOutline, IoFolderOpenOutline } from "react-icons/io5";
import { BsFileText } from "react-icons/bs";

export default function Menu() {
  const [activeButton, setActiveButton] = useState("");
  const pathname = usePathname(); // Utiliza `usePathname` ao invés de `useRouter`

  // Atualiza o estado do botão ativo com base na rota
  useEffect(() => {
    const pathToButtonMap = {
      "/Initial": "Home",
      "/Card": "Card",
      "/Content": "Conteúdos",
      "/Reports": "Relatórios",
    };
    setActiveButton(pathToButtonMap[pathname] || "");
  }, [pathname]); // Atualiza quando o `pathname` muda

  // Componentização dos botões do menu
  const MenuButton = ({ href, label, icon, name }) => (
    <Link href={href} className={styles.link}>
      <button
        className={`${styles.button} ${
          activeButton === name ? styles.active : ""
        }`}
      >
        {icon} {label}
      </button>
    </Link>
  );

  return (
    <div className={styles.menu}>
        <image src={logo} alt="Logo" width={60} height={60}/>

      <div className={styles.buttons}>
        {/* Barrinha que acompanha o botão ativo */}
        <div
          className={styles.activeBar}
          style={{ top: getBarPosition(activeButton) }}
        />

        {/* Botões do menu */}
        <MenuButton
          href="/home"
          label="Home"
          icon={<PiSquaresFourLight />}
          name="Home"
        />
        <MenuButton
          href="/card"
          label="Card"
          icon={<IoPricetagOutline />}
          name="Card"
        />
        <MenuButton
          href="/conteudos"
          label="Conteúdos"
          icon={<IoFolderOpenOutline />}
          name="Conteúdos"
        />
        <MenuButton
          href="/relatorios"
          label="Relatórios"
          icon={<BsFileText />}
          name="Relatórios"
        />
      </div>
    </div>
  );
}

// Função para calcular a posição da barra com base no botão ativo usando if/else
function getBarPosition(button) {
  const positions = {
    Home: "7px",
    Card: "97px",
    Conteúdos: "190px",
    Relatórios: "285px",
  };

  return positions[button] || "0px"; // Posição padrão caso o botão não seja encontrado
}
