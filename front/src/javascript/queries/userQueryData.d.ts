import { Status } from "./statusData.d";
import { UserData } from "./common.d";

export type ProfileData = {
  user?: UserData;
  friendship?: boolean;
  status?: Status;
  isMyself?: boolean;
};
