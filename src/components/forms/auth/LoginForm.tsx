import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import { Form, Icon, Input, Checkbox, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { hasValidObjectValues } from '../../../utils/objectUtils';

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
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { validateFields } = this.props.form;
    validateFields();
  }

  onSubmit(e: React.FormEvent<HTMLButtonElement>): void {
    e.preventDefault();
    const {getFieldsValue } = this.props.form;
    this.setState({ isLoading: true });
    console.log(getFieldsValue());
  }

  render() {
    const { isLoading } = this.state;
    const { getFieldDecorator, getFieldsError, isFieldTouched, getFieldError } = this.props.form;
    const emailError = isFieldTouched('email') && getFieldError('email');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Item
          validateStatus={emailError ? 'error' : ''}
          help={emailError || ''}
        >
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Email is required!' }],
          })(
            <Input
              prefix={<StyledIcon type="mail" />}
              placeholder="Email"
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
  }
}

export default Form.create({ name: 'login_form' })(LoginForm);
