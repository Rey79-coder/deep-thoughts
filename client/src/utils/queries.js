// THIS FILE WILL will store all of the GraphQL query requests
import { gql } from '@apollo/client';

export const QUERY_THOUGHTS = gql`
query thought($id: ID!) {
  thought(_id: $id) {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;
