import DataLoader from "dataloader";
import { User } from "../entities/User";
import { obtainDataForClass } from "./loaderUtil";

export const createUserLoader = () =>
  new DataLoader<number, User>(async (userIds) => obtainDataForClass<User>(User, userIds));
