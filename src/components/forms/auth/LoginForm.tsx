import React from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field, FormikProps } from 'formik';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Form as AntdForm, Icon, Button, Alert, message } from 'antd';

import { LoginSchema } from '../validations';
import { AntInput } from '../../AntDesignFields';
import { setAuthToken } from '../../../utils/authUtils';
import { hasValidObjectValues } from '../../../utils/objectUtils';
import { CREATE_ACCESS_TOKEN } from '../../../apollo/mutations/user';

interface ILoginFormState {
  isLoading: boolean,
  error: string | null,
  user: {
    username: string,
    password: string,
  },
}

const StyledIcon = styled(Icon)`
  color: 'rgba(0, 0, 0, .25)';
`;

class LoginForm extends React.Component<RouteComponentProps, ILoginFormState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
      user: {
        username: '',
        password: '',
      },
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onErrorClose = this.onErrorClose.bind(this);
  }

  async onSubmit(values: any, loginMutation: any) {
    const { history } = this.props;
    this.setState({ isLoading: true });
    await loginMutation({
      variables: {
        input: values,
      },
    })
    .then(({ data }: any) => {
      const { token } = data.createAccessToken;
      setAuthToken(token);
      this.setState({ isLoading: false });
      message.success('Login success', 1);
      history.replace('/');
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
        <Mutation<any> mutation={CREATE_ACCESS_TOKEN}>
          {(loginMutation) => {
            return (
              <Formik
                initialValues={user}
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                  this.onSubmit(values, loginMutation);
                }}
                render={({ submitCount, errors }: FormikProps<any>) => {
                  return (
                    <Form>
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
                          Sign in
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

export default withRouter(LoginForm);
