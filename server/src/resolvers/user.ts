import { User } from "../entities/User";
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { register } from "../services/users/register";
import { login } from "../services/users/login";
import { ApolloContext } from "../types";
import invitationsQueue from "../queues/invitationQueue";

@ObjectType()
class FieldError{

  @Field()
  field: string;

  @Field()
  message: string;

}

@ObjectType()
export class UserResponse{
  
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

}

@Resolver(User)
export class UserResolver{

  @Query(() => [User])
  users(){
    return User.find();
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('email', () => String!) email: string,
    @Arg('password', () => String!) password: string,
    @Ctx() { req }: ApolloContext
  ): Promise<UserResponse>{
    return register(email, password, req);
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('email', () => String!) email: string,
    @Arg('password', () => String!) password: string,
    @Ctx() { req }: ApolloContext
  ): Promise<UserResponse>{
    return login(email, password, req);
  }

  @Query(() => User, {nullable: true})
  me(
    @Ctx() { req }: ApolloContext
  ){
    return User.findOne(req.session.userId);
  }

  @Mutation(() => Boolean)
  async sendInvitation(
    @Arg('email', () => String) email: string,
    @Ctx() { req }: ApolloContext
  ){
    const user = await User.findOne(req.session.userId);
    if(!user) return false;

    const newEmail = await User.findOne({ where: { email } });
    if(newEmail) return false;

    invitationsQueue.add({ userId: user.id, newEmail: email });

    return true;
  }

}