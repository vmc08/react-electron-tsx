import { gql } from 'apollo-boost';

export const YIELD_SPREAD = gql`
  query YieldSpread (
    $token: String!, $exchange: REITExchange!, $sector: ReitSector, $timeRange: Duration!
  ) {
    yieldSpread (token: $token, exchange: $exchange, sector: $sector, timeRange: $timeRange ) {
      minusSTDDEV
      minus2STDDEV
      plusSTDDEV
      plus2STDDEV
      chart {
        value
        label
      }
    }
  }
`;

export const MARKET_CAP_NPI = gql`
  query PricePerNAVPerUnitIndex (
    $token: String!, $exchange: REITExchange!, $sector: ReitSector, $timeRange: Duration!
  ) {
    pricePerNAVPerUnitIndex (
      token: $token, exchange: $exchange, sector: $sector, timeRange: $timeRange
    ) {
      minusSTDDEV
      minus2STDDEV
      plusSTDDEV
      plus2STDDEV
      chart {
        value
        label
      }
    }
  }
`;

export const LEADING_COMMERCIAL_PRICE_VS_RENTAL = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: COMMERCIAL, exchange: $exchange) {
      ... on CommercialLeadingCharts {
        priceIndex {
          label
          value
        }
        rentalIndex {
          label
          value
        }
      }
    }
  }
`;

export const LEADING_COMMERCIAL_VACANCY_RATES = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: COMMERCIAL, exchange: $exchange) {
      ... on CommercialLeadingCharts {
        vacancyRatesCategory1 {
          label
          value
        }
        vacancyRatesCategory2 {
          label
          value
        }
      }
    }
  }
`;

export const LEADING_COMMERCIAL_MEDIAN_RENTALS = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: COMMERCIAL, exchange: $exchange) {
      ... on CommercialLeadingCharts {
        medianRentalsCategory1LeaseCommencement {
          label
          value
        }
        medianRentalsCategory1ContractDate {
          label
          value
        }
        medianRentalsCategory2LeaseCommencement {
          label
          value
        }
        medianRentalsCategory2ContractDate {
          label
          value
        }
      }
    }
  }
`;

export const LEADING_COMMERCIAL_POTENTIAL_SUPPLY = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: COMMERCIAL, exchange: $exchange) {
      ... on CommercialLeadingCharts {
        potentialSupply {
          label
          value
        }
      }
    }
  }
`;
