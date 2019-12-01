export const CUSTOMER_PLANS = [
  'GUEST',
  'FREE',
  'BASIC',
  'PREMIUM',
  'PROFESSIONAL',
];

export const MARKETS = [{
  label: 'Singapore',
  marketCode: 'SGX',
  countryCode: 'SG',
  currency: 'S$',
  disabled: false,
  chartIndicators: true,
}, {
  label: 'Hongkong',
  marketCode: 'HKEX',
  countryCode: 'HK',
  currency: 'HK$',
  disabled: false,
  chartIndicators: true,
}, {
  label: 'Malaysia',
  marketCode: 'MYX',
  countryCode: 'MY',
  currency: 'RM',
  disabled: false,
  chartIndicators: false,
}, {
  label: 'Australia',
  marketCode: 'ASX',
  countryCode: 'AU',
  currency: 'A$',
  disabled: false,
  chartIndicators: false,
}];

export const MARKETS_WITHOUT_INDICATORS = MARKETS
  .filter(({ chartIndicators }) => !chartIndicators)
  .map((market) => market.marketCode);

export const SECTORS = [
  { label: 'HEALTHCARE', disabled: false },
  { label: 'RESIDENTIAL', disabled: true },
  { label: 'HOSPITALITY', disabled: false },
  { label: 'INDUSTRIAL', disabled: false },
  { label: 'RETAIL', disabled: false },
  { label: 'COMMERCIAL', disabled: false },
  { label: 'DATA_CENTRES', disabled: false },
];
