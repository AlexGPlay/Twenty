import React from "react";
import Category from "../../../components/category/Category";

const Events: React.FC<{}> = () => {
  return (
    <Category title="Eventos patrocinados" paddingRight>
      <div>No hay eventos actualmente</div>
    </Category>
  );
};

export default Events;
