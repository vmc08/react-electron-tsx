import React from 'react';
import { Layout, Breadcrumb } from 'antd';

const { Content, Footer } = Layout;

export default ({ children }: { children: React.ComponentClass }) => {
  return (
    <>
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>Reitscreener Admin ©2019</Footer>
    </>
  );
};
