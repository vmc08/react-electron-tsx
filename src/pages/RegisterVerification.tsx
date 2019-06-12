import React from 'react';
import styled from 'styled-components';
import { Row, Col, Typography } from 'antd';

import AccountVerifier from '../HOC/AccountVerifier';
import Verification from '../components/forms/user/Verification';
import UserContext from '../contexts/UserContext';

const { Title, Text } = Typography;

const RegisterVerificationWrapper = styled.div`
  height: 100vh;
  display: flex;
  padding-top: 24px;
  align-items: flex-start;
  justify-content: center;
  .root-row {
    .root-col {
      padding: 24px;
      &:last-of-type {
        padding: 0;
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
    }
  }
`;

const StyledDiv = styled.div`
  padding: 24px 12px;
`;

class RegisterVerification extends React.Component {
  render() {
    const { account, token } = this.context;
    const { username } = account;
    return (
      <RegisterVerificationWrapper>
        <StyledDiv>
          <Row className="root-row" type="flex">
            <Col xs={24} className="root-col">
              <Title level={3}>Verify your email</Title>
              <Title level={4}>
                Enter 6-digit code sent to&nbsp;
                <Text strong><i>{username}</i></Text><br/>
                to get your results.
              </Title>
            </Col>
            <Col xs={24} className="root-col">
              <Verification userToken={token} />
            </Col>
          </Row>
        </StyledDiv>
      </RegisterVerificationWrapper>
    );
  }
}

RegisterVerification.contextType = UserContext;

export default AccountVerifier(RegisterVerification, true);
