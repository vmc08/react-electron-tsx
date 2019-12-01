import React, { useState } from 'react';
import { Dropdown, Button, Icon, Menu, Checkbox } from 'antd';

import { IChartFilters } from '../types';
import { REITS_SECTORS } from 'utils/data/reitsDataUtils';

const overlayMenu = ({ filters: filtersState, setFilters }: IChartFilters) => (
  <Menu>
    {REITS_SECTORS.map((sector, idx) => {
      const sectorIdx = filtersState.sectors.findIndex((sectorState) => {
        return sectorState === sector.replace(' ', '_').toUpperCase();
      });
      return (
        <Menu.Item key={idx} className="p-0">
          <Checkbox
            style={{ padding: '5px 12px', width: '100%' }}
            checked={(sectorIdx >= 0)}
            onChange={() => {
              (sectorIdx >= 0) ?
                filtersState.sectors.splice(sectorIdx, 1) :
                filtersState.sectors.push(sector.replace(' ', '_').toUpperCase());
              setFilters({
                ...filtersState,
                sectors: filtersState.sectors,
              });
            }}
          >
            {sector}
          </Checkbox>
        </Menu.Item>
      );
    })}
  </Menu>
);

const SectorFilters = ({ filters, setFilters }: IChartFilters) => {
  const [visibility, setVisibility] = useState(false);
  return (
    <Dropdown
      overlay={overlayMenu({ filters, setFilters })}
      trigger={['click']}
      visible={visibility}
      onVisibleChange={setVisibility}
    >
      <Button className="text-left d-flex" size="large" style={{ width: '100%' }}>
        <span style={{ flexGrow: 1 }}>Sector Filter</span>
        <Icon type="down" className="pt-2" />
      </Button>
    </Dropdown>
  );
};

export default SectorFilters;
