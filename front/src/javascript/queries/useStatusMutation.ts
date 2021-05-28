import { gql } from "graphql-request";
import { useMutation, useQueryClient } from "react-query"
import { client } from "../graphql/client";
import { StatusRequest, StatusResponse } from "./statusMutation";
import { StatusResponse as StatusResponseData } from "./statusData";

export const useStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<StatusResponse, any, StatusRequest>((statusRequest: StatusRequest) => {
    return client.request(
      gql`
        mutation CreateStatus($status: String!){
          createStatus(status: $status){
            status{
              id
              createdAt
              status
            }
            error
          }
        }
      `, statusRequest
    )
  }, {
    onSuccess: (result) => {
      if(!result.createStatus) return;
      queryClient.setQueryData<StatusResponseData>(
        'status', 
        { currentStatus: result.createStatus }
      );
    }
  });
}