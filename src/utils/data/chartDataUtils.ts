interface IChartLabels {
  [key: string]: {
    label: string,
    symbol: string,
  },
}

export const CHART_COLORS = {
  GREEN: '#52C41A',
  BLUE: '#1890FF',
  ORANGE: '#FA8C16',
  RED: '#F5222D',
  YELLOW: '#FADB14',
  CYAN: '#13C2C2',
};

export const HEATMAP_COLORS = [
  '#962328', // DARK_RED
  '#ED3F33', // LIGHT_RED
  '#868A8D', // GRAY
  '#1F8A2E', // LIGHT_GREEN
  '#195D23', // DARK_GREEN
];

export const SANS_SERIF_FONT = `
  -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
`;

export const TRADING_VIEW_DEFAULT_CONFIG = {
  autosize: true,
  timezone: 'Asia/Singapore',
  library_path: '/assets/tradingview/charting_library/',
  client_id: 'tradingview.com',
  user_id: 'public_user_id',
  locale: 'en',
  disabled_features: ['use_localstorage_for_settings'],
  enabled_features: ['study_templates'],
  drawings_access: {
    type: 'black',
    tools: [{
      name: 'Regression Trend',
    }],
  },
};

export const CHART_LABELS: IChartLabels = {
  SGX: {
    label: 'FTSE ST Real Estate Investment',
    symbol: 'FTSE',
  },
  HKEX: {
    label: 'Hang Seng REIT Index',
    symbol: 'HANGSENG',
  },
  MYX: {
    label: 'MALAYSIA REIT Index',
    symbol: 'FTSE',
  },
};
