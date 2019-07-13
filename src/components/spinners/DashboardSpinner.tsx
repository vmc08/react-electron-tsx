import React from 'react';
import styled from 'styled-components';
import { Spin, Icon } from 'antd';

const LoadingIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const StyledSpinnerWrapper = styled.div`
  .ant-spin-nested-loading {
    min-height: 150px;
  }
`;

const DashboardSpinner = ({ isLoading, children }: { isLoading: boolean, children: any }) => (
  <StyledSpinnerWrapper>
    <Spin indicator={LoadingIcon} spinning={isLoading}>
      {children}
    </Spin>
  </StyledSpinnerWrapper>
);

export default DashboardSpinner;
