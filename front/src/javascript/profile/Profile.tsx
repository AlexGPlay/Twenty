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
import { faEnvelope, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import TalkBubble from "../components/talkBubble/TalkBubble";
import { useMemo } from "react";
import { dateDiffAsString } from "../util/dates";
import styles from "./profile.module.scss";
import { useProfileCommentsQuery } from "../queries/useProfileCommentsQuery";
import Comment from "../components/comment/Comment";

const Profile = () => {
  const { user } = useParams<{ user: string }>();
  const { isLoading, isError, data } = useUserQuery(parseInt(user));
  const {
    isLoading: commentsLoading,
    isError: commentsError,
    data: commentsData,
  } = useProfileCommentsQuery(parseInt(user));

  const dateDiff = useMemo(() => {
    if (!data || !data?.user?.status) return;
    return dateDiffAsString(new Date(), new Date(parseInt(data?.user.status.createdAt)));
  }, [data]);

  return isLoading || isError ? null : (
    <ThreeColumns>
      <CommonPanel>
        <EmptyContainer>
          <Image src="/img/camera.png" size="auto" />
        </EmptyContainer>
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
            <Image src="/img/camera.png" />
            <textarea placeholder="Escribe aquí..." />
          </div>
          <div className={styles.userBoardContent}>
            {commentsData.getProfileComments.length === 0
              ? "¡Sé el primero en comentar algo!"
              : commentsData.getProfileComments.map((comment, commentIdx) => (
                  <>
                    <Comment comment={comment} key={commentIdx} />
                    <hr />
                  </>
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
