import React, { ReactNode } from 'react';
import { Query, graphql, compose } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Card, Row, Col, Typography } from 'antd';

import RegistrationForm from '../components/forms/user/RegistrationForm';
import PageSpinner from '../components/spinners/PageSpinner';
import AccountVerifier from '../HOC/AccountVerifier';
import logoLight from '../assets/images/logo-light.png';
import { AFFILIATE } from '../apollo/queries/affiliate';
import { SEND_ONBOARDING_CODE } from '../apollo/mutations/user';

const { Title, Paragraph } = Typography;

interface IRegisterProps extends RouteComponentProps<any> {
  affiliateId: string,
  sendOnboardingCode: any,
}

interface IQueryVariables {
  affiliateId: string,
}

interface IQueryData {
  affiliate: {
    affiliateId: string,
    plan: string,
    period: number,
    years: number,
    discount: number,
  },
}

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

class Login extends React.Component<IRegisterProps> {
  constructor(props: IRegisterProps) {
    super(props);
  }

  render() {
    const { match: { params }, sendOnboardingCode } = this.props;
    const { affiliateId } = params;
    let affiliatePlan: string | ReactNode | undefined;

    return (
      <Query<IQueryData, IQueryVariables>
        query={AFFILIATE}
        variables={{ affiliateId }}
        skip={!affiliateId}
      >
        {({ loading, data, error }) => {
          if (error) {
            return <Redirect to="/login?error=affiliateId" />;
          }
          if (data && !loading) {
            const { affiliate: { plan } } = data;
            affiliatePlan = <span style={{ textTransform: 'capitalize' }}>{plan} Trial</span>;
          }
          const titleText = (affiliateId && affiliatePlan) || loading ?
            affiliatePlan : 'Start with your free REITScreener account';
          return (
            <PageSpinner loading={loading}>
              <RegisterWrapper>
                <StyledDiv>
                  <StyledBrandLogo draggable={false} src={logoLight} alt="REITScreener" />
                  <Card>
                    <Row className="root-row" type="flex">
                      <Col xs={24} className="root-col">
                        <Title level={3}>{titleText}</Title>
                      </Col>
                      <Col xs={24} className="root-col">
                        <RegistrationForm
                          affiliateId={affiliateId}
                          sendOnboardingCode={sendOnboardingCode}
                        />
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
            </PageSpinner>
          );
        }}
      </Query>
    );
  }
}

export default compose(
  graphql(SEND_ONBOARDING_CODE, { name: 'sendOnboardingCode' }),
)(AccountVerifier(Login, true));
