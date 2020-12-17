import { User } from "../../entities/User";
import argon2 from "argon2";
import { UserResponse } from "../../resolvers/user";
import { Request } from 'express';

export async function register(email: string, password: string, req: Request): Promise<UserResponse>{
  if(!email.includes("@")){
    return {
      errors: [
        {
          field: "email", 
          message: "El email no es válido"
        }
      ]
    }
  }

  if(password.length < 5){
    return {
      errors: [
        {
          field: "password", 
          message: "La contraseña es demasiado corta"
        }
      ]
    }
  }

  if(await User.findOne({ where: { email } })){
    return {
      errors: [
        {
          field: "email", 
          message: "El email ya está en uso"
        }
      ]
    }
  }
  
  const hashedPassword = await argon2.hash(password);
  const user = await User.create({
    email,
    password: hashedPassword
  }).save();

  req.session.userId = user.id;

  return { 
    user
  }
}