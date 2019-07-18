import React from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field, FormikProps } from 'formik';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Form as AntdForm, Icon, Button, Alert, Row, Col } from 'antd';

import { SignupSchema } from './validations';
import { AntInput } from '../../AntDesignFields';
import { hasValidObjectValues } from '../../../utils/objectUtils';
import { setAuthToken } from '../../../utils/userUtils';
import { CREATE_ACCOUNT } from '../../../apollo/mutations/user';

interface IRegistrationFormProps extends RouteComponentProps {
  affiliateId: string | null,
  sendOnboardingCode: any,
}

interface IRegistrationFormState {
  isLoading: boolean,
  error: string | null,
  user: {
    firstname: string,
    lastname: string,
    username: string,
    password: string,
  },
}

const StyledIcon = styled(Icon)`
  color: 'rgba(0, 0, 0, .25)';
`;

class RegistrationForm extends React.Component<IRegistrationFormProps, IRegistrationFormState> {
  constructor(props: IRegistrationFormProps) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
      user: {
        firstname: '',
        lastname: '',
        username: '',
        password: '',
      },
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onErrorClose = this.onErrorClose.bind(this);
  }

  async onSubmit(values: any, createAccountMutation: any) {
    const { history, affiliateId, sendOnboardingCode } = this.props;
    this.setState({ isLoading: true });
    await createAccountMutation({
      variables: {
        input: values,
        affiliateId,
      },
    })
    .then(async ({ data }: any) => {
      const { createAccount } = data;
      const { token: userToken } = createAccount;
      setAuthToken(userToken);
      await sendOnboardingCode({ variables: { token: userToken } });
      this.setState({ isLoading: false });
      history.replace('/register/verify-email');
    })
    .catch((error: any) => {
      const { message: errorMessage } = error.graphQLErrors[0];
      this.setState({ isLoading: false, error: errorMessage });
    });
  }

  onErrorClose() {
    this.setState({ error: null });
  }

  render() {
    const { isLoading, user, error: serverError } = this.state;
    return (
      <>
        {serverError && (
          <AntdForm.Item>
            <Alert
              message={serverError}
              type="error"
              closable
              onClose={this.onErrorClose}
            />
          </AntdForm.Item>
        )}
        <Mutation<any> mutation={CREATE_ACCOUNT}>
          {(createAccountMutation) => {
            return (
              <Formik
                initialValues={user}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                  this.onSubmit(values, createAccountMutation);
                }}
                render={({ submitCount, errors }: FormikProps<any>) => {
                  return (
                    <Form>
                      <Row gutter={24}>
                        <Col xs={24} md={12}>
                          <Field
                            component={AntInput}
                            name="firstname"
                            type="text"
                            placeholder="First name"
                            disabled={isLoading}
                            submitCount={submitCount}
                          />
                        </Col>
                        <Col xs={24} md={12}>
                          <Field
                            component={AntInput}
                            name="lastname"
                            type="text"
                            placeholder="Last name"
                            disabled={isLoading}
                            submitCount={submitCount}
                          />
                        </Col>
                      </Row>
                      <Field
                        component={AntInput}
                        name="username"
                        type="email"
                        placeholder="Email address"
                        disabled={isLoading}
                        submitCount={submitCount}
                        prefix={<StyledIcon type="mail" />}
                      />
                      <Field
                        component={AntInput}
                        name="password"
                        type="password"
                        placeholder="Password"
                        disabled={isLoading}
                        submitCount={submitCount}
                        prefix={<StyledIcon type="lock" />}
                      />
                      <AntdForm.Item>
                        <Button
                          block
                          type="primary"
                          htmlType="submit"
                          size="large"
                          loading={isLoading}
                          disabled={isLoading || hasValidObjectValues(errors)}
                        >
                          Register
                        </Button>
                      </AntdForm.Item>
                    </Form>
                  );
                }}
              />
            );
          }}
        </Mutation>
      </>
    );
  }
}

export default withRouter(RegistrationForm);
