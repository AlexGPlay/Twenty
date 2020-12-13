import React from "react";

const Footer: React.FC<{}> = () => {
  return (
    <div style={{ paddingRight: "20px", paddingLeft: "20px" }}>
      <div
        style={{
          borderTop: "1px solid #8BCCEB",
          display: "grid",
          gridTemplateColumns: "33% 33% 33%",
          color: "white",
          fontSize: "12px",
        }}
      >
        <div style={{ gridColumn: "1/2", paddingTop: "10px" }}>
          <label style={{ fontWeight: "bold" }}>Twenty 2020</label>
          <label style={{ marginLeft: "15px" }}>Castellano</label>

          <label style={{ marginLeft: "10px", color: "whitesmoke" }}>
            Catalá
          </label>
          <label style={{ marginLeft: "15px", color: "whitesmoke" }}>
            English
          </label>
        </div>
        <div
          style={{ gridColumn: "3/4", paddingTop: "10px", textAlign: "right" }}
        >
          <label>Acerca de</label>
          <label style={{ marginLeft: "15px" }}>Empleo</label>
          <label style={{ marginLeft: "15px" }}>Anúnciate</label>
          <label style={{ marginLeft: "15px" }}>Prensa</label>
          <label style={{ marginLeft: "15px" }}>Blog</label>
          <label style={{ marginLeft: "15px" }}>Desarrolladores</label>
          <label style={{ marginLeft: "15px" }}>Ayuda</label>
        </div>
      </div>
    </div>
  );
};

export default Footer;
