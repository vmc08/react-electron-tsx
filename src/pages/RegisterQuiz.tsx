import React from 'react';

import AccountVerifier from '../HOC/AccountVerifier';

class RegisterQuiz extends React.Component {
  render() {
    return (
      <div>Start quiz here</div>
    );
  }
}

export default AccountVerifier(RegisterQuiz, true);
