import React from 'react';
import styled from 'styled-components';
import { Mutation, withApollo, WithApolloClient } from 'react-apollo';
import { Formik, Form, Field, FormikProps } from 'formik';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Form as AntdForm, Icon, Button, Alert, Row, Col } from 'antd';

import { SignupSchema } from './validation';
import { AntInput } from 'components/AntDesignFields';
import { hasValidObjectValues } from 'utils/objectUtils';
import { setAuthToken, setRefreshToken } from 'utils/userUtils';
import { CREATE_ACCOUNT, SEND_ONBOARDING_CODE } from 'apollo/mutations/user';

interface IRegistrationFormProps extends RouteComponentProps {
  affiliateId: string | null,
}

interface IUser {
  firstname: string,
  lastname: string,
  username: string,
  password: string,
}

interface IRegistrationFormState {
  isLoading: boolean,
  error: string | null,
  user: IUser,
}

interface ICreateAccountResult {
  data: {
    createAccount: {
      accessToken: string,
      refreshToken: string,
    },
  }
}

const StyledIcon = styled(Icon)`
  color: 'rgba(0, 0, 0, .25)';
`;

class RegistrationForm extends React.Component<
  WithApolloClient<IRegistrationFormProps>, IRegistrationFormState
> {
  constructor(props: WithApolloClient<IRegistrationFormProps>) {
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

  async onSubmit(values: IUser, createAccountMutation: any) {
    const { history, affiliateId, client } = this.props;
    this.setState({ isLoading: true });
    await createAccountMutation({
      variables: {
        input: values,
        affiliateId,
      },
    })
    .then(async ({ data }: ICreateAccountResult) => {
      const { createAccount } = data;
      const { accessToken, refreshToken } = createAccount;
      setAuthToken(accessToken);
      setRefreshToken(refreshToken);
      await client.mutate({
        mutation: SEND_ONBOARDING_CODE,
        variables: { token: accessToken },
      });
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
                onSubmit={(values: IUser) => {
                  this.onSubmit(values, createAccountMutation);
                }}
                render={({ submitCount, errors }: FormikProps<{}>) => {
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

export default withRouter(
  withApollo<WithApolloClient<IRegistrationFormProps>>(RegistrationForm),
);
