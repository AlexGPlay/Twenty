import { ApolloContext } from "src/types";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<ApolloContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("User not authenticated");
  }

  return next();
};
