import { gql } from "graphql-request";
import { useMutation } from "react-query";
import { client } from "../graphql/client";

interface dataParams {
  email: string,
  password: string
}

export function useLogin(){
  return useMutation(async (data: dataParams) => {
    return await client.request(
      gql`
        mutation Login($email: String!, $password: String!){
          login(email: $email, password: $password){
            errors{
              field
              message
            }
            user{
              id
              email
              createdAt
              updatedAt
            }
          }
        }
      `, data
    )
  });
}
