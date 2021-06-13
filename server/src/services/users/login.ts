import { User } from "../../entities/User";
import { Request } from "express";
import argon2 from "argon2";
import { UserResponse } from "../../resolvers/types/userTypes";

export async function login(email: string, password: string, req: Request): Promise<UserResponse> {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return {
      errors: [{ field: "email", message: "The email doesn't exist" }],
    };
  }

  if (!(await argon2.verify(user.password, password))) {
    return {
      errors: [{ field: "password", message: "Incorrect password" }],
    };
  }

  req.session.userId = user.id;

  return {
    user,
  };
}
