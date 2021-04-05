import { gql } from "graphql-request";
import { useQuery } from "react-query";
import { client } from "../graphql/client";

export function useMeQuery(...fields: string[]){
  return useQuery(['me', ...fields], () => {
    return client.request(
      gql`
        query{
          me{
            ${fields.join(',')}
          }
        }
      `
    )
  });
}
