import { gql } from "graphql-request";
import { useQuery } from "react-query";
import { client } from "../graphql/client";

import { MeData } from './meData';

export function useMeQuery(){
  return useQuery<MeData>('me', () => {
    return client.request(
      gql`
        query{
          me{
            id
            email
            name
            surname
            birthday
            city
            country
            gender
            connected
            visits
            pendingInvitations
          }
        }
      `
    )
  });
}
