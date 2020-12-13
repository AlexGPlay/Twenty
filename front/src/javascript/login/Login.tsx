import React from "react";
import { isScreenSmallerThan } from "../util/responsive";
import Center from "./Center";
import Footer from "./Footer";
import MobileLogin from "./MobileLogin";
import TopBar from "./TopBar";

const Login: React.FC<{}> = () => {
  const basicStyles = {
    height: "100%",
    backgroundColor: "#598CB7",
  };

  return isScreenSmallerThan(1023) ? (
    <main style={basicStyles}>
      <MobileLogin />
    </main>
  ) : (
    <main style={basicStyles}>
      <div
        style={{
          height: "inherit",
          display: "grid",
          gridTemplateRows: "10% 80% 10%",
        }}
      >
        <TopBar />
        <Center />
        <Footer />
      </div>
    </main>
  );
};

export default Login;
