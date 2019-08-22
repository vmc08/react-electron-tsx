import React from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const verificationPath = '/register/verify-email';
const quizPath = '/register/quiz';
const welcomePath = '/register/welcome';

export default <P extends object>(
  ComposedComponent: React.ComponentType<P>,
  blockAuthenticatedUser: boolean = false,
) => {
  class AccountVerifier extends React.Component<P> {
    static contextType = UserContext;
    render() {
      const { account, token } = this.context;
      const { pathname } = window.location;
      if (account && token) {
        const { onboarded, verified } = account;
        if ((!verified && !onboarded) && pathname !== verificationPath) {
          return <Redirect to={verificationPath} />;
        }
        if ((verified && !onboarded) && !pathname.includes(quizPath)) {
          return <Redirect to={quizPath} />;
        }
        if (blockAuthenticatedUser && onboarded && verified && pathname !== welcomePath) {
          return <Redirect to={welcomePath} />;
        }
      }
      return (
        <ComposedComponent {...this.props as P} />
      );
    }
  }
  return AccountVerifier;
};
