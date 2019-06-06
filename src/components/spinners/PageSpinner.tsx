import React from 'react';
import { Spin, Icon } from 'antd';

interface IPageSpinner {
  loading: boolean,
  children: any,
}

const LoadingIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export default ({ loading, children }: IPageSpinner) => (
  <Spin
    size="large"
    tip="Loading..."
    indicator={LoadingIcon}
    spinning={loading}
    style={{ minHeight: 400 }}
  >
    {children}
  </Spin>
);
