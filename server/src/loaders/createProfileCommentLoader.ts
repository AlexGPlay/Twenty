import { obtainDataForClass } from "./loaderUtil";
import { ProfileComment } from "./../entities/ProfileComment";
import DataLoader from "dataloader";

export const createProfileCommentLoader = () =>
  new DataLoader<number, ProfileComment>(async (profileCommentIds) =>
    obtainDataForClass<ProfileComment>(ProfileComment, profileCommentIds)
  );
