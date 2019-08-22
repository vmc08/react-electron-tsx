import { gql } from 'apollo-boost';

export const AFFILIATE = gql`
  query Affiliate ($token: String, $affiliateId: String!) {
    affiliate (token: $token, affiliateId: $affiliateId) {
      affiliateId
      plan
      period
      years
      discount
    }
  }
`;
