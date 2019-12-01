import { gql } from 'apollo-boost';

export const CUSTOM_SETS = gql`
  query reitIndexFilter($token: String!) {
    reitIndexFilter(token: $token) {
      reitIndexFilterId
      name
      selected
      used
      filter
      columns {
        name
        sort
        range {
          high
          low
        }
        order
      }
    }
  }
`;
