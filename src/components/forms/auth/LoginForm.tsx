import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import { Form, Icon, Input, Checkbox, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { hasValidObjectValues } from '../../../utils/objectUtils';
import { setAuthToken } from '../../../utils/authUtils';
import { CREATE_ACCESS_TOKEN } from '../../../apollo/mutations/user';

interface ILoginFormState {
  isLoading: boolean,
}

const StyledIcon = styled(Icon)`
  color: 'rgba(0,0,0,.25)';
`;

class LoginForm extends React.Component<FormComponentProps & RouteComponentProps, ILoginFormState> {
  constructor(props: FormComponentProps & RouteComponentProps) {
    super(props);
    this.state = {
      isLoading: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { validateFields } = this.props.form;
    validateFields();
  }

  async onSubmit(loginMutation: any) {
    const { form: { getFieldsValue }, history } = this.props;
    const { remember, ...rest } = getFieldsValue();
    this.setState({ isLoading: true });
    await loginMutation({
      variables: {
        input: rest,
      },
    })
    .then(({ data }: any) => {
      const { token } = data.createAccessToken;
      setAuthToken(token);
      history.replace('/');
      this.setState({ isLoading: false });
    })
    .catch((error: any) => {
      console.log(error.graphQLErrors);
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { isLoading } = this.state;
    const { getFieldDecorator, getFieldsError, isFieldTouched, getFieldError } = this.props.form;
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Mutation mutation={CREATE_ACCESS_TOKEN}>
        {(loginMutation: any) => {
          return (
            <Form
              onSubmit={(e: React.FormEvent<HTMLButtonElement>) => {
                e.preventDefault();
                this.onSubmit(loginMutation);
              }}
            >
              <Form.Item
                validateStatus={usernameError ? 'error' : ''}
                help={usernameError || ''}
              >
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Username is required!' }],
                })(
                  <Input
                    prefix={<StyledIcon type="mail" />}
                    placeholder="Username"
                    type="email"
                    disabled={isLoading}
                  />,
                )}
              </Form.Item>
              <Form.Item
                validateStatus={passwordError ? 'error' : ''}
                help={passwordError || ''}
              >
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Password can\'t be empty!' }],
                })(
                  <Input.Password
                    prefix={<StyledIcon type="lock" />}
                    placeholder="Password"
                    disabled={isLoading}
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  initialValue: true,
                  valuePropName: 'checked',
                })(<Checkbox>Remember me</Checkbox>)}
                <Link className="float-right" to="/">
                  Forgot password
                </Link>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  disabled={isLoading || hasValidObjectValues(getFieldsError())}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

const AntdLoginForm = Form.create({ name: 'login_form' })(LoginForm);

export default withRouter<any>(AntdLoginForm);
