import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { onMaxWidth } from "../util/responsive";

const baseGridStyle = {
  display: "grid",
  gridTemplateColumns: "70% 10% 10% 10%",
};

const bottomLineStyle = {
  display: "grid",
  gridTemplateColumns: "70% 25% 5%",
  marginTop: "10px",
};

const TopBar: React.FC<{
  onLogin: (email: string, password: string) => Promise<void>;
}> = ({ onLogin }) => {
  onMaxWidth(2560, () => {
    baseGridStyle.gridTemplateColumns = "70% 10% 10% 10%";
    bottomLineStyle.gridTemplateColumns = "70% 25% 5%";
  });
  onMaxWidth(1440, () => {
    baseGridStyle.gridTemplateColumns = "58% 14% 14% 14%";
    bottomLineStyle.gridTemplateColumns = "58% 35% 7%";
  });
  onMaxWidth(1023, () => {
    baseGridStyle.gridTemplateColumns = "55% 15% 15% 15%";
    bottomLineStyle.gridTemplateColumns = "55% 37% 8%";
  });

  const [fields, setFields] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const handleInput = (field: "email" | "password", data: string) => {
    setFields({ ...fields, [field]: data });
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "20% 40% 20% 20%",
        marginTop: "10px",
        marginRight: "10px",
      }}
    >
      <div style={{ ...baseGridStyle, fontSize: "12px", fontWeight: "bold" }}>
        <label style={{ gridColumn: "2/3", color: "#2f557a" }}>Email</label>
        <label style={{ gridColumn: "3/4", color: "#2f557a" }}>
          Contraseña
        </label>
      </div>
      <div style={{ ...baseGridStyle }}>
        <input
          style={{ gridColumn: "2/3", marginRight: "10px" }}
          value={fields.email}
          onChange={(evt) => handleInput("email", evt.target.value)}
        />
        <input
          type="password"
          style={{ gridColumn: "3/4", marginRight: "10px" }}
          value={fields.password}
          onChange={(evt) => handleInput("password", evt.target.value)}
        />
        <button
          style={{
            gridColumn: "4/5",
            width: "50%",
            background: "linear-gradient(to bottom, #9dd2eb, #8BCCEB)",
            color: "white",
            borderColor: "#8BCCEB",
            borderRadius: "5px",
          }}
          onClick={() => onLogin(fields.email, fields.password)}
        >
          Entrar
        </button>
      </div>
      <div
        style={{
          ...baseGridStyle,
          marginTop: "5px",
          color: "white",
          fontSize: "12px",
        }}
      >
        <div style={{ gridColumn: "2/3" }}>
          <input type="checkbox"></input>
          <label>Recordarme</label>
        </div>
        <a style={{ color: "#cacdcf", gridColumn: "3/5" }}>
          ¿Has olvidado tu contraseña?
        </a>
      </div>
      <div style={{ ...bottomLineStyle }}>
        <div
          style={{
            gridColumn: "2/3",
            color: "white",
            borderTop: "1px solid #8BCCEB",
            fontSize: "12px",
            paddingTop: "10px",
            textAlign: "right",
          }}
        >
          <FontAwesomeIcon
            icon={faInfoCircle}
            style={{ marginRight: "5px", fontSize: "12px" }}
          />
          <a>¿Quieres una cuenta?</a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
