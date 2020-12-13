import React from "react";

interface InfoImgTypes {
  imgPath: string;
  title: string;
  description: string;
}

const InfoImg: React.FC<InfoImgTypes> = (props) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "15% 85%",
        alignItems: "center",
      }}
    >
      <div style={{ gridColumn: "1/2", height: "60%" }}>
        <img
          src={props.imgPath}
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        ></img>
      </div>
      <div style={{ gridColumn: "2/3", color: "white" }}>
        <div style={{ fontWeight: "bold" }}>{props.title}</div>
        <div style={{ fontSize: "14px", marginTop: "5px", color: "#cacdcf" }}>
          {props.description}
        </div>
      </div>
    </div>
  );
};

export default InfoImg;
