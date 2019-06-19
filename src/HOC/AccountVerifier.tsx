import React from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const verificationPath = '/register/verify-email';
const quizPath = '/register/quiz';

export default <P extends object>(
  ComposedComponent: React.ComponentType<P>,
  blockAuthenticatedUser: boolean = false,
) => {
  class AccountVerifier extends React.Component<P> {
    static contextType = UserContext;
    render() {
      const { account, token }: any = this.context;
      const { pathname } = window.location;
      if (account && token) {
        const { scored, verified } = account;
        if ((!verified && !scored) && pathname !== verificationPath) {
          return <Redirect to={verificationPath} />;
        }
        if ((verified && !scored) && !pathname.includes(quizPath)) {
          return <Redirect to={quizPath} />;
        }
        if (blockAuthenticatedUser && scored && verified) {
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
