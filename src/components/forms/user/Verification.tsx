import React from 'react';
import { Formik, Form, FormikProps } from 'formik';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';
import { Row, Col, Button, Alert, Typography, message } from 'antd';
import ReactCodeInput from '@m3-moretv/react-code-input';

import { VerificationSchema } from './validations';
import { hasValidObjectValues } from '../../../utils/objectUtils';
import { VERIFY_ONBOARDING_CODE, SEND_ONBOARDING_CODE } from '../../../apollo/mutations/user';
import { ACCOUNT } from '../../../apollo/queries/user';

const { Paragraph } = Typography;

interface IVerificationProps {
  userToken: string,
  verifyOnboardingCode: any,
  sendOnboardingCode: any,
}

interface IVerificationStates {
  error: string | null,
  verifying: boolean,
  resending: boolean,
  user: {
    code: string,
  },
}

const StyledRow = styled(Row)`
  flex-direction: column !important;
  .ant-col {
    align-self: center;
  }
`;

const StyledReactCodeInput = styled(ReactCodeInput)`
  margin-bottom: 24px;
  justify-content: space-between;
  display: flex;
  input {
    font-family: monospace;
    -moz-appearance: textfield;
    border-radius: 4px;
    border: 1px solid;
    margin: 4px;
    width: 50px;
    height: 65px;
    font-size: 32px;
    box-sizing: border-box;
    color: black;
    background-color: white;
    border-color: lightgrey;
    text-align: center;
  }
`;

class Verification extends React.Component<IVerificationProps, IVerificationStates> {
  constructor(props: IVerificationProps) {
    super(props);
    this.state = {
      error: null,
      verifying: false,
      resending: false,
      user: {
        code: '',
      },
    };
    this.onVerify = this.onVerify.bind(this);
    this.onCodeResend = this.onCodeResend.bind(this);
    this.onErrorClose = this.onErrorClose.bind(this);
  }

  async onVerify({ code }: { code: string }) {
    const { verifyOnboardingCode, userToken } = this.props;
    this.setState({ verifying: true });
    await verifyOnboardingCode({
      variables: { token: userToken, code },
      refetchQueries: [{
        query: ACCOUNT,
        variables: { token: userToken },
      }],
    }).catch((error: any) => {
      const { message: errorMessage } = error.graphQLErrors[0];
      this.setState({ verifying: false, error: errorMessage });
    });
  }

  async onCodeResend() {
    const { sendOnboardingCode, userToken } = this.props;
    this.setState({ resending: true });
    await sendOnboardingCode({
      variables: { token: userToken },
    }).then(() => {
      this.setState({ resending: false });
      message.success('Code resent to your email', 3);
    })
    .catch((error: any) => {
      const { message: errorMessage } = error.graphQLErrors[0];
      this.setState({ resending: false, error: errorMessage });
    });
  }

  onErrorClose() {
    this.setState({ error: null });
  }

  render() {
    const { user, error: serverError } = this.state;
    const { verifying, resending } = this.state;
    return (
      <>
        <Formik
          initialValues={user}
          validationSchema={VerificationSchema}
          onSubmit={(values) => {
            this.onVerify(values);
          }}
          render={({ errors, values, setFieldValue, touched }: FormikProps<{ code: string }>) => {
            const errorMessage = (touched.code ? errors.code : null) || serverError;
            return (
              <Form>
                <StyledRow type="flex">
                  {errorMessage && (
                    <Col xs={24} sm={15} lg={10}>
                      <Alert
                        message={errorMessage}
                        type="error"
                        closable
                        onClose={this.onErrorClose}
                        className="mb-4"
                      />
                    </Col>
                  )}
                  <Col xs={24} sm={15} lg={10}>
                    <StyledReactCodeInput
                      autoFocus
                      fields={6}
                      value={values.code}
                      onChange={(val) => setFieldValue('code', val)}
                      name="code"
                    />
                  </Col>
                  <Col xs={24} sm={15} lg={10}>
                    <Button
                      block
                      type="primary"
                      htmlType="submit"
                      size="large"
                      className="mb-4"
                      loading={verifying}
                      disabled={
                        (hasValidObjectValues(errors) && !!touched.code) || resending || verifying
                      }
                    >
                      Verify email
                    </Button>
                  </Col>
                </StyledRow>
              </Form>
            );
          }}
        />
        <Paragraph>
          Code takes around 1 to 5 minutes to arrive<br/>
          If it doesn't arrive please check your spam folder<br/>
          If there's still no code let's<br/>
        </Paragraph>
        <Button
          icon="reload"
          className="d-block my-0 mx-auto"
          onClick={this.onCodeResend}
          disabled={verifying || resending}
          loading={resending}
        >
          Resend
        </Button>
      </>
    );
  }
}

export default compose(
  graphql(SEND_ONBOARDING_CODE, { name: 'sendOnboardingCode' }),
  graphql(VERIFY_ONBOARDING_CODE, { name: 'verifyOnboardingCode' }),
)(Verification);
