import styles from "./messagesView.module.scss";

import SimpleButton from "../components/button/simple/SimpleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import Paginator from "../components/paginator/Paginator";
import { useState } from "react";

type MessagesViewProps = {
  title: string;
};

const MessagesView: React.VFC<MessagesViewProps> = ({ title }) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <main className={styles.messagesView}>
      <label className={styles.title}>{title}</label>
      <hr />
      <section>
        <div className={styles.headerOptions}>
          <label>Seleccionar</label>
          <a href="#">Todos</a>
          <a href="#">Ninguno</a>
          <SimpleButton icon={<FontAwesomeIcon icon={faTrash} />}>
            Borrar seleccionados
          </SimpleButton>
          <SimpleButton icon={<FontAwesomeIcon icon={faCheck} />}>Marcar como leidos</SimpleButton>
          <Paginator
            pageCount={5}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            className={styles.paginator}
          />
        </div>
      </section>
    </main>
  );
};

export default MessagesView;
