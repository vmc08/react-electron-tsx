import React from 'react';
import { Table } from 'antd';
import ReactDragListView from 'react-drag-listview';
import { ReitsProvider } from '../../../contexts/ReitsContext';
import { IChartFilters } from './components/types';

interface IReitsTable extends IChartFilters {
  reitsData: { rows: any }
}

const ReitsTable = ({ reitsData, filters, setFilters }: IReitsTable) => {
  const { rows } = reitsData;
  return (
    <ReitsProvider dataSource={rows}>
      <ReactDragListView.DragColumn
        nodeSelector="th"
        lineClassName="drag-line"
        onDragEnd={(fromIndex: number, toIndex: number) => {
          const columns = [...filters.columns];
          const item = columns.splice(fromIndex, 1)[0];
          columns.splice(toIndex, 0, item);
          setFilters({ ...filters, columns });
        }}
      >
        <Table
          rowKey="stockCode"
          columns={filters.columns.filter((column) => column.selected)}
          dataSource={rows}
          scroll={{ x: 'max-content' }}
        />
      </ReactDragListView.DragColumn>
    </ReitsProvider>
  );
};

export default ReitsTable;
