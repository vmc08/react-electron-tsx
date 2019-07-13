import React from 'react';
import styled from 'styled-components';
import FlagIconFactory from 'react-flag-icon-css';

const FlagIcon = FlagIconFactory(React, { useCssModules: false });

export default styled(FlagIcon)`
  border: 1px solid #e8e8e8;
`;
