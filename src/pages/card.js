import React, { useState } from "react";
import Menu from "@/component/Menu";
import withAuth from "../utils/withAuth"
import FlashcardList from "@/component/FlashcardList";

const CardPage = () => {
  return (
    <div>
      <div>
        <Menu />

        <div>
          <FlashcardList />
        </div>
      </div>
    </div>
  );
};

export default withAuth(CardPage);
