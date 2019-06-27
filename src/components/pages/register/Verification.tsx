import React from 'react';
import styled from 'styled-components';
import { Row, Col, Typography } from 'antd';

import AccountVerifier from '../../../HOC/AccountVerifier';
import VerificationForm from '../../forms/user/Verification';
import UserContext from '../../../contexts/UserContext';

const { Title, Text } = Typography;

const VerificationWrapper = styled.div`
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

class Verification extends React.Component {
  render() {
    const { account, token } = this.context;
    const { username } = account || { username: null };
    return (
      <VerificationWrapper>
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
              <VerificationForm userToken={token} />
            </Col>
          </Row>
        </StyledDiv>
      </VerificationWrapper>
    );
  }
}

Verification.contextType = UserContext;

export default AccountVerifier(Verification, true);
