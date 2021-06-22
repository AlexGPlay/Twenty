import { MeData } from "./meData.d";
import { ProfileImageRequest, ProfileImageResponse } from "./profileImage";
import { gql } from "graphql-request";
import { useMutation, useQueryClient } from "react-query";
import { client } from "../graphql/client";

export const useUpdateProfileImageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ProfileImageResponse, any, ProfileImageRequest>(
    (photoRequest: ProfileImageRequest) => {
      return client.request(
        gql`
          mutation UpdateProfileImage($photo: String!) {
            updateProfileImage(photo: $photo) {
              user {
                profileImage
              }
              errors {
                field
                message
              }
            }
          }
        `,
        photoRequest
      );
    },
    {
      onSuccess: (result) => {
        if (result.updateProfileImage.errors) return;
        queryClient.setQueryData<MeData>("me", (currentData) => ({
          me: { ...currentData.me, profileImage: result.updateProfileImage.user.profileImage },
        }));
      },
    }
  );
};
