import { ProfileComment } from "../../queries/profileComment";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import Image from "../user/image/Image";
import styles from "./comment.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";

export type CommentProps = {
  comment: ProfileComment;
};

const Comment: React.VFC<CommentProps> = ({ comment }) => {
  return (
    <div className={styles.comment}>
      <div className={styles.photo}>
        <Image src="/img/camera.png" size="small" />
        {comment.replyTo && (
          <Image
            src="/img/camera.png"
            size="small"
            className={styles.repliedPhoto}
            withoutPadding
          />
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <Link to={`/profile/${comment.commentedById}`}>
            {comment.commentedBy.name + " " + comment.commentedBy.surname}
          </Link>
          <span className={styles.createdAt}>
            {format(new Date(parseInt(comment.createdAt)), "dd 'de' MMM 'de' yyyy', a las' HH:mm")}
          </span>
        </div>
        <div>{comment.comment}</div>
        {comment.replyTo && (
          <div className={styles.repliedCommentContainer}>
            <div>{comment.replyTo.comment}</div>
            <div className={styles.infoContainer}>
              <FontAwesomeIcon icon={faReply} className={styles.replyIcon} />
              <Link to={`/profile/${comment.replyTo.commentedById}`}>
                {comment.replyTo.commentedBy.name + " " + comment.replyTo.commentedBy.surname}
              </Link>
              <span className={styles.createdAt}>
                {format(
                  new Date(parseInt(comment.replyTo.createdAt)),
                  "dd 'de' MMM 'de' yyyy', a las' HH:mm"
                )}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
