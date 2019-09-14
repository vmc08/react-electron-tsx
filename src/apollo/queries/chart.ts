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

export const LEADING_RETAIL_PRICE_VS_RENTAL = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: RETAIL, exchange: $exchange) {
      ... on RetailLeadingCharts {
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

export const LEADING_RETAIL_VACANCY_RATES = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: RETAIL, exchange: $exchange) {
      ... on RetailLeadingCharts {
        vacancyRatesOrchardArea {
          label
          value
        }
        vacancyRatesOutsideOrchardArea {
          label
          value
        }
        vacancyRatesOutsideCentralArea {
          label
          value
        }
      }
    }
  }
`;

export const LEADING_RETAIL_MEDIAN_RENTALS = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: RETAIL, exchange: $exchange) {
      ... on RetailLeadingCharts {
        medianRentalsOrchardAreaLeaseCommencement {
          label
          value
        }
        medianRentalsOrchardAreaContractDate {
          label
          value
        }
        medianRentalsOutsideOrchardAreaLeaseCommencement {
          label
          value
        }
        medianRentalsOutsideOrchardAreaContractDate {
          label
          value
        }
        medianRentalsOutsideCentralAreaLeaseCommencement {
          label
          value
        }
        medianRentalsOutsideCentralAreaContractDate {
          label
          value
        }
      }
    }
  }
`;

export const LEADING_RETAIL_POTENTIAL_SUPPLY = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: RETAIL, exchange: $exchange) {
      ... on RetailLeadingCharts {
        potentialSupply {
          label
          value
        }
      }
    }
  }
`;

export const LEADING_INDUSTRIAL_PRICE_INDEX = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: INDUSTRIAL, exchange: $exchange) {
      ... on IndustrialLeadingCharts {
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

export const LEADING_INDUSTRIAL_VACANCY_RATES = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: INDUSTRIAL, exchange: $exchange) {
      ... on IndustrialLeadingCharts {
        vacancyRatesAll {
          label
          value
        }
        vacancyRatesMultipleUserFactory {
          label
          value
        }
        vacancyRatesSingleUserFactory {
          label
          value
        }
        vacancyRatesBusinessPark {
          label
          value
        }
        vacancyRatesWarehouse {
          label
          value
        }
      }
    }
  }
`;

export const LEADING_INDUSTRIAL_POTENTIAL_SUPPLY = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: INDUSTRIAL, exchange: $exchange) {
      ... on IndustrialLeadingCharts {
        potentialSupplyMultipleUserFactory {
          label
          value
        }
        potentialSupplySingleUserFactory {
          label
          value
        }
        potentialSupplyBusinessPark {
          label
          value
        }
        potentialSupplyWarehouse {
          label
          value
        }
      }
    }
  }
`;

export const LEADING_HOSPITALITY_TOTAL_VISITOR_ARRIVALS = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: HOSPITALITY, exchange: $exchange) {
      ... on HospitalityLeadingCharts {
        totalVisitorArrivals {
          label
          value
        }
      }
    }
  }
`;

export const LEADING_HOSPITALITY_SEASONALITY_TRENDS = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: HOSPITALITY, exchange: $exchange) {
      ... on HospitalityLeadingCharts {
        seasonalityTrends2013 {
          label
          value
        }
        seasonalityTrends2014 {
          label
          value
        }
        seasonalityTrends2015 {
          label
          value
        }
        seasonalityTrends2016 {
          label
          value
        }
        seasonalityTrends2017 {
          label
          value
        }
        seasonalityTrends2018 {
          label
          value
        }
        seasonalityTrends2019 {
          label
          value
        }
      }
    }
  }
`;

export const LEADING_HOSPITALITY_HOTEL_ROOM_NIGHT_TRENDS = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: HOSPITALITY, exchange: $exchange) {
      ... on HospitalityLeadingCharts {
        hotelRoomNightTrendsAvailableRoomNights {
          label
          value
        }
        hotelRoomNightTrendsPaidLettings {
          label
          value
        }
        hotelRoomNightTrendsGrossLettings {
          label
          value
        }
        totalVisitorArrivals {
          label
          value
        }
      }
    }
  }
`;

export const LEADING_HOSPITALITY_STANDARD_AVG_OCCUPANCY_RATES = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: HOSPITALITY, exchange: $exchange) {
      ... on HospitalityLeadingCharts {
        standardAverageOccupancyRates {
          label
          value
        }
      }
    }
  }
