import { gql } from 'apollo-boost';

export const ACCOUNT = gql`
  query Account ($token: String!) {
    account (token: $token) {
      accountId
      username
      firstname
      lastname
      phone
      address
      city
      country
      verified
      scored
      assessed
      level
      score
      exchange
      affiliateId
      currency
      plan {
        plan
        status
        trialEnd
        amountDiscount
        percentDiscount
      }
      cards {
        brand
        last4
      }
      invoices {
        invoiceId
        invoice
        amountDue
        amountPaid
        created
        discount
        currency
        items {
          name
          description
          quantity
          amount
        }
      }
    }
  }
`;
