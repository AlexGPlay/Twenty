import React from "react";
import LeftPanel from "./LeftPanel";

const Main: React.FC<{}> = () => {
  return (
    <div className="main">
      <LeftPanel />
      <div>B</div>
      <div>C</div>
    </div>
  );
};

export default Main;
