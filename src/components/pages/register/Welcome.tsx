import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Typography, Row, Col, Button, Spin, Icon } from 'antd';

import AccountVerifier from '../../../HOC/AccountVerifier';

const { Title } = Typography;
const LoadingIcon = <Icon type="loading" style={{ fontSize: 18 }} spin />;

const WelcomeWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .root-row {
    .root-col {
      padding: 24px;
      h2 {
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

const StyledButton = styled(Button)`
  text-transform: uppercase;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  min-height: 355px;
`;

class Welcome extends React.Component<{}, { isLoading: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  render() {
    const { isLoading } = this.state;
    return (
      <WelcomeWrapper>
        <StyledDiv>
          <Row className="root-row" type="flex">
            <Col xs={24} className="root-col">
              <Title level={2}>Thanks for signing up!</Title>
            </Col>
            <Col xs={24} md={{ span: 12, offset: 6 }} className="root-col py-0">
              <Spin indicator={LoadingIcon} spinning={isLoading}>
                <StyledIframe
                  title="Welcome to Reitscreener"
                  className="vooplayer"
                  allow="autoplay"
                  allowFullScreen
                  frameBorder="0"
                  scrolling="no"
                  src="https://reitscreener.cdn.vooplayer.com/publish/ODk5NTY=?fallback=true"
                  onLoad={() => this.setState({ isLoading: false })}
                />
              </Spin>
            </Col>
            <Col xs={24} md={{ span: 10, offset: 7 }} className="root-col">
              <Link to="/training">
                <StyledButton
                  block
                  type="primary"
                  size="large"
                  className="mb-3"
                >
                  Learn how to use reitscreener
                </StyledButton>
              </Link>
              <Link to="/">
                <StyledButton
                  block
                  size="large"
                >
                  I’m ready, take me to reitscreener
                </StyledButton>
              </Link>
            </Col>
          </Row>
        </StyledDiv>
      </WelcomeWrapper>
    );
  }
}

export default AccountVerifier(Welcome, true);
