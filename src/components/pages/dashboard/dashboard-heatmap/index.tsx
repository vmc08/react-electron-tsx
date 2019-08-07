import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { Row, Col, Card, Typography, Alert } from 'antd';

import { HEAT_MAP } from '../../../../apollo/queries/dashboard';
import { useMarketsContextValue } from '../../../../contexts/MarketsContext';
import { useUserContextValue } from '../../../../contexts/UserContext';
import { useIntervalContext } from '../../../../contexts/IntervalContext';
import { truncateDecimals } from '../../../../utils/numberUtils';
import { HEAT_COLORS } from '../../../../utils/data/chartDataUtils';

import DashboardSpinner from '../../../spinners/DashboardSpinner';

const { Title, Paragraph } = Typography;

interface IHeatmapDetail {
  reit: any,
  level: number,
  priceChange: number,
}

const StyledTitle = styled(Title)`
  text-transform: capitalize;
`;

const StyledParagraph = styled(Paragraph)`
  color: #FFF !important;
`;

const StyledDiv = styled.div`
  min-height: 100vh;
  .ant-row-flex:last-of-type {
    .ant-col {
      padding-bottom: 0 !important;
    }
  }
`;

const HeatMapCard = ({ reit, level, priceChange }: IHeatmapDetail, innerIdx: number) => (
  <Col xs={24} md={4} className="my-1" key={reit.reitId}>
    <Card
      style={{ backgroundColor: HEAT_COLORS[level + 2] }}
      key={innerIdx}
      className="text-center"
    >
      <StyledParagraph ellipsis className="mb-2">{reit.name}</StyledParagraph>
      <StyledParagraph className="mb-0">{truncateDecimals(priceChange * 100)}%</StyledParagraph>
    </Card>
  </Col>
);

const DashboardHeatMap = () => {
  const { token } = useUserContextValue();
  const { interval } = useIntervalContext();
  const { market: { marketCode } } = useMarketsContextValue();

  let serverError: string | undefined;
  let dataSource: any[] = [];

  return (
    <Query<any>
      query={HEAT_MAP}
      variables={{ token, exchange: marketCode, interval }}
    >
      {({ data, loading, error }) => {
        if (error) {
          serverError = error.graphQLErrors[0].message;
          return <Alert message={serverError} type="error" />;
        } else {
          dataSource = Object.entries(data);
        }
        return (
          <DashboardSpinner isLoading={loading}>
            <StyledDiv>
              {dataSource.map(([sourceKey, { details }]) => {
                if (!details.length) {
                  return null;
                }
                return (
                  <Row type="flex" gutter={16} key={sourceKey}>
                    <Col className="pb-2 pb-sm-3" xs={24}>
                      <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
                        <StyledTitle level={4}>
                          {sourceKey.toLowerCase().split('_').join(' ')} REITs
                        </StyledTitle>
                        <Row type="flex" gutter={8}>
                          {details.map(HeatMapCard)}
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                );
              })}
            </StyledDiv>
          </DashboardSpinner>
        );
      }}
    </Query>
  );
};

export default DashboardHeatMap;
