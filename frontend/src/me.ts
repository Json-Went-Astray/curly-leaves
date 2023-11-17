import {
  provideApolloClient,
  useApolloClient,
  useLazyQuery,
  useMutation,
  useQuery,
  useSubscription,
} from "@vue/apollo-composable";
import { computed, ref } from "vue";
import gql from "graphql-tag";

import { client } from "./client";
provideApolloClient(client);

export const signup = async (
  login: string,
  email: string,
  password_1: string,
  password_2: string,
  name: string,
  surname: string,
  tos: boolean,
  city: string,
  postalCode: string,
  phoneNumber: string,
  street: string,
  houseNumber: number,
  nip: string,
  companyName: string,
  county: string
) => {

  const userData: {
    login: string;
    email: string;
    password_1: string;
    password_2: string;
    name: string;
    surname: string;
    tos: boolean;
  } = {
    login,
    email,
    password_1,
    password_2,
    name,
    surname,
    tos,
  };

  const userExtra: {
    city: string;
    postalCode: string;
    phoneNumber: string;
    street: string;
    houseNumber: number;
    nip: string;
    companyName: string;
    county: string;
  } = {
    city,
    postalCode,
    phoneNumber,
    street,
    houseNumber,
    nip,
    companyName,
    county,
  };

  const { mutate: sendCredentials } = useMutation(
    gql`
      mutation userSignup(
        $userData: UserCreateInput!
        $userExtra: UserExtraInput!
      ) {
        userSignup(userData: $userData, userExtra: $userExtra) {
          id
        }
      } 
    `
  );

  try {
    const res = await sendCredentials({
      userData,
      userExtra

    });
  } catch (e) {
    throw e;
  }

  return true;
};
