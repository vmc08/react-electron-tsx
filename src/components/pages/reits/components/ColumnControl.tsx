import React, { useState } from 'react';
import styled from 'styled-components';
import { Dropdown, Button, Icon, Menu, Checkbox, Input, Row, Col } from 'antd';
import { getTableColumns } from '../ReitsTableColumns';

import { IChartFilters } from './types';
import { useUserContextValue } from '../../../../contexts/UserContext';
import { useMarketsContextValue } from '../../../../contexts/MarketsContext';

interface ILocalState {
  state: {
    visibility: boolean,
    searchString: string | undefined,
  },
  setState: any,
}

const StyledMenuItem = styled(Menu.Item)`
  &:hover {
    background-color: #e6f7ff
  }
`;

const StyledOverlayWrapper = styled.div`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  .filter {
    border-radius: 4px 4px 0 0;
  }
  .ant-menu {
    border-radius: 0 0 4px 4px;
  }
`;

const overlayMenu = (
  currency: string,
  planLevel: number,
  { filters: filtersState, setFilters }: IChartFilters,
  { state, setState }: ILocalState,
) => {
  const derivedColumns = filtersState.columns.filter(({ title, displayAsFilter = true }) => {
    const filterTitle = title ? title.toString().toLowerCase() : false;
    if (filterTitle && state.searchString) {
      return filterTitle.indexOf(state.searchString.toLowerCase()) >= 0 && displayAsFilter;
    }
    return displayAsFilter;
  });

  return (
    <StyledOverlayWrapper>
      <div className="p-2 filter" style={{ background: '#FFF' }}>
        <Row gutter={8}>
          <Col span={17}>
            <Input.Search
              allowClear
              placeholder="Search"
              onChange={(e) => setState({ ...state, searchString: e.target.value })}
            />
          </Col>
          <Col span={7}>
            <Button
              block
              type="primary"
              onClick={() => {
                setFilters({
                  ...filtersState,
                  columns: getTableColumns(currency),
                });
              }}
            >
              Reset
            </Button>
          </Col>
        </Row>
      </div>
      <Menu
        selectable={false}
        style={{ maxHeight: 350, overflow: 'auto', border: 0 }}
      >
        {derivedColumns.map((column, idx) => {
          const { title, selected, plan = 0 } = column;
          const lockedColumn = planLevel < plan;
          return (
            <StyledMenuItem key={idx} className="m-0">
              {lockedColumn ? (
                <>
                  <Icon style={{ fontSize: 16 }} type="lock" />
                  {title}
                </>
              ) : (
                <Checkbox
                  style={{ width: '100%' }}
                  checked={selected}
                  onChange={() => {
                    const clonedColumn = {...column};
                    clonedColumn.selected = !column.selected;
                    const selectedIdx = filtersState.columns.findIndex((col) => {
                      return col.dataIndex === clonedColumn.dataIndex;
                    });
                    filtersState.columns[selectedIdx] = clonedColumn;

                    setFilters({
                      ...filtersState,
                      columns: filtersState.columns,
                    });
                  }}
                >
                  {title}
                </Checkbox>
              )}
            </StyledMenuItem>
          );
        })}
      </Menu>
    </StyledOverlayWrapper>
  );
};

const ColumnControl = ({ filters, setFilters }: IChartFilters) => {
  const { account } = useUserContextValue();
  const { market: { currency } } = useMarketsContextValue();
  const planLevel = account ? account.level : 0;

  const [state, setState] = useState({
    visibility: false,
    searchString: undefined,
  });

  return (
    <Dropdown
      overlay={overlayMenu(
        currency,
        planLevel,
        { filters, setFilters },
        { state, setState },
      )}
      trigger={['click']}
      visible={state.visibility}
      onVisibleChange={( visibility) => setState({ ...state, visibility })}
    >
      <Button className="text-left d-flex" size="large" style={{ width: '100%' }}>
        <span style={{ flexGrow: 1 }}>Edit Columns</span>
        <Icon type="down" className="pt-2" />
      </Button>
    </Dropdown>
  );
};

export default ColumnControl;
