import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Typography } from 'antd';

import NewPasswordForm from './components/NewPasswordForm';

const { Title, Paragraph } = Typography;

const LOGO_LIGHT = '/assets/images/logo-light.png';
const KEY_IMAGE = '/assets/images/key.png';

interface INewPasswordState {
  doneReset: boolean,
}

const NewPasswordWrapper = styled.div`
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
          &.max-padding {
            padding: 48px;
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

const StyledEmailImg = styled.img`
  width: 128px;
  margin: 0 auto;
  display: block;
  margin-bottom: 24px;
`;

const StyledDiv = styled.div`
  padding: 24px 12px;
`;

class NewPassword extends React.Component<{}, INewPasswordState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      doneReset: false,
    };
    this.doneResetPassswordCallback = this.doneResetPassswordCallback.bind(this);
  }

  doneResetPassswordCallback(resetStatus: boolean) {
    this.setState({ doneReset: resetStatus });
  }

  render() {
    const { doneReset } = this.state;
    const titleText = doneReset ? 'Password has been changed' : 'Reset your password';
    const paragraphElement = doneReset ? (
      <Paragraph strong>
        <Link to="/login">Go back to signin</Link>
      </Paragraph>
    ) : null;

    const doneResetClass = cx({
      'root-col': true,
      'max-padding': doneReset,
    });

    return (
      <NewPasswordWrapper>
        <StyledDiv>
          <StyledBrandLogo draggable={false} src={LOGO_LIGHT} alt="REITScreener" />
          <Card>
            <Row className="root-row" type="flex">
              <Col xs={24} className={doneResetClass}>
                {doneReset && (
                  <StyledEmailImg src={KEY_IMAGE} alt="Password changed" />
                )}
                <Title level={3}>{titleText}</Title>
                {paragraphElement}
              </Col>
              {!doneReset && (
                <Col xs={24} className="root-col">
                  <NewPasswordForm doneResetPassswordCallback={this.doneResetPassswordCallback} />
                  <Paragraph>
                    Remember your password? <Link to="/login">Sign in here</Link>
                  </Paragraph>
                </Col>
              )}
            </Row>
          </Card>
        </StyledDiv>
      </NewPasswordWrapper>
    );
  }
}

export default NewPassword;
