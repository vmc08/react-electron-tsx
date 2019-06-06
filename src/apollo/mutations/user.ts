import { gql } from 'apollo-boost';

export const CREATE_ACCESS_TOKEN = gql`
  mutation CreateAccessToken ($input: CreateAccessTokenInput!) {
    createAccessToken(input: $input) {
      token
    }
  }
`;

export const REQUEST_RESET_PASSWORD = gql`
  mutation RequestResetPassword ($input: RequestResetPasswordInput!) {
    requestResetPassword(input: $input)
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword ($token: String!, $input: ResetPasswordInput!) {
    resetPassword(token: $token, input: $input)
  }
`;
