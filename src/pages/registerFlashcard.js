import React from "react";
import styles from "../component/FlashcardGroup/flashcardform.module.css";
import FlashcardForm from "../component/FlashcardGroup/FlashcardForm";

const RegisterFlashcardPage = () => {
  return (
    <div className={styles.Background}>
      <FlashcardForm />
    </div>
  );
};

export default RegisterFlashcardPage;
