import React, { createContext } from 'react';

interface IUserContextState {
  account: any,
  token: string | null | undefined
}

const UserContext = createContext({});

class UserProvider extends React.Component<{}, IUserContextState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      account: null,
      token: null,
    };
    this.setUserValues = this.setUserValues.bind(this);
  }

  setUserValues(userValues: IUserContextState) {
    const { account: accountState } = this.state;
    if (!accountState) {
      this.setState(userValues);
    }
  }

  render() {
    const { setUserValues, state } = this;
    return (
      <UserContext.Provider value={{ ...state, setUserValues }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
};

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };

export default UserContext;
