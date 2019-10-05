import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import ReactDragListView from 'react-drag-listview';
import { getTableColumns } from './ReitsTableColumns';
import { useMarketsContextValue } from '../../../contexts/MarketsContext';
import { ReitsProvider } from '../../../contexts/ReitsContext';

const ReitsTable = ({ reitsData }: { reitsData: { rows: any }}) => {
  const { rows } = reitsData;
  const { market: { currency } } = useMarketsContextValue();
  const [state, setState] = useState({ columns: getTableColumns(currency) });

  useEffect(() => {
    setState({ columns: getTableColumns(currency) });
  }, [currency]);

  return (
    <ReitsProvider dataSource={rows}>
      <ReactDragListView.DragColumn
        nodeSelector="th"
        onDragEnd={(fromIndex: number, toIndex: number) => {
          const columns = state.columns;
          const item = columns.splice(fromIndex, 1)[0];
          columns.splice(toIndex, 0, item);
          setState({ columns });
        }}
      >
        <Table
          rowKey="stockCode"
          columns={state.columns}
          dataSource={rows}
          scroll={{ x: 'max-content' }}
        />
      </ReactDragListView.DragColumn>
    </ReitsProvider>
  );
};

export default ReitsTable;
