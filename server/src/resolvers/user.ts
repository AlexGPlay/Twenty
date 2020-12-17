import { User } from "../entities/User";
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { register } from "../services/users/register";
import { login } from "../services/users/login";
import { ApolloContext } from "src/types";

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

}