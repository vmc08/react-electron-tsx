import React from 'react';
import { Query } from 'react-apollo';
import { isLoggedIn, getAuthToken } from '../utils/authUtils';
import { ACCOUNT } from '../apollo/queries/user';
import { IAccount } from '../apollo/types/graphql-types';

interface IRequireAuthProps {
  history: {
    replace: (location: string) => void,
  },
}

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
  class RequireAuth extends React.Component<P & IRequireAuthProps> {
    constructor(props: P & IRequireAuthProps) {
      super(props);
      // this.redirectToHome = this.redirectToHome.bind(this);
      // this.redirectToLogin = this.redirectToLogin.bind(this);
    }

    // componentWillMount() {
    //   requireAuth ? this.redirectToLogin() : this.redirectToHome();
    // }

    // componentWillUpdate() {
    //   requireAuth ? this.redirectToLogin() : this.redirectToHome();
    // }

    // redirectToHome() {
    //   if (isLoggedIn()) {
    //     const { history } = this.props;
    //     history.replace('/');
    //   }
    // }

    // redirectToLogin() {
    //   if (!isLoggedIn()) {
    //     const { history } = this.props;
    //     history.replace('/login');
    //   }
    // }

    render() {
      const token = getAuthToken();
      const skipAuth = !isLoggedIn() || !requireAuth;
      return (
        <Query<IQueryData, IQueryVariables>
          query={ACCOUNT}
          variables={{ token }}
          skip={skipAuth}
        >
          {({ loading, data, error }) => {
            if (!skipAuth) {
              if (data) {
                const { account } = data;
                console.log(account);
              }
            }
            return (
              <ComposedComponent {...this.props as P} />
            );
          }}
        </Query>
      );
    }
  }

  return RequireAuth;
};
