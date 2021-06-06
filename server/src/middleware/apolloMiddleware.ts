import { ApolloServer } from "apollo-server-express";
import { Express } from "express";
import path from "path";
import { ApolloContext } from "../types";
import { buildSchema } from "type-graphql";

export async function useApolloMiddleware(app: Express) {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [path.join(__dirname, "../resolvers/*.js")],
      validate: true,
    }),
    context: ({ req, res }): ApolloContext => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });
}
