import React from 'react';
import { Query } from 'react-apollo';
import { isLoggedIn } from '../utils/authUtils';

interface IRequireAuthProps {
  history: {
    replace: (location: string) => void,
  },
}

export default <P extends object>(
  ComposedComponent: React.ComponentType<P>,
  requireAuth = true,
) => {
  class RequireAuth extends React.Component<P & IRequireAuthProps> {
    constructor(props: P & IRequireAuthProps) {
      super(props);
      this.redirectToHome = this.redirectToHome.bind(this);
      this.redirectToLogin = this.redirectToLogin.bind(this);
    }

    componentWillMount() {
      requireAuth ? this.redirectToLogin() : this.redirectToHome();
    }

    componentWillUpdate() {
      requireAuth ? this.redirectToLogin() : this.redirectToHome();
    }

    redirectToHome() {
      if (isLoggedIn()) {
        // get token and validate on server
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
      return <ComposedComponent {...this.props as P} />;
    }
  }

  return RequireAuth;
};
