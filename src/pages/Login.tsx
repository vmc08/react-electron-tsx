import React from 'react';
import styled from 'styled-components';
import { Card, Row, Col, Typography } from 'antd';

import LoginForm from '../components/forms/auth/LoginForm';
import logoLight from '../assets/images/logo-light.png';

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
          :not(.width-divider) {
            display: flex;
            flex-direction: column;
            div.ant-typography {
              flex-grow: 1;
            }
          }
          padding: 24px;
          &.with-divider {
            border-left: 1px solid rgb(232, 232, 232);
            @media only screen and (max-width: 576px) {
              border-left: none;
            }
            .ant-form-item:last-of-type {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
`;

const StyledBrandLogo = styled.div`
  height: 32px;
  background-image: url(${(props: { src: string }) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
`;

class Login extends React.Component {
  render() {
    return (
      <LoginWrapper>
        <Card>
          <Row className="root-row" type="flex">
            <Col sm={12} md={10} className="root-col">
              <Typography.Title level={4}>Log In</Typography.Title>
              <Typography.Paragraph>
                By Signing up, you can avail the features of our services.
              </Typography.Paragraph>
              <StyledBrandLogo src={logoLight} />
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
