import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Typography } from 'antd';

import RegistrationForm from '../components/forms/RegistrationForm';
import logoLight from '../assets/images/logo-light.png';

const { Title, Paragraph } = Typography;

const RegisterWrapper = styled.div`
  height: 100vh;
  display: flex;
  padding-top: 24px;
  align-items: flex-start;
  justify-content: center;
  .ant-card {
    max-width: 500px;
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
            font-weight: 700;
          }
          .ant-typography {
            text-align: center;
            a:hover {
              text-decoration: underline;
            }
          }
          .ant-form-item > .ant-col {
            .has-error > .ant-form-explain {
              margin-bottom: 5px;
            }
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
  padding: 24px 12px;
`;

class Login extends React.Component {
  render() {
    return (
      <RegisterWrapper>
        <StyledDiv>
          <StyledBrandLogo src={logoLight} alt="REITScreener" />
          <Card>
            <Row className="root-row" type="flex">
              <Col xs={24} className="root-col">
                <Title level={3}>Start with your free REITScreener account</Title>
              </Col>
              <Col xs={24} className="root-col">
                <RegistrationForm />
                <Paragraph>
                  By registering you agree with the<br/>
                  <Link to="/terms-and-conditions">Terms and Conditions</Link>
                </Paragraph>
                <Paragraph>
                  Already have an account? <Link to="/login">Sign in</Link>
                </Paragraph>
              </Col>
            </Row>
          </Card>
        </StyledDiv>
      </RegisterWrapper>
    );
  }
}

export default Login;
