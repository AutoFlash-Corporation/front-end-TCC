import React from "react";
import Menu from "@/component/Menu/Menu";
import withAuth from "../utils/withAuth"
import ContentList from "../component/ContentGroup/ContentList";
import styles from "../styles/content.module.css";

const ConteudoPage = () => {

  return (
    <div>

      <div>
        <Menu />
      </div>

      <div className={styles.container}>
        <ContentList />
      </div>
    
    </div>
  );
};

export default withAuth(ConteudoPage);
