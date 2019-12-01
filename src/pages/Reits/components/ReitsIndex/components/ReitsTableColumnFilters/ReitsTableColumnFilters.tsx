import React, { ReactNode } from 'react';
import { Input, Button, Icon, Row, Col, Slider, Typography } from 'antd';
import { FilterDropdownProps, ColumnProps } from 'antd/lib/table';
import { ReitsConsumer } from 'contexts/ReitsContext';
import { truncateDecimals } from 'utils/numberUtils';

const DEFAULT_DECIMAL_PLACES = 4;

interface ICustomType extends FilterDropdownProps {
  selectedKeys: any[],
  setSelectedKeys: (selectedKeys: any) => void,
}

export const reitsNameColumnFilter = (): Partial<ColumnProps<any>> => ({
  filterDropdown: (
    { setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps,
  ) => (
    <div className="p-2" style={{ minWidth: '15rem' }}>
      <Row className="mb-2">
        <Col span={24}>
          <Input
            placeholder="Search reit"
            value={selectedKeys && selectedKeys[0]}
            onChange={(e) => {
              return setSelectedKeys && setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
            onPressEnter={() => confirm && confirm()}
          />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>
          <Button
            type="primary"
            onClick={() => confirm && confirm()}
            icon="search"
            size="small"
            block
          >
            Search
          </Button>
        </Col>
        <Col span={12}>
          <Button
            onClick={() => clearFilters && clearFilters()}
            size="small"
            block
          >
            Reset
          </Button>
        </Col>
      </Row>
    </div>
  ),
  filterIcon: (filtered: any) => (
    <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
  ),
  onFilter: (value: any, record: any) => {
    return record.reitName
      .toString()
      .toLowerCase()
      .includes(value.toLowerCase());
  },
});

export const rangeColumnFilter = (
  dataKey: string, formatter?: (value: number) => ReactNode,
): Partial<ColumnProps<any>> => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: ICustomType) => {
    return (
      <ReitsConsumer>
        {({ dataSource }) => {
          const collection = dataSource.map((ds) => {
            if (ds[dataKey]) {
              return (typeof ds[dataKey] === 'number') ? ds[dataKey] : ds[dataKey].value;
            } else {
              return 0;
            }
          });
          const DEFAULT_MIN = +truncateDecimals(Math.min(...collection), DEFAULT_DECIMAL_PLACES);
          const DEFAULT_MAX = +truncateDecimals(Math.max(...collection), DEFAULT_DECIMAL_PLACES);
          const rangeObject = selectedKeys && selectedKeys[0];
          const minVal = rangeObject ? rangeObject.min : DEFAULT_MIN;
          const maxVal = rangeObject ? rangeObject.max : DEFAULT_MAX;
          return (
            <div className="p-2" style={{ minWidth: '18rem' }}>
              <Row gutter={8} className="mb-2">
                <Col span={12}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography.Text strong>Min:</Typography.Text>
                    <Typography.Text>
                      {formatter ? formatter(DEFAULT_MIN) : DEFAULT_MIN}
                    </Typography.Text>
                  </div>
                </Col>
                <Col span={12} className="text-right">
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography.Text strong>Max:</Typography.Text>
                    <Typography.Text>
                      {formatter ? formatter(DEFAULT_MAX) : DEFAULT_MAX}
                    </Typography.Text>
                  </div>
                </Col>
                <Col span={24}>
                  <Slider
                    range
                    step={0.000001}
                    min={DEFAULT_MIN}
                    max={DEFAULT_MAX}
                    value={[minVal, maxVal]}
                    tipFormatter={formatter}
                    onChange={(values) => {
                      if (typeof values !== 'number') {
                        return setSelectedKeys && setSelectedKeys([{
                          min: values[0],
                          max: values[1],
                        }]);
                      }
                    }}
                  />
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={12}>
                  <Button
                    type="primary"
                    onClick={() => confirm && confirm()}
                    icon="search"
                    size="small"
                    block
                  >
                    Filter
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    onClick={() => clearFilters && clearFilters()}
                    size="small"
                    block
                  >
                    Reset
                  </Button>
                </Col>
              </Row>
            </div>
          );
        }}
      </ReitsConsumer>
    );
  },
  onFilter: ({ min, max }: { min: number, max: number }, record: any) => {
    let columnValue = 0;
    if (record[dataKey]) {
      columnValue = (typeof record[dataKey] === 'number') ? record[dataKey] : record[dataKey].value;
    }
    return +truncateDecimals(columnValue, DEFAULT_DECIMAL_PLACES) >= min &&
      +truncateDecimals(columnValue, DEFAULT_DECIMAL_PLACES) <= max;
  },
});
