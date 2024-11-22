import React from 'react';
import styles from "../styles/showbox.module.css";

export default function ShowBox() {

    return (
        <div className={styles.ShowBoxGroup}>
        <div>
            <h1>Olá, Mundo!</h1>
            <p>Este é um componente de exemplo.</p>
        </div>
        </div>
    );
}