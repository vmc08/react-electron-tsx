import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';
import { Dropdown, Button, Icon, Menu, Checkbox, Input, Row, Col, Popover } from 'antd';

import { IChartFilters } from './types';
import { useUserContextValue } from '../../../../contexts/UserContext';
import { CUSTOM_SETS } from '../../../../apollo/queries/reits';

interface ILocalState {
  state: {
    visibility: boolean,
    popoverVisible: boolean,
    searchString: string | undefined,
    customSetName: string | undefined,
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

const popoverContent = ({ state, setState }: ILocalState) => {
  return (
    <Row gutter={12}>
      <Col span={24} className="mb-2">
        <Input
          allowClear
          placeholder="Custom set name"
          onChange={(e) => setState({ ...state, customSetName: e.target.value })}
        />
      </Col>
      <Col span={12}>
        <Button
          disabled={!state.customSetName}
          size="small"
          block
          type="primary"
        >
          Okay
        </Button>
      </Col>
      <Col span={12}>
        <Button
          size="small"
          type="link"
          block
          onClick={() => setState({ ...state, customSetName: undefined, popoverVisible: false })}
        >
          Cancel
        </Button>
      </Col>
    </Row>
  );
};

const overlayMenu = (
  listSource: any,
  { filters: filtersState, setFilters }: IChartFilters,
  { state, setState }: ILocalState,
) => {
  const derivedSouce = listSource.filter((source: { name: string }) => {
    if (state.searchString) {
      return source.name.indexOf(state.searchString.toLowerCase()) >= 0;
    }
    return source.name;
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
            <Popover
              overlayClassName="custom-set-form"
              content={popoverContent({ state, setState })}
              placement="bottomLeft"
              title="Save current column state"
              trigger="click"
              visible={state.popoverVisible}
              onVisibleChange={(visibility) => setState({ ...state, popoverVisible: visibility })}
            >
              <Button block type="primary">
                Save
              </Button>
            </Popover>
          </Col>
        </Row>
      </div>
      <Menu
        selectable={false}
        style={{ maxHeight: 350, overflow: 'auto', border: 0 }}
      >
        {derivedSouce.map((filter: any, idx: number) => {
          return (
            <StyledMenuItem key={idx} className="m-0">
              <Checkbox
                style={{ width: '100%' }}
              >
                {filter.name}
              </Checkbox>
            </StyledMenuItem>
          );
        })}
      </Menu>
    </StyledOverlayWrapper>
  );
};

const CustomSets = ({ filters, setFilters }: IChartFilters) => {
  const { token } = useUserContextValue();

  const [state, setState] = useState({
    visibility: false,
    popoverVisible: false,
    searchString: undefined,
    customSetName: undefined,
  });

  const { loading, error: serverError, data } = useQuery(CUSTOM_SETS, {
    variables: { token },
  });

  const listSource = !loading ? data.reitIndexFilter : [];

  return (
    <Dropdown
      overlay={overlayMenu(
        listSource,
        { filters, setFilters },
        { state, setState },
      )}
      trigger={['click']}
      visible={state.visibility || state.popoverVisible}
      onVisibleChange={( visibility) => setState({ ...state, visibility })}
    >
      <Button className="text-left d-flex" size="large" style={{ width: '100%' }}>
        <span style={{ flexGrow: 1 }}>Custom Sets</span>
        <Icon type="down" className="pt-2" />
      </Button>
    </Dropdown>
  );
};

export default CustomSets;
