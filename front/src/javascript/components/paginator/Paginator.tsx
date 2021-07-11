import styles from "./paginator.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStepBackward,
  faStepForward,
  faCaretLeft,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";

type PaginatorProps = {
  pageCount: number;
  currentPage: number;
  onPageChange?: (newPage: number) => void;
  className?: string;
};

const Paginator: React.VFC<PaginatorProps> = ({
  pageCount,
  currentPage,
  className,
  onPageChange,
}) => {
  return (
    <div className={`${styles.paginator} ${className}`}>
      <div className={styles.text}>
        {currentPage} de {pageCount}
      </div>
      <div className={styles.buttons}>
        <button disabled={currentPage === 1} onClick={() => onPageChange?.(1)}>
          <FontAwesomeIcon icon={faStepBackward} />
        </button>
        <button
          className={styles.centerButtons}
          disabled={currentPage === 1}
          onClick={() => onPageChange?.(currentPage - 1)}
        >
          <FontAwesomeIcon icon={faCaretLeft} />
        </button>
        <button
          className={styles.centerButtons}
          disabled={currentPage === pageCount}
          onClick={() => onPageChange?.(currentPage + 1)}
        >
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
        <button disabled={currentPage === pageCount} onClick={() => onPageChange?.(pageCount)}>
          <FontAwesomeIcon icon={faStepForward} />
        </button>
      </div>
    </div>
  );
};

export default Paginator;
