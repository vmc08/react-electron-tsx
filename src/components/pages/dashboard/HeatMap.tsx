import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Card, Typography, Divider, Row, Col, Progress } from 'antd';

import DashboardSpinner from '../../spinners/DashboardSpinner';

import { useMarketsContextValue } from '../../../contexts/MarketsContext';
import { useUserContextValue } from '../../../contexts/UserContext';
import { useIntervalContext } from '../../../contexts/IntervalContext';
import { HEAT_MAP } from '../../../apollo/queries/dashboard';
import { HEAT_COLORS } from '../../../utils/data/chartDataUtils';
import { truncateDecimals } from '../../../utils/numberUtils';

const { Title, Text } = Typography;

interface IHeatMapData {
  value: number,
  label: string,
  level: number,
}

interface IHeatMapBar {
  title: string,
  data: IHeatMapData[],
}

const HeatMapTitle = styled.div`
  text-transform: capitalize;
  position: absolute;
  z-index: 1;
  color: rgba(255, 255, 255, 0.75);
  left: 2rem;
  line-height: 32px;
`;

const HeatMapContainer = styled.div`
  .ant-progress-outer {
    margin-right: 0 !important;
    padding-right: 0 !important;
  }
  .ant-progress-text {
    display: none;
  }
`;

const HeatMapBar = ({ title, data }: IHeatMapBar) => {
  let progressPercent = 0;
  const progressStrokeColors: { [key: string]: string } = {};

  data.forEach(({ level, value }) => {
    progressPercent = progressPercent + value * 100;
    const numberKey = `${truncateDecimals(progressPercent).toString()}`;
    progressStrokeColors[`${numberKey}%`] = HEAT_COLORS[level + 2];
  });

  const derivedStrokeColor = Object.keys(progressStrokeColors).length > 1 ?
    progressStrokeColors : progressStrokeColors[`${progressPercent}.00%`];

  return (
    <HeatMapContainer className="mb-2">
      <HeatMapTitle>{title} REITs</HeatMapTitle>
      <Progress
        strokeWidth={32}
        strokeColor={derivedStrokeColor}
        percent={progressPercent}
      />
    </HeatMapContainer>
  );
};

const HeatMap = () => {
  const { token } = useUserContextValue();
  const { interval } = useIntervalContext();
  const { market: { marketCode } } = useMarketsContextValue();

  let dataSource: any[] = [];

  return (
    <Query<any>
      query={HEAT_MAP}
      variables={{ token, exchange: marketCode, interval }}
    >
      {({ data, loading, error }) => {
        if (!loading) {
          dataSource = Object.entries(data);
        }
        return (
          <Card
            className="p-3"
            style={{ height: '100%' }}
            bodyStyle={{
              padding: 0,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Row>
              <Col xs={12}>
                <Title level={4} className="mb-0">Heat Map</Title>
              </Col>
              <Col xs={12}>
                <Link to="/dashboard/heatmap">
                  <Text type="secondary" className="float-right">Show details</Text>
                </Link>
              </Col>
            </Row>
            <Divider className="my-3" />
            <DashboardSpinner isLoading={loading}>
              {dataSource.map(([sourceKey, { histogram }]) => {
                if (!histogram.length) {
                  return null;
                }
                return (
                  <div key={sourceKey}>
                    <HeatMapBar
                      data={histogram}
                      title={sourceKey.toLowerCase().split('_').join(' ')}
                    />
                  </div>
                );
              })}
            </DashboardSpinner>
          </Card>
        );
      }}
    </Query>
  );
};

export default HeatMap;
