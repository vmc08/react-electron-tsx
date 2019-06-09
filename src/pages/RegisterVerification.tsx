import React from 'react';

import AccountVerifier from '../HOC/AccountVerifier';

class RegisterVerification extends React.Component {
  render() {
    return (
      <div>Verify your account here</div>
    );
  }
}

export default AccountVerifier(RegisterVerification, true);
