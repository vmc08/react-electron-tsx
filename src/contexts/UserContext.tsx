import React, { createContext } from 'react';

const UserContext = createContext({});

const UserProvider = ({ value, children }: any) => {
  const { account, token } = value;
  return (
    <UserContext.Provider value={{ account, token }}>
      {children}
    </UserContext.Provider>
  );
};

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };

export default UserContext;
