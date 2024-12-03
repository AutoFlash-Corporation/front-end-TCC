import React, { useState } from "react";
import Menu from "@/component/Menu";
import withAuth from "../utils/withAuth"

const CardPage = () => {
  return (
    <div>
      <div>
        <Menu />
      </div>
    </div>
  );
};

export default withAuth(CardPage);
