import { gql } from "graphql-request";
import { useMutation } from "react-query"
import { client } from "../graphql/client";

type InvitationFields = {
  email: string;
}

export const useInvitationMutation = () => {
  return useMutation((invitationVariables: InvitationFields) => {
    return client.request(
      gql`
        mutation SendInvitation($email: String!){
          sendInvitation(email: $email)
        }
      `, invitationVariables
    )
  });
}