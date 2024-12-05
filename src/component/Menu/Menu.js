"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "../../component/Menu/menu.module.css";

import { PiSquaresFourLight } from "react-icons/pi";
import { IoPricetagOutline, IoFolderOpenOutline } from "react-icons/io5";
import { BsFileText } from "react-icons/bs";
import { GiSpellBook } from "react-icons/gi";

export default function Menu() {
  const [activeButton, setActiveButton] = useState("");
  const pathname = usePathname();

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
      default:
        setActiveButton("");
    }
  }, [pathname]);

  const MenuButton = ({ href, label, icon, name }) => (
    <Link href={href} className={styles.link}>
      <button
        className={`${styles.button} ${
          activeButton === name ? styles.active : ""
        }`}
      >
        {icon}
        {label}
      </button>
    </Link>
  );

  return (
    <div className={styles.menu}>
      <div className={styles.buttons}>
        <div
          className={styles.activeBar}
          style={{
            transform: `translateY(${getBarPosition(activeButton)}px)`,
            transition: "transform 0.3s ease-in-out",
          }}
        />
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
      </div>
    </div>
  );
}

function getBarPosition(button) {
  switch (button) {
    case "Home":
      return 0;
    case "Card":
      return 80;
    case "Autocard":
      return 160;
    case "Conteúdos":
      return 240;
    case "Revisão":
      return 320;
    default:
      return 0;
  }
}
