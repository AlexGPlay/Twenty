import { User } from "../entities/User";
import { Arg, Args, ArgsType, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
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

@ArgsType()
export class RegisterFields{
  @Field(() => String)
  key: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  surname: string;

  @Field(() => String)
  email: string;

  @Field(() => String) 
  password: string;

  @Field(() => String)
  country: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  birthday: string;

  @Field(() => String)
  gender: string;

  @Field(() => Boolean)
  terms: boolean;
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
    @Args() registerFields: RegisterFields,
    @Ctx() { req }: ApolloContext
  ): Promise<UserResponse>{
    return register(registerFields, req);
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
    if(!user || user.pendingInvitations <= 0) return false;

    const newEmail = await User.findOne({ where: { email } });
    if(newEmail) return false;

    invitationsQueue.add({ userId: user.id, newEmail: email });

    return true;
  }

}