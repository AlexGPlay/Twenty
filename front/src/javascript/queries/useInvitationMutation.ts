import { gql } from "graphql-request";
import { useMutation, useQueryClient } from "react-query"
import { client } from "../graphql/client";
import { InvitationFields, InvitationResponse } from "./invitationMutation";
import { MeData } from "./meData";

export const useInvitationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<InvitationResponse, any, InvitationFields>((invitationVariables: InvitationFields) => {
    return client.request(
      gql`
        mutation SendInvitation($email: String!){
          sendInvitation(email: $email)
        }
      `, invitationVariables
    )
  }, {
    onSuccess: (result) => {
      if(!result.sendInvitation) return;
      const currentData = queryClient.getQueryData<MeData>('me');
      queryClient.setQueryData<MeData>(
        'me', 
        { me: 
          { 
            ...currentData.me, 
            pendingInvitations: currentData.me.pendingInvitations - 1
          }
        }
      );
    }
  });
}