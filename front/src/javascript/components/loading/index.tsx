import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loading: React.FC<{}> = () => {
  return <FontAwesomeIcon icon={faSpinner} className="fas fa-spinner fa-spin"/>;
}

export default Loading;