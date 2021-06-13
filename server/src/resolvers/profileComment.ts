import { isAuth } from "./middleware/isAuth";
import { ProfileComment } from "./../entities/ProfileComment";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { ApolloContext } from "../types";
import { User } from "../entities/User";

@ObjectType()
class ProfileCommentError {
  @Field(() => ProfileComment, { nullable: true })
  profileComment?: ProfileComment;

  @Field(() => String, { nullable: true })
  error?: string;
}

@Resolver(ProfileComment)
export class ProfileCommentResolver {
  @FieldResolver(() => User)
  commentedTo(@Root() root: ProfileComment, @Ctx() { userLoader }: ApolloContext) {
    return userLoader.load(root.commentedToId);
  }

  @FieldResolver(() => User)
  commentedBy(@Root() root: ProfileComment, @Ctx() { userLoader }: ApolloContext) {
    return userLoader.load(root.commentedById);
  }

  @FieldResolver(() => ProfileComment, { nullable: true })
  replyTo(@Root() root: ProfileComment, @Ctx() { profileCommentLoader }: ApolloContext) {
    if (!root.replyToId) return null;
    return profileCommentLoader.load(root.replyToId);
  }

  @Query(() => [ProfileComment])
  getProfileComments(@Arg("userId", () => Number!) userId: Number): Promise<ProfileComment[]> {
    return ProfileComment.find({ where: { commentedToId: userId }, order: { id: "DESC" } });
  }

  @Mutation(() => ProfileCommentError)
  @UseMiddleware(isAuth)
  async createProfileComment(
    @Arg("comment", () => String!) comment: string,
    @Arg("commentedToId", () => Number!) commentedToId: number,
    @Arg("replyToId", () => Number, { nullable: true }) replyToId: number,
    @Ctx() { req }: ApolloContext
  ): Promise<ProfileCommentError> {
    if (!comment || !commentedToId) return { error: "error" };

    const profileComment = await ProfileComment.create({
      commentedById: req.session.userId,
      commentedToId,
      comment,
      replyToId,
    }).save();

    if (!profileComment) return { error: "comment could not be created" };

    return { profileComment };
  }
}

export default ProfileCommentResolver;
