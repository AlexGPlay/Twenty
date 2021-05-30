import React from "react";
import ThreeColumns from "../components/layout/ThreeColumns";

import CenterContent from "./center";
import LeftPanel from "./left/panel/LeftPanel";
import RightContent from "./right";

const Main: React.FC<{}> = () => {
  return (
    <ThreeColumns>
      <LeftPanel />
      <CenterContent />
      <RightContent />
    </ThreeColumns>
  );
};

export default Main;
