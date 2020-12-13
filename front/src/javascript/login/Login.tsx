import React from "react";
import Center from "./Center";
import Footer from "./Footer";
import TopBar from "./TopBar";

const Login: React.FC<{}> = () => {
  return (
    <main
      style={{
        height: "100%",
        backgroundColor: "#598CB7",
      }}
    >
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
