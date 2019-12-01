import React, { useEffect } from 'react';
import { Row, Col, Card, Alert } from 'antd';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';

import ReitsTable from './components/ReitsTable';
import MiniSpinner from 'components/MiniSpinner';

import { IChartFilters } from '../types';
import { getTableColumns } from './components/ReitsTableColumns/ReitsTableColumns';
import { useMarketsContextValue } from 'contexts/MarketsContext';
import { useUserContextValue } from 'contexts/UserContext';

const generateDynamicQuery = (planLevel = 1, currency: string) => {
  const QUERY_TYPE_OBJECTS: { [key: string]: string } = {
    quality: '{ value quality }',
    valuation: '{ lower higher mean valuation }',
    percentile: '{ value percentile }',
  };
  const rowStrings: string[] = [];
  getTableColumns(currency).filter(({ plan = 0 }) => {
    return plan <= planLevel;
  }).forEach(({ dataIndex, queryType }) => {
    if (dataIndex) {
      const rowString = queryType ? `${dataIndex} ${QUERY_TYPE_OBJECTS[queryType]}` : dataIndex;
      rowStrings.push(rowString);
    }
  });
  const queryBody = `
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
          ${rowStrings.join('\n')}
        }
      }
    }
  `;
  return gql(queryBody);
};

const ReitsIndex = ({ filters, setFilters }: IChartFilters) => {
  const { market: { marketCode, currency } } = useMarketsContextValue();
  const { token, account } = useUserContextValue();
  const planLevel = account ? account.level : 0;

  const { loading, error: serverError, data, refetch } = useQuery(
    generateDynamicQuery(planLevel, currency), {
      notifyOnNetworkStatusChange: true,
      variables: {
        exchange: marketCode,
        token,
        ...(filters.sectors.length && { sector: filters.sectors }),
      },
    },
  );

  useEffect(() => {
    refetch({
      exchange: marketCode,
      token,
      ...(filters.sectors.length && { sector: filters.sectors }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.sectors.length]);

  return (
    <Row gutter={16}>
      <Col className="mb-2 mb-lg-0" xs={24}>
        <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
          {serverError ? (
            <Alert message={serverError} type="error" />
          ) : (
            <MiniSpinner isLoading={loading}>
              <ReitsTable
                reitsData={data.reitIndex || { rows: [] }}
                filters={filters}
                setFilters={setFilters}
              />
            </MiniSpinner>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default ReitsIndex;
