import ThreeColumns from "../components/layout/ThreeColumns";
import { useParams } from "react-router";
import Image from "../components/user/image/Image";
import CommonPanel from "../components/left/CommonPanel";
import EmptyContainer from "../components/left/emptyContainer/EmptyContainer";
import Category from "../components/category/Category";
import { useUserQuery } from "../queries/useUserQuery";

const Profile = () => {
  const { user } = useParams<{ user: string }>();
  const { isLoading, isError, data } = useUserQuery(parseInt(user));

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
      <div>{data.user.name + " " + data.user.surname}</div>
      <div>
        <Category title="Fotos"></Category>
        <Category title="Amigos en común"></Category>
        <Category title="Mis amigos"></Category>
      </div>
    </ThreeColumns>
  );
};

export default Profile;
