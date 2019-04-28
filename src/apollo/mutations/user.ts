import { gql } from 'apollo-boost';

export const CREATE_ACCESS_TOKEN = gql`
  mutation CreateAccessToken ($input: CreateAccessTokenInput!) {
    createAccessToken(input: $input) {
      token
    }
  }
`;
