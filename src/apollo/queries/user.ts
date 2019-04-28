import { gql } from 'apollo-boost';

export const ACCOUNT = gql`
  query Account ($token: String!) {
    account (token: $token) {
      accountId
      username
      firstname
      lastname
      created
      level
    }
  }
`;
