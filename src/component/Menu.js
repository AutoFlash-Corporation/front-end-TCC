"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Use `usePathname` para capturar a rota
import styles from "../styles/menu.module.css";

import { PiSquaresFourLight } from "react-icons/pi";
import { IoPricetagOutline, IoFolderOpenOutline } from "react-icons/io5";
import { BsFileText } from "react-icons/bs";
import { GiSpellBook } from "react-icons/gi";
import { LuFolders } from "react-icons/lu";

export default function Menu() {
  const [activeButton, setActiveButton] = useState("");
  const pathname = usePathname(); // Captura a rota atual

  // Atualiza o estado do botão ativo com base na rota
  useEffect(() => {
    switch (pathname) {
      case "/home":
        setActiveButton("Home");
        break;
      case "/card":
        setActiveButton("Card");
        break;
      case "/autocard":
        setActiveButton("Autocard");
        break;
      case "/conteudos":
        setActiveButton("Conteúdos");
        break;
      case "/revisao":
        setActiveButton("Revisão");
        break;
      case "/relatorios":
        setActiveButton("Relatórios");
        break;
      default:
        setActiveButton(""); // Reseta se nenhuma rota é encontrada
    }
  }, [pathname]);

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
       
      <div className={styles.buttons}>
        {/* Barrinha que acompanha o botão ativo */}
        <div
          className={styles.activeBar}
          style={{
            transform: `translateY(${getBarPosition(activeButton)}px)`,
            transition: "transform 0.3s ease-in-out", // Adiciona animação suave
          }}
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
          href="/autocard"
          label="Autocard"
          icon={<GiSpellBook />}
          name="Autocard"
        />
        <MenuButton
          href="/conteudos"
          label="Conteúdos"
          icon={<BsFileText />}
          name="Conteúdos"
        />
        <MenuButton
          href="/revisao"
          label="Revisão"
          icon={<IoFolderOpenOutline />}
          name="Revisão"
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

// Função para calcular a posição da barra dinamicamente
function getBarPosition(button) {
  switch (button) {
    case "Home":
      return 7; // Posição para Home
    case "Card":
      return 72; // Posição para Card
    case "Autocard":
      return 142; // Posição para Autocard
    case "Conteúdos":
      return 204; // Posição para Conteúdos
    case "Revisão":
      return 272; // Posição para Revisão
    case "Relatórios":
      return 342; // Posição para Relatórios
    default:
      return 0; // Posição padrão
  }
}
