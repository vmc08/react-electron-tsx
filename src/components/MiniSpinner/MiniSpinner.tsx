import React from 'react';
import styled from 'styled-components';
import { Spin, Icon } from 'antd';

const StyledWrapper = styled.div`
  flex-grow: 1;
  .ant-spin-nested-loading {
    height: 100%;
  }
`;

const LoadingIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const MiniSpinner = ({ isLoading, children }: { isLoading: boolean, children: any}) => (
  <StyledWrapper>
    <Spin indicator={LoadingIcon} spinning={isLoading}>
      {children}
    </Spin>
  </StyledWrapper>
);

export default MiniSpinner;
