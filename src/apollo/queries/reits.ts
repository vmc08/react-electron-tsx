import { gql } from 'apollo-boost';

export const REIT_INDEX = gql`
  query ReitIndex(
    $sector: [ReitSector],
    $token: String,
    $search: String,
    $offset: Float, $limit: Float,
    $exchange: REITExchange!
  ) {
    reitIndex(sector: $sector, token: $token, search: $search, exchange: $exchange) {
      count
      rows(offset: $offset, limit: $limit) {
        reitName
        stockCode
        priceCurrency
        marketPrice
        gearingRatio {
          value
          percentile
        }
        priceToBookRatio {
          value
          percentile
        }
        twelveMonthTrailingYield {
          value
          percentile
        }
        marketCap
        npiYield
        npiCapRate
        qualityScore {
          value
          quality
        }
        absoluteValuation {
          lower
          higher
          mean
          valuation
        }
        relativeValuation {
          lower
          higher
          mean
          valuation
        }
        lowYieldSpread {
          lower
          higher
          mean
          valuation
        }
        incomeSupportRatio
        gearingIncludePerpetual
        npiInterestCover
        occupancyRate
        waleByNLA
        waleByGrossRent
        weightedAverageDebtMaturity
        estimatedInterestCost
        managementFeeRatio
        managementFeeInUnitsRatio
        trusteeFeeInUnitsRatio
        rentalReversions
        weightedAverageInterestCost
        borrowingPercentageFixedRate
      }
    }
  }
`;
