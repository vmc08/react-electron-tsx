import React from 'react';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import { isLoggedIn, getAuthToken } from '../utils/authUtils';
import { ACCOUNT } from '../apollo/queries/user';
import { IAccount } from '../apollo/types/graphql-types';

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
        history.replace('/');
      }
    }

    redirectToLogin() {
      if (!isLoggedIn()) {
        const { history } = this.props;
        history.replace('/login');
      }
    }

    render() {
      const token = getAuthToken();
      const skipAuth = !isLoggedIn();
      return (
        <Query<IQueryData, IQueryVariables>
          query={ACCOUNT}
          variables={{ token }}
          skip={skipAuth}
        >
          {({ loading, data, error }) => {
            if (loading) {
              return <p>Loading component here</p>;
            }
            if (error) {
              return <>
                <p>Error component here</p>
                <pre>{error.graphQLErrors[0].message}</pre>
              </>;
            }
            if (data) {
              const { account } = data;
              const newProps = {...this.props, account, token};
              return (
                <ComposedComponent {...newProps as P} />
              );
            }
          }}
        </Query>
      );
    }
  }
  return RequireAuth;
};
