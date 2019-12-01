import React from 'react';
import { Tag } from 'antd';
import { ColumnProps } from 'antd/lib/table';

import { reitsNameColumnFilter, rangeColumnFilter } from './ReitsTableColumnFilters';

import { CHART_COLORS } from '../../../utils/data/chartDataUtils';
import { formatCurrency, truncateDecimals } from '../../../utils/numberUtils';

const DEFAULT_TEXT = '-';

export interface IReitsTableColumn extends ColumnProps<any> {
  plan?: number,
  selected?: boolean,
  displayAsFilter?: boolean,
  queryType?: string,
}

const getTagColor = (conditionalValue: number) => {
  const RANGE_VALUES = [0, 3, 5];
  let tagColor = CHART_COLORS.ORANGE;
  if (conditionalValue < RANGE_VALUES[1]) {
    tagColor = CHART_COLORS.RED;
  }
  if (conditionalValue >= RANGE_VALUES[1] && conditionalValue < RANGE_VALUES[2]) {
    tagColor = CHART_COLORS.ORANGE;
  }
  if (conditionalValue >= RANGE_VALUES[2] ) {
    tagColor = CHART_COLORS.GREEN;
  }
  return tagColor;
};

const lowerAndHigherRenderer = (
  { lower, higher }: { lower: number, higher: number },
) => (currency: string, conditionalValue = 0, tagType = false) => {
  const formattedLower = lower ? `${currency} ${formatCurrency(lower)}` : null;
  const formattedHigher = higher ? `${currency} ${formatCurrency(higher)}` : null;
  const DerivedElement = (formattedLower && formattedHigher && tagType) ?
    Tag : ({ children }: any) => <span>{children}</span>;

  const tagObject = tagType ? {
    color: getTagColor(conditionalValue),
  } : {};

  const formattedText = formattedLower || formattedHigher ?
    `${formattedLower} - ${formattedHigher}` : DEFAULT_TEXT;
  return <DerivedElement {...tagObject}>{formattedText}</DerivedElement>;
};

const formatCurrencyRenderer =  (text: number, showZero = false) => (currency: string) => {
  return text || (showZero && text !== null) ? (
    <span>{currency} {formatCurrency(text)}</span>
  ) : DEFAULT_TEXT;
};

const truncateDecimalsRenderer = (args: any, showZero = false) => (
  conditionalValue = 0,
  tagType = false,
) => {
  const derivedValue = (typeof args === 'object' && args !== null) ? args.value : args;
  const DerivedElement = tagType ? Tag : ({ children }: any) => <span>{children}</span>;

  const tagObject = tagType ? {
    color: getTagColor(conditionalValue),
  } : {};

  return derivedValue || (showZero && args !== null) ? (
    <DerivedElement {...tagObject}>{truncateDecimals(derivedValue)}</DerivedElement>
  ) : DEFAULT_TEXT;
};

const percentageRenderer = (args: any, showZero = false) => (
  conditionalValue = 0,
  tagType = false,
) => {
  const derivedValue = (typeof args === 'object' && args !== null) ? args.value : args;
  const DerivedElement = tagType ? Tag : ({ children }: any) => <span>{children}</span>;

  const tagObject = tagType ? {
    color: getTagColor(conditionalValue),
  } : {};

  return derivedValue || (showZero && args !== null) ? (
    <DerivedElement {...tagObject}>{truncateDecimals(derivedValue * 100)}%</DerivedElement>
  ) : DEFAULT_TEXT;
};

