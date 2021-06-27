import styles from "./writeComment.module.scss";

import { useState } from "react";
import { useMeQuery } from "../../queries/useMeQuery";
import Image from "../user/image/Image";

type WriteCommentProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

const WriteComment: React.VFC<WriteCommentProps> = (props) => {
  const { data: meData } = useMeQuery();

  return (
    <div className={styles.writeComment}>
      <Image src={meData?.me?.profileImage || "/img/camera.png"} />
      <textarea {...props} />
    </div>
  );
};

export default WriteComment;
