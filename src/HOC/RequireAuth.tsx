import React from 'react';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import { isLoggedIn, getAuthToken } from 'utils/userUtils';
import { ACCOUNT } from 'apollo/queries/user';
import { IAccount } from 'apollo/types/graphql-types';

import { UserProvider } from 'contexts/UserContext';
import PageSpinner from 'components/PageSpinner';

const redirectToDashboardPaths = [
  '/login',
  '/password-reset',
  '/account/password/reset',
];

interface IQueryVariables {
  token: string
}

interface IQueryData {
  account: IAccount
}

export default <P extends object>(
  ComposedComponent: React.ComponentType<P>,
  requireAuth = true,
) => {
  class RequireAuth extends React.Component<P & RouteComponentProps> {
    constructor(props: P & RouteComponentProps) {
      super(props);
      this.redirectToHome = this.redirectToHome.bind(this);
      this.redirectToLogin = this.redirectToLogin.bind(this);
    }

    componentDidMount() {
      requireAuth ? this.redirectToLogin() : this.redirectToHome();
    }

    redirectToHome() {
      if (isLoggedIn()) {
        const { history } = this.props;
        const { pathname } = window.location;
        if (redirectToDashboardPaths.includes(pathname)) {
          history.replace('/');
        }
      }
    }

    redirectToLogin() {
      if (!isLoggedIn()) {
        const { history } = this.props;
        history.replace('/login');
      }
    }

    render() {
      let newProps = { ...this.props, requireAuth };
      const token = getAuthToken();
      const skipAuth = !isLoggedIn();
      return (
        <Query<IQueryData, IQueryVariables>
          query={ACCOUNT}
          variables={{ token }}
          skip={skipAuth}
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
              newProps = {
                ...this.props,
                requireAuth, account, token,
                authenticated: !!(account && token),
              };
            }
            return (
              <UserProvider value={newProps}>
                <PageSpinner loading={loading}>
                  {!loading && <ComposedComponent {...newProps as P} />}
                </PageSpinner>
              </UserProvider>
            );
        }}
        </Query>
      );
    }
  }
  return RequireAuth;
};
