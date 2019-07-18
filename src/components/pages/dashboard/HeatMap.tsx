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

const HeatMapBar = ({ title, data }: any) => {
  let progressPercent = 0;
  const progressStrokeColors: any = {};

  data.forEach(({ level, value }: any) => {
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
  const { token }: any = useUserContextValue();
  const { interval }: any = useIntervalContext();
  const { market: { marketCode } }: any = useMarketsContextValue();

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
