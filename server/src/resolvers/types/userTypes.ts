import { Status } from "../../entities/Status";
import { User } from "../../entities/User";
import { ArgsType, Field, ObjectType } from "type-graphql";

@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ArgsType()
export class RegisterFields {
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
export class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@ObjectType()
export class ProfileResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Boolean, { nullable: true })
  friendship?: Boolean;

  @Field(() => Status, { nullable: true })
  status?: Status;

  @Field(() => Boolean, { nullable: true })
  isMyself?: Boolean;
}
