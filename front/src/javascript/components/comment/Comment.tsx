import { ProfileComment } from "../../queries/profileComment";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import Image from "../user/image/Image";
import styles from "./comment.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import WriteComment from "./WriteComment";
import { useCreateProfileCommentMutation } from "../../queries/useCreateProfileCommentMutation";

export type CommentProps = {
  comment: ProfileComment;
};

const Comment: React.VFC<CommentProps> = ({ comment }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const createProfileCommentMutation = useCreateProfileCommentMutation();

  const handleTextAreaEvt: React.KeyboardEventHandler<HTMLTextAreaElement> = async (evt) => {
    if (evt.key === "Enter" && evt.ctrlKey) return setReplyText(replyText + "\n");
    else if (evt.key === "Enter") {
      await createProfileCommentMutation.mutateAsync({
        comment: replyText,
        commentedToId: comment.commentedToId,
        replyToId: comment.id,
      });
      setReplyText("");
      setShowReplyBox(false);
    }
  };

  return (
    <div className={styles.comment}>
      <div className={styles.photo}>
        <Image src={comment.commentedBy.profileImage || "/img/camera.png"} size="small" />
        {comment.replyTo && (
          <Image
            src={comment.replyTo.commentedBy.profileImage || "/img/camera.png"}
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
              <Link to={`/profile/${comment.replyTo.commentedBy.id}`}>
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
        <div className={styles.replyComment} onClick={() => setShowReplyBox(!showReplyBox)}>
          <FontAwesomeIcon icon={faReply} className={styles.replyIcon} /> Responder
        </div>
        {showReplyBox && (
          <div className={styles.replyBox}>
            <WriteComment
              placeholder="Escribe aquí..."
              value={replyText}
              onKeyDown={handleTextAreaEvt}
              onChange={(evt) => setReplyText(evt.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
