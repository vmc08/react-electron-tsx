import React from 'react';
import { Row, Col, Card, Alert } from 'antd';
import { useQuery } from 'react-apollo';

import ReitsTable from './ReitsTable';
import DashboardSpinner from '../../spinners/DashboardSpinner';

import { useMarketsContextValue } from '../../../contexts/MarketsContext';
import { useUserContextValue } from '../../../contexts/UserContext';
import { REIT_INDEX } from '../../../apollo/queries/reits';

const ReitsIndex = () => {
  const { market: { marketCode } } = useMarketsContextValue();
  const { token } = useUserContextValue();
  const { loading, error: serverError, data } = useQuery(REIT_INDEX, {
    variables: { exchange: marketCode, token },
  });

  return (
    <Row gutter={16}>
      <Col className="mb-2 mb-lg-0" xs={24}>
        <Card className="p-3" style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
          {serverError ? (
            <Alert message={serverError} type="error" />
          ) : (
            <DashboardSpinner isLoading={loading}>
              <ReitsTable reitsData={data.reitIndex || { rows: [] }} />
            </DashboardSpinner>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default ReitsIndex;
