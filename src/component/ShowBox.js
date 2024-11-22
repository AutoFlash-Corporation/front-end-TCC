import React from 'react';
import styles from "../styles/showbox.module.css";
import { MdArrowRight } from "react-icons/md";

export default function ShowBox({ icon, title, value, description, link }) {
    return (
        <div className={styles.showbox}>
            <div className={styles.icon}>{icon}</div>
            <div className={styles.content}>
                <h3>{title}</h3>
                <p className={styles.value}>{value}</p>
                <a href={link} className={styles.link}>{description}<p className={styles.arrow}><MdArrowRight /></p></a>
            </div>
        </div>
    );
}
