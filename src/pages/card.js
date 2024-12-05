import React, { useState } from "react";
import Menu from "../component/Menu/Menu";
import withAuth from "../utils/withAuth"
import FlashcardList from "../component/FlashcardGroup/FlashcardList";
import styles from "../styles/card.module.css";

const CardPage = () => {
  return (
    <div>
      <div>
        <Menu />

        <div className={styles.container}>
          <FlashcardList />
        </div>
      </div>
    </div>
  );
};

export default withAuth(CardPage);
