import React from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field, FormikProps } from 'formik';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Form as AntdForm, Icon, Button, Alert, message } from 'antd';

import { PasswordResetSchema } from './validations';
import { AntInput } from '../../AntDesignFields';
import { hasValidObjectValues } from '../../../utils/objectUtils';
import { REQUEST_RESET_PASSWORD } from '../../../apollo/mutations/user';

interface IPasswordResetFormState {
  isLoading: boolean,
  error: string | null,
  user: {
    username: string,
  },
}

interface IPasswordResetProps extends RouteComponentProps {
  resetPassswordCallback: (emailStatus: boolean) => void,
}

const StyledIcon = styled(Icon)`
  color: 'rgba(0, 0, 0, .25)';
`;

class PasswordResetForm extends React.Component<IPasswordResetProps, IPasswordResetFormState> {
  constructor(props: IPasswordResetProps) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
      user: {
        username: '',
      },
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onErrorClose = this.onErrorClose.bind(this);
  }

  async onSubmit(values: any, resetPasswordMutation: any) {
    const { resetPassswordCallback } = this.props;
    this.setState({ isLoading: true });
    await resetPasswordMutation({
      variables: {
        input: values,
      },
    })
    .then(({ data }: any) => {
      const { requestResetPassword } = data;
      this.setState({ isLoading: false });
      if (requestResetPassword) {
        message.success('Reset link has been sent to your email');
      } else {
        message.error('Something went wrong upon processing reset email');
      }
      resetPassswordCallback(requestResetPassword);
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
        <Mutation<any> mutation={REQUEST_RESET_PASSWORD}>
          {(resetPasswordMutation) => {
            return (
              <Formik
                initialValues={user}
                validationSchema={PasswordResetSchema}
                onSubmit={(values) => {
                  this.onSubmit(values, resetPasswordMutation);
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
                      <AntdForm.Item>
                        <Button
                          block
                          type="primary"
                          htmlType="submit"
                          size="large"
                          loading={isLoading}
                          disabled={isLoading || hasValidObjectValues(errors)}
                        >
                          Send email
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

export default withRouter(PasswordResetForm);
