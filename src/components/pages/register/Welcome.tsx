import React from 'react';
import AccountVerifier from '../../../HOC/AccountVerifier';

const Welcome = () => (
  <div>
    Welcome Page
  </div>
);

export default AccountVerifier(Welcome, true);
