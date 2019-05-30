import React from 'react';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import { Spin, Icon } from 'antd';
import { isLoggedIn, getAuthToken } from '../utils/authUtils';
import { ACCOUNT } from '../apollo/queries/user';
import { IAccount } from '../apollo/types/graphql-types';

import UserContext from '../contexts/UserContext';

interface IQueryVariables {
  token: string
}

interface IQueryData {
  account: IAccount
}

const LoadingIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export default <P extends object>(
  ComposedComponent: React.ComponentType<P>,
  requireAuth = true,
) => {
  class RequireAuth extends React.Component<P & RouteComponentProps> {
    constructor(props: P & RouteComponentProps) {
      super(props);
      this.setUserContext = this.setUserContext.bind(this);
      this.redirectToHome = this.redirectToHome.bind(this);
      this.redirectToLogin = this.redirectToLogin.bind(this);
    }

    componentDidMount() {
      requireAuth ? this.redirectToLogin() : this.redirectToHome();
    }

    redirectToHome() {
      if (isLoggedIn()) {
        const { history } = this.props;
        history.replace('/');
      }
    }

    redirectToLogin() {
      if (!isLoggedIn()) {
        const { history } = this.props;
        history.replace('/login');
      }
    }

    setUserContext({ account }: any) {
      const { setUserValues } = this.context;
      const token = getAuthToken();
      setUserValues({ account, token });
    }

    render() {
      let newProps = {...this.props, requireAuth};
      const token = getAuthToken();
      const skipAuth = !isLoggedIn();
      return (
        <Query<IQueryData, IQueryVariables>
          query={ACCOUNT}
          variables={{ token }}
          skip={skipAuth}
          onCompleted={this.setUserContext}
        >
          {({ loading, data, error }) => {
            if (error) {
              return <>
                <p>Error component here</p>
                <pre>{error.graphQLErrors[0].message}</pre>
              </>;
            }
            if (data) {
              const { account } = data;
              newProps = {...this.props, account, token, requireAuth};
            }
            return (
              <Spin
                size="large"
                tip="Loading..."
                indicator={LoadingIcon}
                spinning={loading}
                style={{ minHeight: 400 }}
              >
                <ComposedComponent {...newProps as P} />
              </Spin>
            );
        }}
        </Query>
      );
    }
  }

  RequireAuth.contextType = UserContext;

  return RequireAuth;
};
