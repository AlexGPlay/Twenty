import React, { useState } from "react";
import { isScreenSmallerThan } from "../util/responsive";
import Center from "./Center";
import Footer from "./Footer";
import MobileLogin from "./MobileLogin";
import TopBar from "./TopBar";
import { useLogin } from "../queries/useLogin";

const Login: React.FC<{}> = () => {
  const login = useLogin();
  const [errors, setErrors] = useState([]);

  const basicStyles = {
    height: "100%",
    backgroundColor: "#598CB7",
  };

  const handleLogin = async (email: string, password: string) => {
    const response = await login.mutateAsync({ email, password });
    if (response.login.errors?.length > 0) {
      setErrors(response.login.errors);
      console.log(errors);
    } else {
    }
  };

  return isScreenSmallerThan(1023) ? (
    <main style={basicStyles}>
      <MobileLogin onLogin={handleLogin} />
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
        <TopBar onLogin={handleLogin} />
        <Center />
        <Footer />
      </div>
    </main>
  );
};

export default Login;
