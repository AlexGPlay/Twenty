import { FieldError } from "./common";

export type ProfileImageResponse = {
  updateProfileImage: {
    errors?: FieldError[];
    user?: { profileImage: string };
  };
};

export type ProfileImageRequest = {
  photo: string;
};
