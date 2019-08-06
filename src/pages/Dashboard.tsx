import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col, Menu, Result, Button } from 'antd';

import AppLayout from '../components/layout/AppLayout';

import { useIntervalContext } from '../contexts/IntervalContext';
import LoadableComponent from '../config/LoadableComponent';

const DashboardIndex = LoadableComponent({
  componentPathName: 'components/pages/dashboard',
});

const FourOhFour = LoadableComponent({
  componentPathName: 'pages/FourOhFour',
});

interface IDashboardProps {
  token: string,
  requireAuth: boolean,
  authenticated: boolean,
}

const StyledMenu = styled(Menu)`
  background: transparent !important;
  border-bottom: 0 !important;
  .ant-menu-item {
    min-width: 85px;
    text-align: center;
    margin: 0 5px;
  }
`;

const IntervalMenu = () => {
  const { interval, setDashboardInterval } = useIntervalContext();
  return (
    <StyledMenu
      className="mb-2 mb-sm-3"
      mode="horizontal"
      defaultSelectedKeys={[interval]}
      selectedKeys={[interval]}
    >
      {['Week', 'Month', 'Year'].map((di) => (
        <Menu.Item
          key={di.charAt(0)}
          onClick={() => setDashboardInterval(di.charAt(0))}
        >
          {di}
        </Menu.Item>
      ))}
    </StyledMenu>
  );
};

const Dashboard = (props: IDashboardProps) => {
  const { requireAuth, authenticated, token } = props;
  return (
    <AppLayout requireAuth={requireAuth}>
      {authenticated ? (
        <>
          <Row type="flex" gutter={16}>
            <Col xs={24}>
              <IntervalMenu />
            </Col>
          </Row>
          <Switch>
            <Route path="/" component={() => <DashboardIndex token={token} />} />
            <Route component={FourOhFour} />
          </Switch>
        </>
      ) : (
        <div className="flex-center-contents">
          <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={(
              <Link to="/login">
                <Button type="primary">Signin is Required</Button>
              </Link>
            )}
          />
        </div>
      )}
    </AppLayout>
  );
};

export default Dashboard;
