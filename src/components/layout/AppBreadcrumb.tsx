import React from 'react';
import { Breadcrumb } from 'antd';

export default () => {
  return (
    <Breadcrumb className="my-3 mx-0" style={{ fontSize: 18, fontWeight: 600 }}>
      <Breadcrumb.Item>User</Breadcrumb.Item>
      <Breadcrumb.Item>Bill</Breadcrumb.Item>
    </Breadcrumb>
  );
};
