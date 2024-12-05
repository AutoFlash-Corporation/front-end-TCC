import React, { useState } from "react";
import Menu from "@/component/Menu/Menu";
import withAuth from "../utils/withAuth"

const RevisaoPage = () => {

  return (
    <div>
      <div>
        <Menu />
      </div>
    </div>
  );
};

export default withAuth(RevisaoPage);
