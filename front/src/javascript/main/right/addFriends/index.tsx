import React from "react";
import Category from "../../../components/category/Category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Text from "../../../components/text/Text";

import SimpleButton from "../../../components/button/simple/SimpleButton";

const AddFriends: React.FC<{}> = () => {
  return (
    <Category title="Añadir amigos">
      <Text color="gray-1" size={14}>
        ¿Amigos en Hotmail, Gmail o Yahoo?
      </Text>
      <SimpleButton
        icon={<FontAwesomeIcon icon={faSearch} />}
        iconBackground="var(--orange-1)"
        iconColor="var(--white-1)"
      >
        Buscar amigos
      </SimpleButton>
    </Category>
  );
};

export default AddFriends;
