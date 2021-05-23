import { FieldError, UserData } from "./common"

export type RegisterParams = {
  name: string;
  surname: string;
  email: string;
  password: string;
  birthday: string;
  city: string;
  country: string;
  gender: string;
  terms: boolean;
  key: string;
}

export type RegisterResponse = {
  register: {
    user?: UserData,
    errors?: FieldError[]
  }
}