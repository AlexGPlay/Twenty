import { createProfileCommentLoader } from "./loaders/createProfileCommentLoader";
import { createUserLoader } from "./loaders/createUserLoader";
import { Request, Response } from "express";

declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

declare module "http" {
  interface IncomingMessage {
    userId: number;
  }
}

declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

export type ApolloContext = {
  req: Request;
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
  profileCommentLoader: ReturnType<typeof createProfileCommentLoader>;
};
