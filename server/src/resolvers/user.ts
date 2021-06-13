import { isAuth } from "./middleware/isAuth";
import { Status } from "./../entities/Status";
import { Friendship } from "./../entities/Friendship";
import { User } from "../entities/User";
import { Arg, Args, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { register } from "../services/users/register";
import { login } from "../services/users/login";
import { ApolloContext } from "../types";
import invitationsQueue from "../queues/invitationQueue";
import { ProfileResponse, RegisterFields, UserResponse } from "./types/userTypes";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  users() {
    return User.find();
  }

  @Mutation(() => UserResponse)
  async register(
    @Args() registerFields: RegisterFields,
    @Ctx() { req }: ApolloContext
  ): Promise<UserResponse> {
    return register(registerFields, req);
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("email", () => String!) email: string,
    @Arg("password", () => String!) password: string,
    @Ctx() { req }: ApolloContext
  ): Promise<UserResponse> {
    return login(email, password, req);
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: ApolloContext) {
    return User.findOne(req.session.userId);
  }

  @Query(() => ProfileResponse, { nullable: true })
  async user(
    @Arg("id", () => Number!) id: number,
    @Ctx() { req }: ApolloContext
  ): Promise<ProfileResponse> {
    const user = await User.findOne(id);
    const friendship = await Friendship.findOne({
      where: { friend1Id: req.session.userId, friend2Id: id },
    });
    const status = await Status.findOne({ where: { userId: id }, order: { id: "DESC" } });

    return {
      user,
      friendship: !!friendship,
      status,
      isMyself: id === req.session.userId,
    };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async sendInvitation(@Arg("email", () => String) email: string, @Ctx() { req }: ApolloContext) {
    const user = await User.findOne(req.session.userId);
    if (!user || user.pendingInvitations <= 0) return false;

    const newEmail = await User.findOne({ where: { email } });
    if (newEmail) return false;

    invitationsQueue.add({ userId: user.id, newEmail: email });

    return true;
  }
}
