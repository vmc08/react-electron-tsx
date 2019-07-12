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
      avatar
      verified
      scored
      onboarded
      assessed
      level
      score
      exchange
      affiliateId
      currency
      created
      answer {
        order
        answer
      }
      plan {
        plan
        status
        trialEnd
        amountDiscount
        percentDiscount
      }
      cards {
        cardId
        expMonth
        expYear
        brand
        country
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
      charges {
        date
        currency
        amount
        description
      }
    }
  }
`;
