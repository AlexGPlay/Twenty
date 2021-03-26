import React from "react";
import Navbar from "./navbar/Navbar";

const Template: React.FC<{}> = (props) => {
  return (
    <>
      <Navbar />
      <div className="content-padding">{props.children}</div>
    </>
  );
};

export default Template;
