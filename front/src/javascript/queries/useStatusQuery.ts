import { gql } from "graphql-request";
import { useQuery } from "react-query";
import { client } from "../graphql/client";

import { StatusResponse } from './statusData';

export function useStatusQuery(){
  return useQuery<StatusResponse>('status', () => {
    return client.request(
      gql`
        query{
          currentStatus{
            status{
              createdAt
              status
            }
            error
          }
        }
      `
    )
  });
}
