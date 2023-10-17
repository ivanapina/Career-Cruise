import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($profileName: String!, $jobTitle: String!, $jobDescription: String!) {
    addProfile(name: $profileName, title: $jobTitle, description: $jobDescription) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const REMOVE_POST = gql`
  mutation removePost($jobTitle: String!, $jobDescription: String! ) {
    removePost (title: $jobTitle, description: $jobDescription) {
      _id
      name
      post
    }
  }
`;
