import React from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

export default <P extends object>(
  ComposedComponent: React.ComponentType<P>,
  blockAuthenticatedUser: boolean = false,
) => {
  class AccountVerifier extends React.Component<P> {
    static contextType = UserContext;
    render() {
      const { account, token }: any = this.context;
      if (account && token) {
        const { scored, verified } = account;
        if (!verified) {
          return <Redirect to="/register/verify-email" />;
        }
        if (!scored) {
          return <Redirect to="/register/quiz" />;
        }
        if (blockAuthenticatedUser) {
          return <Redirect to="/" />;
        }
      }
      return (
        <ComposedComponent {...this.props as P} />
      );
    }
  }
  return AccountVerifier;
};
