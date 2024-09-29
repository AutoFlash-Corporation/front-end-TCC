"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Use `usePathname` para capturar a rota
import styles from './menu.module.css';
import Logo from '@/components/Logo';
import { PiSquaresFourLight } from "react-icons/pi";
import { IoPricetagOutline, IoFolderOpenOutline } from "react-icons/io5";
import { BsFileText } from "react-icons/bs";

export default function Menu() {
  const [activeButton, setActiveButton] = useState("");
  const pathname = usePathname(); // Utiliza `usePathname` ao invés de `useRouter`

  // Atualiza o estado do botão ativo com base na rota
  useEffect(() => {
    switch (pathname) {
      case "/Initial":
        setActiveButton("Home");
        break;
      case "/Card":
        setActiveButton("Card");
        break;
      case "/Content":
        setActiveButton("Conteúdos");
        break;
      case "/Reports":
        setActiveButton("Relatórios");
        break;

    }
  }, [pathname]); // Atualiza quando o `pathname` muda

  // Componentização dos botões
  const MenuButton = ({ href, label, icon, name }) => (
    <Link href={href} className={styles.link}>
      <button className={`${styles.button} ${activeButton === name ? styles.active : ""}`}>
        {icon} {label}
      </button>
    </Link>
  );

  return (
    <div className={styles.menu}>
      <Logo />
      <div className={styles.buttons}>
        {/* Barrinha que acompanha o botão ativo */}
        <div className={styles.activeBar} style={{ top: getBarPosition(activeButton) }} />

        {/* Botões do menu */}
        <MenuButton href="/Initial" label="Home" icon={<PiSquaresFourLight />} name="Home" />
        <MenuButton href="/Card" label="Card" icon={<IoPricetagOutline />} name="Card" />
        <MenuButton href="/Content" label="Conteúdos" icon={<IoFolderOpenOutline />} name="Conteúdos" />
        <MenuButton href="/Reports" label="Relatórios" icon={<BsFileText />} name="Relatórios" />
      </div>
    </div>
  );
}

// Função para calcular a posição da barra com base no botão ativo usando if/else
function getBarPosition(button) {

  switch (button) {
    case "Home":
      return "5px"; // Posição para Home
    case "Card":
      return "85px"; // Posição para Card
    case "Conteúdos":
      return "165px"; // Posição para Conteúdos
    case "Relatórios":
      return "245px"; // Posição para Relatórios
  }
}

