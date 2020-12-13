import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const baseGridStyle = {
  display: "grid",
  gridTemplateColumns: "70% 10% 10% 10%",
};

const TopBar: React.FC<{}> = () => {
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
      <div style={baseGridStyle}>
        <input style={{ gridColumn: "2/3", marginRight: "10px" }} />
        <input
          type="password"
          style={{ gridColumn: "3/4", marginRight: "10px" }}
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
        <a style={{ color: "#cacdcf" }}>¿Has olvidado tu contraseña?</a>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "70% 25% 5%",
          marginTop: "10px",
        }}
      >
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
