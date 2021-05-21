import type { FieldError, UserData } from './common';

export type LoginParams = {
  email: string,
  password: string
}

export type LoginResponse = {
  login: {
    user?: UserData,
    errors?: FieldError[]
  }
}