import { gql } from "graphql-request";
import { useMutation } from "react-query";
import { client } from "../graphql/client";
import { LoginParams, LoginResponse } from "./loginData";



export function useLogin(){
  return useMutation<LoginResponse, any, LoginParams>(async (data: LoginParams) => {
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
