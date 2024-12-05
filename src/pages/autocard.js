import React, { useState } from "react";
import Menu from "../component/Menu/Menu";

import withAuth from "../utils/withAuth"
import FlashcardAutoForm from "../component/FlashcardGroup/FlashcardAutoForm";

const AutoCardPage = () => {

  return (
    <div>
    <div>
      <Menu />
      <FlashcardAutoForm />
    </div>
  </div>
  );
};

export default withAuth(AutoCardPage);
