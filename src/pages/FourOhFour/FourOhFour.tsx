import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

const StyledWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class FourOhFour extends React.Component {
  render() {
    return (
      <StyledWrapper>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={(
            <Link to="/">
              <Button type="primary">Go back to REITScreener</Button>
            </Link>
          )}
        />
      </StyledWrapper>
    );
  }
}

export default FourOhFour;
