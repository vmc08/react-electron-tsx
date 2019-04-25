import React from 'react';
import styled from 'styled-components';
import { Card, Row, Col, Typography } from 'antd';

import LoginForm from '../components/forms/auth/LoginForm';

const LoginWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .ant-card {
    max-width: 650px;
    border-radius: 8px;
    .ant-card-body {
      padding: 0;
      .root-row {
        .root-col {
          padding: 24px;
          &.with-divider {
            border-left: 1px solid rgb(232, 232, 232);
            @media only screen and (max-width: 576px) {
              border-left: none;
            }
          }
        }
      }
    }
  }
`;

class Login extends React.Component {
  render() {
    return (
      <LoginWrapper>
        <Card>
          <Row className="root-row">
            <Col sm={12} md={10} className="root-col">
              <Typography.Title level={4}>Log In</Typography.Title>
              <Typography.Paragraph>
                Create, update and delete {process.env.REACT_APP_MAIN} data.
              </Typography.Paragraph>
            </Col>
            <Col sm={12} md={14} className="root-col with-divider">
              <LoginForm />
            </Col>
          </Row>
        </Card>
      </LoginWrapper>
    );
  }
}

export default Login;
