export const CUSTOMER_PLANS = [
  'GUEST',
  'FREE',
  'BASIC',
  'PREMIUM',
  'PROFESSIONAL',
];

export const MARKETS = [
  { label: 'Singapore', marketCode: 'SGX', countryCode: 'SG', currency: 'S$', disabled: false },
  { label: 'Hongkong', marketCode: 'HKEX', countryCode: 'HK', currency: 'HK$', disabled: false },
  { label: 'Malaysia', marketCode: 'MYX', countryCode: 'MY', currency: 'RM', disabled: false },
  { label: 'Australia', marketCode: 'ASX', countryCode: 'AU', currency: 'A$', disabled: true },
];

export const SECTORS = [
  { label: 'HEALTHCARE', disabled: false },
  { label: 'RESIDENTIAL', disabled: true },
  { label: 'HOSPITALITY', disabled: false },
  { label: 'INDUSTRIAL', disabled: false },
  { label: 'RETAIL', disabled: false },
  { label: 'COMMERCIAL', disabled: false },
  { label: 'DATA_CENTRES', disabled: false },
];
