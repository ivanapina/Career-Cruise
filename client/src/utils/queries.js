import { gql } from '@apollo/client';

export const QUERY_POSTS = gql`
  query allPosts {
    post {
      _id
      name
      description
    }
  }
`;

export const QUERY_SINGLE_POST = gql`
  query singlePost($postId: ID!) {
    post(postId: $postId) {
      _id
      name
      skills
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      skills
    }
  }
`;
