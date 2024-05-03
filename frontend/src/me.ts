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
import router from "./router";

import { client } from "./client";
provideApolloClient(client);


export const isLoggedIn = ref(localStorage.getItem("token") !== null);

const meQuery =
  gql`
  query MeQuery {
    me {
      id
      picId
      login
      email
      name
      surname
      points
      cart {
        products {
          id
        }
      }
      createdAt
      profilePics {
        id
        source
      }
      addressesSets {
        isTemporary,
        ownerId
        city
        county
        street
        houseNumber
        phoneNumber
        postalCode
        nip
        companyName
      }
    }
  }`;


export const { refetch: fetchMe, result: userData } = useQuery(meQuery);

export const activateUser = async (
  link: string
) => {
  const { mutate: sendCredentials } = useMutation(
    gql`
      mutation activateUser(
        $link: link!
      ) {
        userActivate(link: $link) {
          user {
            isActive
          }
        }
      }
    `
  );

  const res = await sendCredentials({
    link
  });

  if (res?.data?.isActive) {
    return true;
  }
  return false;
}

export const isElevatedQuery = async () => {
  return true;
}

export const loginUser = async (
  userLogin: String,
  userPassword: String
) => {
  const { mutate: sendCredentials } = useMutation(
    gql`
      mutation loginUser(
        $userLogin: String!
        $userPassword: String!
      ) {
        loginUser(userLogin: $userLogin, userPassword: $userPassword) {
          token
          user {
            email
          }
        }
      } 
    `
  );

  const res = await sendCredentials({
    userLogin,
    userPassword
  });

  if (res?.data?.loginUser.token) {
    localStorage.setItem("token", res.data.loginUser.token);
    isLoggedIn.value = true;
    fetchMe();
    router.push("/");
    return true;
  }
  return false;
}

export const logout = async () => {
  client.writeQuery({
    query: meQuery,
    data: {
      me: null,
    },
  });
  localStorage.removeItem("token");
  isLoggedIn.value = false;
  router.push("/");
};

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
