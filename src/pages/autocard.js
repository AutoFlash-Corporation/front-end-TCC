import React, { useState } from "react";
import Menu from "@/component/Menu/Menu";

import withAuth from "../utils/withAuth"

const AutoCardPage = () => {

  return (
    <div>
    <div>
      <Menu />
    </div>
  </div>
  );
};

export default withAuth(AutoCardPage);
