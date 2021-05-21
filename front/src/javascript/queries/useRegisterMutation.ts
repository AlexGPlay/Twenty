import { gql } from "graphql-request";
import { useMutation } from "react-query"
import { client } from "../graphql/client";
import type { RegisterParams, RegisterResponse } from './registerMutation';


export const useRegisterMutation = () => {
  return useMutation<RegisterResponse, any, RegisterParams>((registerFields) => {
    return client.request(
      gql`
        mutation Register($key: String!, $name: String!, $surname: String!, $email: String!, $password: String!, $country: String!, $city: String!, $birthday: String!, $gender: String!, $terms: Boolean!){
          register(key: $key, name: $name, surname: $surname, email: $email, password: $password, country: $country, city: $city, birthday: $birthday, gender: $gender, terms: $terms){
            user{
              id
            }
            errors{
              field
              message
            }
          }
        }
      `, registerFields
    )
  });
}