import React from 'react';
import { Row, Col, Select } from 'antd';

import AppLayout from '../components/layout/AppLayout';
import ReitsIndex from '../components/pages/reits';

import { useChartFilterContext } from '../contexts/ChartFilterContext';
import { useMarketsContextValue } from '../contexts/MarketsContext';
import { CHART_INDICATORS, CHART_SECTORS } from '../utils/data/chartDataUtils';

const { Option } = Select;

const ChartFilters = () => {
  const { market: { marketCode } } = useMarketsContextValue();
  const { setChartIndicator, setChartSector, indicator, sector } = useChartFilterContext();
  return (
    <Row type="flex" gutter={{ sm: 16, xs: 8 }}>
      <Col
        className="pb-2 pb-sm-3"
        xs={12} md={6} lg={4}
      >
        <Select
          showSearch
          size="large"
          style={{
            width: '100%',
          }}
          defaultValue={indicator.value}
          value={indicator.value}
          onChange={(_: string, option: any) => {
            setChartIndicator(CHART_INDICATORS[+option.key]);
          }}
        >
          <Option value="disabled" disabled>Chart Indicators</Option>
          {CHART_INDICATORS.filter(({ activeOnMarkets }) => {
            return activeOnMarkets.includes(marketCode);
          }).map(({ value: indicatorValue, label }, idx) => (
            <Option key={idx} value={indicatorValue}>{label}</Option>
          ))}
        </Select>
      </Col>
      <Col
        className="pb-2 pb-sm-3"
        xs={12} md={6} lg={4}
      >
        <Select
          showSearch
          size="large"
          style={{
            width: '100%',
          }}
          defaultValue={indicator.value}
          value={indicator.value}
          onChange={(_: string, option: any) => {
            setChartIndicator(CHART_INDICATORS[+option.key]);
          }}
        >
          <Option value="disabled" disabled>Chart Indicators</Option>
          {CHART_INDICATORS.filter(({ activeOnMarkets }) => {
            return activeOnMarkets.includes(marketCode);
          }).map(({ value: indicatorValue, label }, idx) => (
            <Option key={idx} value={indicatorValue}>{label}</Option>
          ))}
        </Select>
      </Col>
      <Col
        className="pb-2 pb-sm-3"
        xs={12}
        md={{ span: 6, offset: 6 }}
        lg={{ span: 4, offset: 12 }}
      >
        <Select
          showSearch
          size="large"
          style={{
            width: '100%',
          }}
          defaultValue={sector.value}
          value={sector.value}
          onChange={(_: string, option: any) => {
            setChartSector(CHART_SECTORS[marketCode][+option.key]);
          }}
        >
          <Option value="disabled" disabled>Chart Sectors</Option>
          {CHART_SECTORS[marketCode].map(({ value: sectorValue, label }, idx) => (
            <Option key={idx} value={sectorValue}>{label}</Option>
          ))}
        </Select>
      </Col>
    </Row>
  );
};

const Reits = ({ requireAuth }: { requireAuth: boolean }) => {
  return (
    <AppLayout requireAuth={requireAuth}>
      <ChartFilters />
      <ReitsIndex />
    </AppLayout>
  );
};

export default Reits;
