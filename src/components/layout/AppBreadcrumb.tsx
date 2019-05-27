import React from 'react';
import { Breadcrumb } from 'antd';

export default () => {
  return (
    <Breadcrumb style={{ margin: '16px 0', fontSize: 20, fontWeight: 600 }}>
      <Breadcrumb.Item>User</Breadcrumb.Item>
      <Breadcrumb.Item>Bill</Breadcrumb.Item>
    </Breadcrumb>
  );
};
