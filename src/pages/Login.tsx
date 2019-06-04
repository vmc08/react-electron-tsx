import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Typography } from 'antd';

import LoginForm from '../components/forms/auth/LoginForm';
import logoLight from '../assets/images/logo-light.png';

const { Title, Paragraph } = Typography;

const LoginWrapper = styled.div`
  height: 100vh;
  display: flex;
  padding-top: 24px;
  align-items: flex-start;
  justify-content: center;
  .ant-card {
    max-width: 650px;
    border-radius: 8px;
    .ant-card-body {
      padding: 0;
      .root-row {
        .root-col {
          padding: 24px;
          &:first-of-type {
            padding-bottom: 12px;
          }
          h3 {
            font-weight: 600;
          }
          .ant-typography {
            margin-bottom: 0;
            text-align: center;
          }
        }
      }
    }
  }
`;

const StyledBrandLogo = styled.img`
  height: 42px;
  margin: 0 auto;
  display: block;
  margin-bottom: 24px;
`;

const StyledDiv = styled.div`
  padding: '24px 12px';
`;

class Login extends React.Component {
  render() {
    return (
      <LoginWrapper>
        <StyledDiv>
          <StyledBrandLogo src={logoLight} alt="REITScreener" />
          <Card>
            <Row className="root-row" type="flex">
              <Col xs={24} className="root-col">
                <Title level={3}>Welcome back</Title>
              </Col>
              <Col xs={24} className="root-col">
                <LoginForm />
                <Paragraph>
                  Don't have an account? <Link to="/register">Sign up for free</Link>
                </Paragraph>
                <Paragraph>
                  Forgot your password? <Link to="/password/reset">Reset it</Link>
                </Paragraph>
              </Col>
            </Row>
          </Card>
        </StyledDiv>
      </LoginWrapper>
    );
  }
}

export default Login;