export const getTableColumns = (currency: string): IReitsTableColumn[] => {
  return [{
    title: 'Reit',
    key: 'reitName',
    dataIndex: 'reitName',
    fixed: true,
    width: 300,
    ...reitsNameColumnFilter(),
    sorter: (a: any, b: any) => {
      if (a.reitName < b.reitName) { return -1; }
      if (a.reitName > b.reitName) { return 1; }
      return 0;
    },
    render: (text: string, record: any) => (
      <>
        <span>{text}</span>
        {record.stockCode === 'AW9U.SI' && (
          <Tag className="ml-2" color={CHART_COLORS.BLUE}>Unlocked</Tag>
        )}
      </>
    ),
    plan: 0,
    selected: true,
    displayAsFilter: false,
  }, {
    title: 'Stock ID',
    key: 'stockCode',
    dataIndex: 'stockCode',
    sorter: (a: any, b: any) => {
      if (a.stockCode < b.stockCode) { return -1; }
      if (a.stockCode > b.stockCode) { return 1; }
      return 0;
    },
    render: (text: number) => text ? text : DEFAULT_TEXT,
    plan: 0,
    selected: true,
    displayAsFilter: false,
  }, {
    title: 'Market Price',
    key: 'marketPrice',
    dataIndex: 'marketPrice',
    ...rangeColumnFilter('marketPrice', (value) => formatCurrencyRenderer(value, true)(currency)),
    sorter: (a: any, b: any) => a.marketPrice - b.marketPrice,
    render: (text: any) => formatCurrencyRenderer(text)(currency),
    plan: 0,
    selected: true,
  }, {
    title: 'Gearing Ratio',
    key: 'gearingRatio',
    dataIndex: 'gearingRatio',
    ...rangeColumnFilter('gearingRatio', (value) => percentageRenderer(value, true)()),
    sorter: (a: any, b: any) => a.gearingRatio.value - b.gearingRatio.value,
    render: (text: any ) => percentageRenderer(text)(text.percentile, true),
    plan: 0,
    selected: true,
    queryType: 'percentile',
  }, {
    title: 'Price-to-Book Ratio',
    key: 'priceToBookRatio',
    dataIndex: 'priceToBookRatio',
    ...rangeColumnFilter('priceToBookRatio', (value) => truncateDecimalsRenderer(value, true)()),
    sorter: (a: any, b: any) => a.priceToBookRatio.value - b.priceToBookRatio.value,
    render: (text: any ) => truncateDecimalsRenderer(text)(text.percentile, true),
    plan: 0,
    selected: true,
    queryType: 'percentile',
  }, {
    title: '12-Month Trailing Yield',
    key: 'twelveMonthTrailingYield',
    dataIndex: 'twelveMonthTrailingYield',
    ...rangeColumnFilter('twelveMonthTrailingYield', (value) => percentageRenderer(value, true)()),
    sorter: (a: any, b: any) => a.twelveMonthTrailingYield.value - b.twelveMonthTrailingYield.value,
    render: (text: any ) => percentageRenderer(text)(text.percentile, true),
    plan: 0,
    selected: true,
    queryType: 'percentile',
  }, {
    title: 'Market Cap',
    key: 'marketCap',
    dataIndex: 'marketCap',
    ...rangeColumnFilter('marketCap', (value) => formatCurrencyRenderer(value, true)(currency)),
    sorter: (a: any, b: any) => a.marketCap - b.marketCap,
    render: (text: any) => formatCurrencyRenderer(text)(currency),
    plan: 0,
    selected: true,
  }, {
    title: 'NPI Yield',
    key: 'npiYield',
    dataIndex: 'npiYield',
    ...rangeColumnFilter('npiYield', (value) => percentageRenderer(value, true)()),
    sorter: (a: any, b: any) => a.npiYield - b.npiYield,
    render: (text: any ) => percentageRenderer(text)(),
    plan: 1,
  }, {
    title: 'Quality Score',
    key: 'qualityScore',
    dataIndex: 'qualityScore',
    ...rangeColumnFilter('qualityScore', (value) => truncateDecimalsRenderer(value, true)()),
    sorter: (a: any, b: any) => a.qualityScore.value - b.qualityScore.value,
    render: (text: any ) => truncateDecimalsRenderer(text)(text.quality, true),
    plan: 2,
    queryType: 'quality',
  }, {
    title: 'NPI Cap Rate',
    key: 'npiCapRate',
    dataIndex: 'npiCapRate',
    ...rangeColumnFilter('npiCapRate', (value) => percentageRenderer(value, true)()),
    sorter: (a: any, b: any) => a.npiCapRate - b.npiCapRate,
    render: (text: any ) => percentageRenderer(text)(),
    plan: 2,
  }, {
    title: 'Absolute Valuation',
    key: 'absoluteValuation',
    dataIndex: 'absoluteValuation',
    render: (text: any) => lowerAndHigherRenderer(text)(currency, text.valuation, true),
    plan: 2,
    queryType: 'valuation',
  }, {
    title: 'Relative Valuation',
    key: 'relativeValuation',
    dataIndex: 'relativeValuation',
    render: (text: any) => lowerAndHigherRenderer(text)(currency, text.valuation, true),
    plan: 2,
    queryType: 'valuation',
  }, {
    title: 'Yield Spread',
    key: 'lowYieldSpread',
    dataIndex: 'lowYieldSpread',
    render: (text: any) => lowerAndHigherRenderer(text)(currency, text.valuation, true),
    plan: 2,
    queryType: 'valuation',
  }, {
    title: 'Income Support Ratio',
    key: 'incomeSupportRatio',
    dataIndex: 'incomeSupportRatio',
    ...rangeColumnFilter('incomeSupportRatio', (value) => percentageRenderer(value, true)()),
    sorter: (a: any, b: any) => a.incomeSupportRatio - b.incomeSupportRatio,
    render: (text: any ) => percentageRenderer(text)(),
    plan: 3,
  }, {
    title: 'Gearing (Including Perpetual)',
    key: 'gearingIncludePerpetual',
    dataIndex: 'gearingIncludePerpetual',
    ...rangeColumnFilter('gearingIncludePerpetual', (value) => percentageRenderer(value, true)()),
    sorter: (a: any, b: any) => a.gearingIncludePerpetual - b.gearingIncludePerpetual,
    render: (text: any ) => percentageRenderer(text)(),
    plan: 3,
  }, {
    title: 'NPI Interest Cover',
    key: 'npiInterestCover',
    dataIndex: 'npiInterestCover',
    ...rangeColumnFilter('npiInterestCover', (value) => truncateDecimalsRenderer(value, true)()),
    sorter: (a: any, b: any) => a.npiInterestCover - b.npiInterestCover,
    render: (text: any ) => truncateDecimalsRenderer(text)(),
    plan: 3,
  }, {
    title: 'Occupancy Rate',
    key: 'occupancyRate',
    dataIndex: 'occupancyRate',
    ...rangeColumnFilter('occupancyRate', (value) => percentageRenderer(value, true)()),
    sorter: (a: any, b: any) => a.occupancyRate - b.occupancyRate,
    render: (text: any ) => percentageRenderer(text)(),
    plan: 3,
  }, {
    title: 'WALE (by NLA)',
    key: 'waleByNLA',
    dataIndex: 'waleByNLA',
    ...rangeColumnFilter('waleByNLA', (value) => truncateDecimalsRenderer(value, true)()),
    sorter: (a: any, b: any) => a.waleByNLA - b.waleByNLA,
    render: (text: any ) => truncateDecimalsRenderer(text)(),
    plan: 3,
  }, {
    title: 'WALE (by Gross Rent)',
    key: 'waleByGrossRent',
    dataIndex: 'waleByGrossRent',
    ...rangeColumnFilter('waleByGrossRent', (value) => truncateDecimalsRenderer(value, true)()),
    sorter: (a: any, b: any) => a.waleByGrossRent - b.waleByGrossRent,
    render: (text: any ) => truncateDecimalsRenderer(text)(),
    plan: 3,
  }, {
    title: 'Weighted Average Debt Maturity',
    key: 'weightedAverageDebtMaturity',
    dataIndex: 'weightedAverageDebtMaturity',
    ...rangeColumnFilter(
      'weightedAverageDebtMaturity',
      (value) => truncateDecimalsRenderer(value, true)(),
    ),
    sorter: (a: any, b: any) => a.weightedAverageDebtMaturity - b.weightedAverageDebtMaturity,
    render: (text: any ) => truncateDecimalsRenderer(text)(),
    plan: 3,
  }, {
    title: 'Estimated Interest Cost',
    key: 'estimatedInterestCost',
    dataIndex: 'estimatedInterestCost',
    ...rangeColumnFilter('estimatedInterestCost', (value) => percentageRenderer(value, true)()),
    sorter: (a: any, b: any) => a.estimatedInterestCost - b.estimatedInterestCost,
    render: (text: any ) => percentageRenderer(text)(),
    plan: 3,
  }, {
    title: 'Management Fee Ratio',
    key: 'managementFeeRatio',
    dataIndex: 'managementFeeRatio',
    ...rangeColumnFilter('managementFeeRatio', (value) => percentageRenderer(value, true)()),
    sorter: (a: any, b: any) => a.managementFeeRatio - b.managementFeeRatio,
    render: (text: any ) => percentageRenderer(text)(),
    plan: 4,
  }, {
    title: 'Management Fee in Units Ratio',
    key: 'managementFeeInUnitsRatio',
    dataIndex: 'managementFeeInUnitsRatio',
    ...rangeColumnFilter('managementFeeInUnitsRatio', (value) => percentageRenderer(value, true)()),
    sorter: (a: any, b: any) => a.managementFeeInUnitsRatio - b.managementFeeInUnitsRatio,
    render: (text: any ) => percentageRenderer(text)(),
    plan: 4,
  }, {
    title: 'Trustee Fee in Units Ratio',
    key: 'trusteeFeeInUnitsRatio',
    dataIndex: 'trusteeFeeInUnitsRatio',
    ...rangeColumnFilter('trusteeFeeInUnitsRatio', (value) => percentageRenderer(value, true)()),
    sorter: (a: any, b: any) => a.trusteeFeeInUnitsRatio - b.trusteeFeeInUnitsRatio,
    render: (text: any ) => percentageRenderer(text)(),
    plan: 4,
  }, {
    title: 'Rental Reversions',
    key: 'rentalReversions',
    dataIndex: 'rentalReversions',
    ...rangeColumnFilter('rentalReversions', (value) => percentageRenderer(value, true)()),
    sorter: (a: any, b: any) => a.rentalReversions - b.rentalReversions,
    render: (text: any ) => percentageRenderer(text)(),
    plan: 4,
  }, {
    title: 'Weighted Average Interest Cost',
    key: 'weightedAverageInterestCost',
    dataIndex: 'weightedAverageInterestCost',
    ...rangeColumnFilter(
      'weightedAverageInterestCost',
      (value) => percentageRenderer(value, true)(),
    ),
    sorter: (a: any, b: any) => a.weightedAverageInterestCost - b.weightedAverageInterestCost,
    render: (text: any ) => percentageRenderer(text)(),
    plan: 4,
  }, {
    title: 'Borrowing (%) Fixed Rate',
    key: 'borrowingPercentageFixedRate',
    dataIndex: 'borrowingPercentageFixedRate',
    ...rangeColumnFilter(
      'borrowingPercentageFixedRate',
      (value) => percentageRenderer(value, true)(),
    ),
    sorter: (a: any, b: any) => a.borrowingPercentageFixedRate - b.borrowingPercentageFixedRate,
    render: (text: any ) => percentageRenderer(text)(),
    plan: 4,
  }];
};
