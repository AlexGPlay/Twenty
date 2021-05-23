export type UserData = {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  name: string;
  surname: string;
  birthday: Date;
  city: string;
  country: string;
  gender: string
  connected: boolean;
  visits: number;
  pendingInvitations: number;
}

export type FieldError = {
  field: string;
  message: string;
}