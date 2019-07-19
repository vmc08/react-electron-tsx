import React, { createContext, useContext } from 'react';

interface IUserContext {
  account: object | null,
  token: string | null,
  authenticated: boolean,
}

const UserContext = createContext<IUserContext>({
  account: null,
  token: null,
  authenticated: false,
});

class UserProvider extends React.Component<{ value: any }> {
  render() {
    const { value: { account, token, authenticated } } = this.props;
    return (
      <UserContext.Provider value={{ account, token, authenticated }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

const UserConsumer = UserContext.Consumer;

const useUserContextValue = () => useContext(UserContext);

export { UserProvider, UserConsumer, useUserContextValue };

export default UserContext;