`;

export const LEADING_HOSPITALITY_ROOM_RATE_VS_REVENUE = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: HOSPITALITY, exchange: $exchange) {
      ... on HospitalityLeadingCharts {
        standardAverageRoomRates {
          label
          value
        }
        revenuePerAvailableRoom {
          label
          value
        }
      }
    }
  }
`;

export const LEADING_HOSPITALITY_POTENTIAL_SUPPLY = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: HOSPITALITY, exchange: $exchange) {
      ... on HospitalityLeadingCharts {
        potentialSupply {
          label
          value
        }
      }
    }
  }
`;

export const LEADING_RESIDENTIAL_HDB_PRIV_RESI_PROP = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: RESIDENTIAL, exchange: $exchange) {
      ... on ResidentialLeadingCharts {
        priceIndex {
          label
          value
        }
        rentalIndex {
          label
          value
        }
        HBD {
          label
          value
        }
      }
    }
  }
`;

export const LEADING_RESIDENTIAL_PRIVATE_RESIDENTIAL_PROPERTIES = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: RESIDENTIAL, exchange: $exchange) {
      ... on ResidentialLeadingCharts {
        priceIndexCCR {
          label
          value
        }
        rentalIndexCCR {
          label
          value
        }
        priceIndexRCR {
          label
          value
        }
        rentalIndexRCR {
          label
          value
        }
        priceIndexOCR {
          label
          value
        }
        rentalIndexOCR {
          label
          value
        }
      }
    }
  }
`;

export const LEADING_RESIDENTIAL_VACANCY_RATES = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: RESIDENTIAL, exchange: $exchange) {
      ... on ResidentialLeadingCharts {
        vacancyRatesCCR {
          label
          value
        }
        vacancyRatesRCR {
          label
          value
        }
        vacancyRatesOCR {
          label
          value
        }
      }
    }
  }
`;

export const LEADING_RESIDENTIAL_POTENTIAL_SUPPLY = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: RESIDENTIAL, exchange: $exchange) {
      ... on ResidentialLeadingCharts {
        privateResidentialUnits {
          label
          value
        }
        executiveCondominiums {
          label
          value
        }
      }
    }
  }
`;

export const LEADING_RETAIL_PRICE_AND_RENTAL_INDEX_TERRITORY_WIDE = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: RETAIL, exchange: $exchange) {
      ... on RetailLeadingCharts {
        priceIndex {
          value
          label
        }
        rentalIndex {
          value
          label
        }
      }
    }
  }
`;

export const LEADING_RETAIL_AVERAGE_AND_RENTS_BY_AREA = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: RETAIL, exchange: $exchange) {
      ... on RetailLeadingCharts {
        averagePricesHongKong {
          value
          label
        }
        averagePricesKowloon {
          value
          label
        }
        averagePricesNT {
          value
          label
        }
        averageRentsHongKong {
          value
          label
        }
        averageRentsKowloon {
          value
          label
        }
        averageRentsNT {
          value
          label
        }
      }
    }
  }
`;

export const LEADING_FLATTED_FACTORIES_AVERAGE_AND_RENTS_BY_AREA = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: FLATTED_FACTORIES, exchange: $exchange) {
      ... on FlattedFactoriesLeadingCharts {
        averagePricesHongKong {
          value
          label
        }
        averagePricesKowloon {
          value
          label
        }
        averagePricesNT {
          value
          label
        }
        averageRentsHongKong {
          value
          label
        }
        averageRentsKowloon {
          value
          label
        }
        averageRentsNT {
          value
          label
        }
      }
    }
  }
`;

export const LEADING_OFFICES_PRICE_AND_RENTAL_INDEX_TERRITORY_WIDE = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: OFFICES, exchange: $exchange) {
      ... on OfficesLeadingCharts {
        priceIndex {
          value
          label
        }
        rentalIndex {
          value
          label
        }
      }
    }
  }
`;

export const LEADING_OFFICES_PRICE_INDEX_TERRITORY_WIDE_BY_GRADE = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: OFFICES, exchange: $exchange) {
      ... on OfficesLeadingCharts {
        priceIndexGradeA {
          value
          label
        }
        priceIndexGradeB {
          value
          label
        }
        priceIndexGradeC {
          value
          label
        }
        priceIndexOverall: priceIndex {
          value
          label
        }
      }
    }
  }
`;

export const LEADING_OFFICES_RENTAL_INDEX_TERRITORY_WIDE_BY_GRADE = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: OFFICES, exchange: $exchange) {
      ... on OfficesLeadingCharts {
        rentalIndexGradeA {
          value
          label
        }
        rentalIndexGradeB {
          value
          label
        }
        rentalIndexGradeC {
          value
          label
        }
        rentalIndex {
          value
          label
        }
      }
    }
  }
