import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field, FormikProps } from 'formik';
import { Form as AntdForm, Icon, Input, Checkbox, Button } from 'antd';
import { hasValidObjectValues } from '../../../utils/objectUtils';
import { setAuthToken } from '../../../utils/authUtils';
import { CREATE_ACCESS_TOKEN } from '../../../apollo/mutations/user';
import { AntInput } from '../../AntDesignFields';
import { LoginSchema } from '../validations';

interface ILoginFormState {
  isLoading: boolean,
  user: {
    username: string,
    password: string,
  }
}

const StyledIcon = styled(Icon)`
  color: 'rgba(0,0,0,.25)';
`;

class LoginForm extends React.Component<RouteComponentProps, ILoginFormState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      isLoading: false,
      user: {
        username: '',
        password: '',
      },
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(values: any, loginMutation: any) {
    const { history } = this.props;
    const { remember, ...rest } = values;
    this.setState({ isLoading: true });
    await loginMutation({
      variables: {
        input: rest,
      },
    })
    .then(({ data }: any) => {
      const { token } = data.createAccessToken;
      setAuthToken(token);
      this.setState({ isLoading: false });
      history.replace('/');
    })
    .catch((error: any) => {
      console.log(error.graphQLErrors);
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { isLoading, user } = this.state;
    return (
      <Mutation<any> mutation={CREATE_ACCESS_TOKEN}>
        {(loginMutation) => {
          return (
            <Formik
              initialValues={user}
              validationSchema={LoginSchema}
              onSubmit={(values) => {
                this.onSubmit(values, loginMutation);
              }}
              render={({ submitCount, errors, setFieldValue }: FormikProps<any>) => {
                return (
                  <Form>
                    <Field
                      component={AntInput}
                      name="username"
                      type="email"
                      placeholder="Username"
                      disabled={isLoading}
                      submitCount={submitCount}
                      prefix={<StyledIcon type="user" />}
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
                      <Checkbox
                        disabled={isLoading}
                        name="remember"
                        onChange={(e) => setFieldValue('remember', e.target.checked)}
                      >
                        Remember me
                      </Checkbox>
                      <Link className="float-right" to="/">
                        Forgot password
                      </Link>
                      <Button
                        block
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                        disabled={isLoading || hasValidObjectValues(errors)}
                      >
                        Log in
                      </Button>
                    </AntdForm.Item>
                  </Form>
                );
              }}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(LoginForm);
