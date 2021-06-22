import ThreeColumns from "../components/layout/ThreeColumns";
import { useParams } from "react-router";
import Image from "../components/user/image/Image";
import CommonPanel from "../components/left/CommonPanel";
import EmptyContainer from "../components/left/emptyContainer/EmptyContainer";
import Category from "../components/category/Category";
import { useUserQuery } from "../queries/useUserQuery";
import Text from "../components/text/Text";
import SimpleButton from "../components/button/simple/SimpleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faEnvelope, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import TalkBubble from "../components/talkBubble/TalkBubble";
import { useMemo, useRef, useState } from "react";
import { dateDiffAsString } from "../util/dates";
import styles from "./profile.module.scss";
import { useProfileCommentsQuery } from "../queries/useProfileCommentsQuery";
import Comment from "../components/comment/Comment";
import { useCreateProfileCommentMutation } from "../queries/useCreateProfileCommentMutation";
import { useMeQuery } from "../queries/useMeQuery";
import Button from "../components/button/twenty/Button";
import { useUpdateProfileImageMutation } from "../queries/useUpdateProfileImageMutation";

const Profile = () => {
  const { user } = useParams<{ user: string }>();
  const { data: meData } = useMeQuery();

  const profileImgInputRef = useRef<HTMLInputElement>();

  const isMyProfile = useMemo(() => parseInt(user) === meData?.me?.id, [user, meData]);

  const [newComment, setNewComment] = useState("");

  const { isLoading, isError, data } = useUserQuery(parseInt(user));
  const createProfileCommentMutation = useCreateProfileCommentMutation();

  const handleTextAreaEvt: React.KeyboardEventHandler<HTMLTextAreaElement> = async (evt) => {
    if (evt.key === "Enter" && evt.ctrlKey) return setNewComment(newComment + "\n");
    else if (evt.key === "Enter") {
      await createProfileCommentMutation.mutateAsync({
        comment: newComment,
        commentedToId: parseInt(user),
      });
      setNewComment("");
    }
  };

  const { data: commentsData } = useProfileCommentsQuery(parseInt(user));

  const [isProfileImageHovered, setIsProfileImageHovered] = useState(false);
  const [newPhoto, setNewPhoto] = useState("");
  const profileImageMutation = useUpdateProfileImageMutation();

  const dateDiff = useMemo(() => {
    if (!data || !data?.user?.status) return;
    return dateDiffAsString(new Date(), new Date(parseInt(data?.user.status.createdAt)));
  }, [data]);

  return isLoading || isError ? null : (
    <ThreeColumns>
      <CommonPanel>
        <EmptyContainer>
          <Image
            src={newPhoto || data.user.user.profileImage || "/img/camera.png"}
            size="big"
            className={styles.userProfileImg}
            onMouseEnter={() => isMyProfile && setIsProfileImageHovered(true)}
            onMouseLeave={() => isMyProfile && setIsProfileImageHovered(false)}
          >
            {isProfileImageHovered && (
              <div
                className={styles.editProfileImageContainer}
                title="Cambiar foto"
                onClick={() => profileImgInputRef?.current?.click()}
              >
                <FontAwesomeIcon icon={faCamera} />
              </div>
            )}
          </Image>
          <input
            type="file"
            accept="image/png, image/jpeg"
            ref={profileImgInputRef}
            className={styles.profileImgInput}
            onChange={(evt) => {
              if (!evt?.target?.files?.[0]) return;
              const reader = new FileReader();
              reader.readAsDataURL(evt.target.files[0]);
              reader.onload = () => setNewPhoto(reader.result as string);
            }}
          />
        </EmptyContainer>
        {isMyProfile && newPhoto && (
          <div className={styles.centerBtnContainer}>
            <Button
              text="Guardar"
              buttonType="dark"
              onClick={async () => {
                const response = await profileImageMutation.mutateAsync({ photo: newPhoto });
                if (response.updateProfileImage.errors) return;
                setNewPhoto("");
              }}
            />
          </div>
        )}
        <Category title="Redes" paddingRight>
          <div>Estudios universitarios</div>
        </Category>
        <Category title="Información" paddingRight>
          <div>Personal</div>
        </Category>
      </CommonPanel>
      <div>
        <h3>
          {data.user.user.name + " " + data.user.user.surname}{" "}
          {data.user.friendship && <Text color="gray-1">Amigo</Text>}
        </h3>
        <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
          <Text color="twenty-blue">Ver álbumes de fotos</Text>
          <Text color="gray-1"> | </Text>
          <Text color="twenty-blue">Videos</Text>
          {!data.user.friendship && !data.user.isMyself && (
            <SimpleButton
              fontSize={12}
              padding={3}
              icon={<FontAwesomeIcon icon={faUserPlus} />}
              style={{ marginLeft: "auto" }}
            >
              Añadir amigo
            </SimpleButton>
          )}
          {!data.user.isMyself && (
            <SimpleButton
              fontSize={12}
              padding={3}
              icon={<FontAwesomeIcon icon={faEnvelope} />}
              style={data.user.friendship && { marginLeft: "auto" }}
            >
              Mensaje privado
            </SimpleButton>
          )}
        </div>
        {data?.user?.status && (
          <TalkBubble mode="dark" className={styles.userStatus}>
            {data.user.status.status}
            <span className={styles.timeAgo}>{dateDiff}</span>
          </TalkBubble>
        )}
        <div>
          <div className={styles.title + " " + styles.underlined}>
            <label>Espacio personal</label>
          </div>
          <div className={styles.personalContent}>Este usuario aún no ha publicado nada.</div>
        </div>
        <div>
          <div className={styles.title}>
            <label>Tablón</label>
          </div>
          <div className={styles.userBoardInput}>
            <Image src={meData?.me?.profileImage || "/img/camera.png"} />
            <textarea
              placeholder="Escribe aquí..."
              value={newComment}
              onKeyUp={handleTextAreaEvt}
              onChange={(evt) => setNewComment(evt.target.value)}
            />
          </div>
          <div className={styles.userBoardContent}>
            {commentsData?.getProfileComments.length === 0
              ? "¡Sé el primero en comentar algo!"
              : commentsData?.getProfileComments.map((comment, commentIdx) => (
                  <div key={commentIdx}>
                    <Comment comment={comment} />
                    <hr />
                  </div>
                ))}
          </div>
        </div>
      </div>
      <div>
        <Category title="Fotos"></Category>
        <Category title="Amigos en común"></Category>
        <Category title="Mis amigos"></Category>
      </div>
    </ThreeColumns>
  );
};

export default Profile;
