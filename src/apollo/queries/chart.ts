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
