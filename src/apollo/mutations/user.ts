import { gql } from 'apollo-boost';

export const CREATE_ACCESS_TOKEN = gql`
  mutation ($input: CreateTokenInput!) {
    createToken(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

export const REFRESH_ACCESS_TOKEN = gql`
  mutation ($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`;

export const REQUEST_RESET_PASSWORD = gql`
  mutation RequestResetPassword ($input: RequestResetPasswordInput!) {
    requestResetPassword (input: $input)
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword ($token: String!, $input: ResetPasswordInput!) {
    resetPassword (token: $token, input: $input)
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation ($input: CreateAccountInput!, $affiliateId: String, $code: String) {
    createAccount (input: $input, affiliateId: $affiliateId, code: $code) {
      refreshToken
      accessToken
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

export const ASSESS_ONBOARDING_SCORE = gql`
  mutation AssessOnboardingScore ($token: String!, $input: [OnboardingAnswerInput]!) {
    assessOnboardingScore (token: $token, input: $input)
  }
`;
