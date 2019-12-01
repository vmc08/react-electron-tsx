import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';

import AppLayout from '../components/layout/AppLayout';
import ReitsIndex from '../components/pages/reits';
import { IChartFilters } from '../components/pages/reits/components/types';
import CustomSets from '../components/pages/reits/components/CustomSets';
import ColumnControl from '../components/pages/reits/components/ColumnControl';
import SectorFilters from '../components/pages/reits/components/SectorFilters';
import { getTableColumns } from '../components/pages/reits/ReitsTableColumns';

import { useMarketsContextValue } from '../contexts/MarketsContext';
import { useUserContextValue } from '../contexts/UserContext';

const ChartFilters = ({ filters, setFilters }: IChartFilters) => {
  const { token } = useUserContextValue();
  return (
    <Row type="flex" gutter={{ sm: 16, xs: 8 }}>
      <Col
        className="pb-2 pb-sm-3"
        xs={12} md={6} lg={4}
      >
        {token && <CustomSets filters={filters} setFilters={setFilters} />}
      </Col>
      <Col
        className="pb-2 pb-sm-3"
        xs={12} md={6} lg={4}
      >
        {token && <ColumnControl filters={filters} setFilters={setFilters} />}
      </Col>
      <Col
        className="pb-2 pb-sm-3"
        xs={12}
        md={{ span: 6, offset: 6 }}
        lg={{ span: 4, offset: 12 }}
      >
        <SectorFilters filters={filters} setFilters={setFilters} />
      </Col>
    </Row>
  );
};

const Reits = ({ requireAuth }: { requireAuth: boolean }) => {
  const { market: { currency } } = useMarketsContextValue();

  const [filters, setFilters] = useState({
    sectors: [],
    columns: getTableColumns(currency),
  });

  useEffect(() => {
    setFilters((prevFilters) => {
      const newColumns = getTableColumns(currency);
      const derivedColumns = prevFilters.columns.map((oldColumn) => {
        const newColumn = newColumns.find(({ dataIndex }) => {
          return dataIndex === oldColumn.dataIndex;
        });
        return {
          ...newColumn,
          selected: oldColumn.selected,
        };
      });
      return {
        ...prevFilters,
        columns: derivedColumns,
      };
    });
  }, [currency]);

  return (
    <AppLayout requireAuth={requireAuth}>
      <ChartFilters filters={filters} setFilters={setFilters} />
      <ReitsIndex filters={filters} setFilters={setFilters} />
    </AppLayout>
  );
};

export default Reits;
