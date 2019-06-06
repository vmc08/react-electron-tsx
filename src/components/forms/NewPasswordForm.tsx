import React from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field, FormikProps } from 'formik';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Form as AntdForm, Icon, Button, Alert, message } from 'antd';

import { NewPasswordSchema } from './validations';
import { AntInput } from '../AntDesignFields';
import { hasValidObjectValues } from '../../utils/objectUtils';
import { RESET_PASSWORD } from '../../apollo/mutations/user';

interface INewPasswordFormState {
  isLoading: boolean,
  error: string | null,
  user: {
    password: string,
    confirmPassword: string,
  },
}

interface INewPasswordFormProps extends RouteComponentProps {
  doneResetPassswordCallback: (emailStatus: boolean) => void,
}

const StyledIcon = styled(Icon)`
  color: 'rgba(0, 0, 0, .25)';
`;

class NewPasswordForm extends React.Component<INewPasswordFormProps, INewPasswordFormState> {
  constructor(props: INewPasswordFormProps) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
      user: {
        password: '',
        confirmPassword: '',
      },
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onErrorClose = this.onErrorClose.bind(this);
  }

  async onSubmit(values: any, resetPasswordMutation: any) {
    const { password } = values;
    const { location, doneResetPassswordCallback } = this.props;
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    if (!token) {
      return this.setState({ error: 'Invalid access token' });
    }

    this.setState({ isLoading: true });
    await resetPasswordMutation({
      variables: {
        input: { password },
        token,
      },
    })
    .then(({ data }: any) => {
      const { resetPassword } = data;
      this.setState({ isLoading: false });
      if (resetPassword) {
        message.success('Password has been changed');
      } else {
        message.success('Something went wrong upon updating password');
      }
      doneResetPassswordCallback(resetPassword);
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
        <Mutation<any> mutation={RESET_PASSWORD}>
          {(resetPasswordMutation) => {
            return (
              <Formik
                initialValues={user}
                validationSchema={NewPasswordSchema}
                onSubmit={(values) => {
                  this.onSubmit(values, resetPasswordMutation);
                }}
                render={({ submitCount, errors }: FormikProps<any>) => {
                  return (
                    <Form>
                      <Field
                        component={AntInput}
                        name="password"
                        type="password"
                        placeholder="Your new password"
                        disabled={isLoading}
                        submitCount={submitCount}
                        prefix={<StyledIcon type="lock" />}
                      />
                      <Field
                        component={AntInput}
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
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
                          Reset password
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

export default withRouter(NewPasswordForm);
