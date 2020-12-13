import React from "react";
import InfoImg from "./InfoImg";

const Center: React.FC<{}> = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "25% 25% 25% 25%",
        gridTemplateRows: "25% 50% 25%",
      }}
    >
      <div
        style={{
          gridColumn: "2/3",
          gridRow: "2/3",
          borderRight: "1px solid #8BCCEB",
          display: "grid",
          gridTemplateRows: "50% 10% 40%",
          paddingRight: "23%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "25% 75%",
            alignItems: "end",
            paddingBottom: "20%",
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
        <label
          style={{
            color: "white",
            fontWeight: "bold",
            textAlign: "right",
            fontSize: "20px",
          }}
        >
          ¿Qué es Twenty?
        </label>
        <label style={{ color: "#cacdcf", textAlign: "right" }}>
          Twenty es una plataforma social privada, a la que se accede únicamente
          por invitación. Cada día la usan entre millones de personas para
          comunicarse entre ellas y compartir información.
        </label>
      </div>
      <div
        style={{
          gridColumn: "3/4",
          gridRow: "2/3",
          display: "grid",
          gridTemplateRows: "11% 26% 26% 26% 11%",
          paddingLeft: "23%",
          alignItems: "center",
        }}
      >
        <div style={{ gridRow: "2/3", marginBottom: "10px" }}>
          <InfoImg
            imgPath="/img/social.png"
            title="Social"
            description="Conéctate, comparte y comunícate con tus amigos, compañeros de trabajo y familia"
          ></InfoImg>
        </div>
        <div style={{ gridRow: "3/4", marginBottom: "10px" }}>
          <InfoImg
            imgPath="/img/location.png"
            title="Local"
            description="Descubre servicios locales y participa con las marcas que realmente te importan."
          ></InfoImg>
        </div>
        <div style={{ gridRow: "4/5", marginBottom: "10px" }}>
          <InfoImg
            imgPath="/img/mobile.png"
            title="Móvil"
            description="Accede a Twenty desde tu móvil en tiempo real estés donde estés."
          ></InfoImg>
        </div>
      </div>
    </div>
  );
};

export default Center;
