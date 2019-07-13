import { gql } from 'apollo-boost';
import { REIT_FIELDS } from '../fields/reits';
import { sectors } from '../../utils/appDataUtils';

export const MARKET_CAP = gql`
  query MarketCap ($token: String!, $exchange: REITExchange!, $interval: Interval!) {
    marketCap (token: $token, exchange: $exchange, interval: $interval) {
      latest
      change
      chart {
        value
        label
      }
    }
  }
`;

export const HEAT_MAP = gql`
  query HeatMap ($token: String!, $exchange: REITExchange!, $interval: Interval!) {
    ${sectors.filter((s) => !s.disabled).map(({ label }) => {
      return `
        ${label}: heatMap (
          token: $token, exchange: $exchange, interval: $interval, sector: ${label}
        ) {
          histogram {
            level
            value
          }
          details {
            reit {
              reitId
              name
              stockCode
            }
            level
            priceChange
          }
        }
      `;
    })}
  }
`;

export const TOP_GAINERS = gql`
  query TopGainers (
    $token: String!, $exchange: REITExchange!, $interval: Interval!, $criteria: String!
  ) {
    topGainers (token: $token, exchange: $exchange, interval: $interval, criteria: $criteria) {
      reit {
        ${REIT_FIELDS}
      }
      priceChange
      priceChangeRatio
      marketCapChange
    }
  }
`;

export const TOP_VOLUME = gql`
  query TopVolume ($token: String!, $interval: Interval!, $exchange: REITExchange!) {
    topVolume (token: $token, interval: $interval, exchange: $exchange) {
      reit {
        ${REIT_FIELDS}
      }
      volume
    }
  }
`;

export const TOP_LOSERS = gql`
  query TopLosers(
    $token: String!, $interval: Interval!, $criteria: String!, $exchange: REITExchange!
  ) {
    topLosers(token: $token, interval: $interval, criteria: $criteria, exchange: $exchange) {
      reit {
        ${REIT_FIELDS}
      }
      priceChange
      priceChangeRatio
      marketCapChange
    }
  }
`;
