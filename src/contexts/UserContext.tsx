import React, { createContext, useContext } from 'react';

const UserContext = createContext({});

class UserProvider extends React.Component<{ value: any }> {
  render() {
    const { value: { account, token } } = this.props;
    return (
      <UserContext.Provider value={{ account, token }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

const UserConsumer = UserContext.Consumer;

const useUserContextValue = () => useContext(UserContext);

export { UserProvider, UserConsumer, useUserContextValue };

export default UserContext;
