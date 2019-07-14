import React from 'react';
import styled from 'styled-components';
import { Spin, Icon } from 'antd';

const LoadingIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const StyledSpinnerWrapper = styled.div`
  // .ant-spin-nested-loading {
  //   min-height: ${({ isLoading }: { isLoading: number }) => isLoading ? '150px' : 'auto'};
  // }
`;

const DashboardSpinner = ({ isLoading, children }: { isLoading: boolean, children: any }) => (
  <StyledSpinnerWrapper isLoading={isLoading ? 1 : 0}>
    <Spin indicator={LoadingIcon} spinning={isLoading}>
      {children}
    </Spin>
  </StyledSpinnerWrapper>
);

export default DashboardSpinner;
