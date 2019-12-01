import React from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field, FormikProps } from 'formik';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Form as AntdForm, Icon, Button, Alert, message } from 'antd';

import { LoginSchema } from './validation';
import { AntInput } from 'components/AntDesignFields';
import { setAuthToken, setRefreshToken } from 'utils/userUtils';
import { hasValidObjectValues } from 'utils/objectUtils';
import { CREATE_ACCESS_TOKEN } from 'apollo/mutations/user';

const redirectErrors: { [key: string]: string; } = {
  affiliateId: 'Invalid affiliate code',
};

interface ILoginFormState {
  isLoading: boolean,
  error: string | null,
  user: {
    username: string,
    password: string,
  },
}

interface ILoginMutationResponse {
  data: {
    createToken: {
      accessToken: string,
      refreshToken: string,
    },
  }
}

interface IOnSubmitValues {
  username: string,
  password: string
}

const StyledIcon = styled(Icon)`
  color: 'rgba(0, 0, 0, .25)';
`;

class LoginForm extends React.Component<RouteComponentProps, ILoginFormState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      isLoading: false,
      error: this.getRedirectError(),
      user: {
        username: '',
        password: '',
      },
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.getRedirectError = this.getRedirectError.bind(this);
    this.onErrorClose = this.onErrorClose.bind(this);
  }

  getRedirectError() {
    const { location } = this.props;
    const queryParams = new URLSearchParams(location.search);
    const errorKey = queryParams.get('error');
    if (errorKey) {
      return redirectErrors[errorKey];
    }
    return null;
  }

  async onSubmit(values: IOnSubmitValues, loginMutation: any) {
    const { history } = this.props;
    this.setState({ isLoading: true });
    await loginMutation({
      variables: {
        input: values,
      },
    })
    .then(({ data }: ILoginMutationResponse) => {
      const { accessToken, refreshToken } = data.createToken;
      setAuthToken(accessToken);
      setRefreshToken(refreshToken);
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
                render={({ submitCount, errors }: FormikProps<{}>) => {
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
