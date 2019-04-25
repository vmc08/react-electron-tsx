import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Icon, Input, Checkbox, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

interface ILoginFormState {
  isLoading: boolean,
}

const StyledIcon = styled(Icon)`
  color: 'rgba(0,0,0,.25)';
`;

class LoginForm extends React.Component<FormComponentProps, ILoginFormState> {
  constructor(props: FormComponentProps) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  render() {
    const { isLoading } = this.state;
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Email is required!' }],
          })(
            <Input
              prefix={<StyledIcon type="mail" />}
              placeholder="Email"
              type="email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Password can\'t be empty!' }],
          })(
            <Input.Password
              prefix={<StyledIcon type="lock" />}
              placeholder="Password"
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
            onClick={(e: React.FormEvent<HTMLButtonElement>) => {
              e.preventDefault();
              this.setState({ isLoading: true });
            }}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'login_form' })(LoginForm);
