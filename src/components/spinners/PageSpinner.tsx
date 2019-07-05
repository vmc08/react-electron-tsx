import React from 'react';
import styled from 'styled-components';
import { Spin, Icon } from 'antd';

interface IPageSpinner {
  loading: boolean,
  children: any,
}

const StyledDiv = styled.div`
  .ant-spin {
    &.page-spinner {
      min-height: 100vh;
      display: flex !important;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .ant-spin-text {
        padding-top: 12px;
      }
    }
  }
`;

const LoadingIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export default ({ loading, children }: IPageSpinner) => (
  <StyledDiv>
    <Spin
      className="page-spinner"
      size="large"
      tip="Loading..."
      indicator={LoadingIcon}
      spinning={loading}
    >
      {children}
    </Spin>
  </StyledDiv>
);
