import React, { useState } from "react";
import Menu from "@/component/Menu/Menu";
import withAuth from "../utils/withAuth"
import FlashcardList from "../component/FlashcardGroup/FlashcardList";

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