`;

export const LEADING_DOMESTIC_PRICE_AND_RENTAL_INDEX_TERRITORY_WIDE = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: DOMESTIC, exchange: $exchange) {
      ... on DomesticLeadingCharts {
        priceIndex {
          value
          label
        }
        rentalIndex {
          value
          label
        }
      }
    }
  }
`;

export const LEADING_DOMESTIC_PRICE_INDEX_TERRITORY_WIDE_BY_CLASSES = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: DOMESTIC, exchange: $exchange) {
      ... on DomesticLeadingCharts {
        priceIndexClassA {
          value
          label
        }
        priceIndexClassB {
          value
          label
        }
        priceIndexClassC {
          value
          label
        }
        priceIndexClassD {
          value
          label
        }
        priceIndexClassE {
          value
          label
        }
        priceIndexAllClasses: priceIndex {
          value
          label
        }
      }
    }
  }
`;

export const LEADING_DOMESTIC_RENTAL_INDEX_TERRITORY_WIDE_BY_CLASSES = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: DOMESTIC, exchange: $exchange) {
      ... on DomesticLeadingCharts {
        rentalIndexClassA {
          value
          label
        }
        rentalIndexClassB {
          value
          label
        }
        rentalIndexClassC {
          value
          label
        }
        rentalIndexClassD {
          value
          label
        }
        rentalIndexClassE {
          value
          label
        }
        rentalIndex {
          value
          label
        }
      }
    }
  }
`;

export const LEADING_DOMESTIC_CLASSA_AVERAGE_PRICES_AND_RENTS_BY_AREA = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: DOMESTIC, exchange: $exchange) {
      ... on DomesticLeadingCharts {
        averagePricesClassAHongKong {
          value
          label
        }
        averagePricesClassAKowloon {
          value
          label
        }
        averagePricesClassANT {
          value
          label
        }
        averageRentsClassAHongKong {
          value
          label
        }
        averageRentsClassAKowloon {
          value
          label
        }
        averageRentsClassANT {
          value
          label
        }
      }
    }
  }
`;

export const LEADING_DOMESTIC_CLASSB_AVERAGE_PRICES_AND_RENTS_BY_AREA = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: DOMESTIC, exchange: $exchange) {
      ... on DomesticLeadingCharts {
        averagePricesClassBHongKong {
          value
          label
        }
        averagePricesClassBKowloon {
          value
          label
        }
        averagePricesClassBNT {
          value
          label
        }
        averageRentsClassBHongKong {
          value
          label
        }
        averageRentsClassBKowloon {
          value
          label
        }
        averageRentsClassBNT {
          value
          label
        }
      }
    }
  }
`;

export const LEADING_DOMESTIC_CLASSC_AVERAGE_PRICES_AND_RENTS_BY_AREA = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: DOMESTIC, exchange: $exchange) {
      ... on DomesticLeadingCharts {
        averagePricesClassCHongKong {
          value
          label
        }
        averagePricesClassCKowloon {
          value
          label
        }
        averagePricesClassCNT {
          value
          label
        }
        averageRentsClassCHongKong {
          value
          label
        }
        averageRentsClassCKowloon {
          value
          label
        }
        averageRentsClassCNT {
          value
          label
        }
      }
    }
  }
`;

export const LEADING_DOMESTIC_CLASSD_AVERAGE_PRICES_AND_RENTS_BY_AREA = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: DOMESTIC, exchange: $exchange) {
      ... on DomesticLeadingCharts {
        averagePricesClassDHongKong {
          value
          label
        }
        averagePricesClassDKowloon {
          value
          label
        }
        averagePricesClassDNT {
          value
          label
        }
        averageRentsClassDHongKong {
          value
          label
        }
        averageRentsClassDKowloon {
          value
          label
        }
        averageRentsClassDNT {
          value
          label
        }
      }
    }
  }
`;

export const LEADING_DOMESTIC_CLASSE_AVERAGE_PRICES_AND_RENTS_BY_AREA = gql`
  query leadingCharts($token: String!, $exchange: REITExchange!) {
    leadingCharts(token: $token, sector: DOMESTIC, exchange: $exchange) {
      ... on DomesticLeadingCharts {
        averagePricesClassEHongKong {
          value
          label
        }
        averagePricesClassEKowloon {
          value
          label
        }
        averagePricesClassENT {
          value
          label
        }
        averageRentsClassEHongKong {
          value
          label
        }
        averageRentsClassEKowloon {
          value
          label
        }
        averageRentsClassENT {
          value
          label
        }
      }
    }
  }
`;
