import React, { createContext } from 'react';

const UserContext = createContext({});

class UserProvider extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      account: null,
      token: null,
    };
  }

  componentDidMount() {
    console.log(this.props.value.account);
  }

  render() {
    const { account, token } = this.props.value;
    console.log(account);
    return (
      <UserContext.Provider value={{ account, token }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };
