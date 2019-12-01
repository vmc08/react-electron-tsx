import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Typography } from 'antd';

import PasswordResetForm from './components/PasswordResetForm';

const { Title, Paragraph } = Typography;

const LOGO_LIGHT = '/assets/images/logo-light.png';
const MAIL_SUCCESS = '/assets/images/mail-success.png';

interface IPasswordResetState {
  emailSent: boolean,
}

const PasswordResetWrapper = styled.div`
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

class PasswordReset extends React.Component<{}, IPasswordResetState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      emailSent: false,
    };
    this.resetPasswordCallback = this.resetPasswordCallback.bind(this);
  }

  resetPasswordCallback(emailStatus: boolean) {
    this.setState({ emailSent: emailStatus });
  }

  render() {
    const { emailSent } = this.state;
    const titleText = emailSent ? 'Mail sent successfully' : 'Forgot your password?';
    const paragraphElement = emailSent ? (
      <Paragraph strong>
        A link has been generated and sent to your email.<br/>
        <Link to="/login">Go back to signin</Link>
      </Paragraph>
    ) : (
      <Paragraph strong>
        Just enter the email you used to sign up and we'll send you a link to reset it.
      </Paragraph>
    );

    const emailSentClass = cx({
      'root-col': true,
      'max-padding': emailSent,
    });

    return (
      <PasswordResetWrapper>
        <StyledDiv>
          <StyledBrandLogo draggable={false} src={LOGO_LIGHT} alt="REITScreener" />
          <Card>
            <Row className="root-row" type="flex">
              <Col xs={24} className={emailSentClass}>
                {emailSent && (
                  <StyledEmailImg src={MAIL_SUCCESS} alt="Email sent" />
                )}
                <Title level={3}>{titleText}</Title>
                {paragraphElement}
              </Col>
              {!emailSent && (
                <Col xs={24} className="root-col">
                  <PasswordResetForm resetPassswordCallback={this.resetPasswordCallback} />
                  <Paragraph>
                    Remember your password? <Link to="/login">Sign in here</Link>
                  </Paragraph>
                </Col>
              )}
            </Row>
          </Card>
        </StyledDiv>
      </PasswordResetWrapper>
    );
  }
}

export default PasswordReset;
