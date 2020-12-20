import React, { useState } from "react";

const MobileLogin: React.FC<{
  onLogin: (email: string, password: string) => Promise<void>;
}> = ({ onLogin }) => {
  const [fields, setFields] = useState({ email: "", password: "" });

  const handleInput = (field: "email" | "password", data: string) => {
    setFields({ ...fields, [field]: data });
  };

  return (
    <div style={{ padding: "5%" }}>
      <div
        style={{
          marginBottom: "5vh",
          display: "grid",
          gridTemplateColumns: "25% 75%",
          alignItems: "end",
        }}
      >
        <div>
          <img
            src="/img/logo.png"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
          ></img>
        </div>
        <div style={{ textAlign: "right" }}>
          <img
            src="/img/text.png"
            style={{ maxHeight: "90%", maxWidth: "90%" }}
          ></img>
        </div>
      </div>
      <div>
        <div>
          <label
            style={{ fontSize: "1.25em", color: "#2f557a", fontWeight: "bold" }}
          >
            Email
          </label>
          <br />
          <input
            style={{ width: "100%", height: "2vh", marginTop: "10px" }}
            value={fields.email}
            onChange={(evt) => handleInput("email", evt.target.value)}
          />
        </div>
        <div style={{ marginTop: "5%" }}>
          <label
            style={{ fontSize: "1.25em", color: "#2f557a", fontWeight: "bold" }}
          >
            Contraseña
          </label>
          <br />
          <input
            type="password"
            style={{ width: "100%", height: "2vh", marginTop: "10px" }}
            value={fields.password}
            onChange={(evt) => handleInput("password", evt.target.value)}
          />
        </div>
        <div
          style={{
            marginTop: "5%",
            textAlign: "center",
          }}
        >
          <button
            style={{
              width: "95%",
              height: "5vh",
              background: "linear-gradient(to bottom, #9dd2eb, #8BCCEB)",
              color: "white",
              borderColor: "#8BCCEB",
              borderRadius: "5px",
              fontSize: "1.5em",
            }}
            onClick={() => onLogin(fields.email, fields.password)}
          >
            Entrar
          </button>
        </div>
        <div style={{ color: "white", textAlign: "center", marginTop: "2vh" }}>
          <input type="checkbox"></input>
          <label>Recordarme</label>
        </div>
        <div style={{ textAlign: "center", marginTop: "2vh" }}>
          <a style={{ color: "white" }}>¿Has olvidado tu contraseña?</a>
        </div>
      </div>
    </div>
  );
};

export default MobileLogin;
