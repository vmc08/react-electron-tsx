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

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount ($input: CreateAccountInput!, $affiliateId: String) {
    createAccount(input: $input, affiliateId: $affiliateId) {
      token
      talk {
        token
        userId
      }
    }
  }
`;

export const SEND_ONBOARDING_CODE = gql`
  mutation SendOnboardingCode ($token: String!) {
    sendOnboardingCode (token: $token)
  }
`;

export const VERIFY_ONBOARDING_CODE = gql`
  mutation VerifyOnboardingCode ($token: String!, $code: String!) {
    verifyOnboardingCode (token: $token, code: $code)
  }
`;
