import React from 'react';
import styled from 'styled-components';
import { Link, Switch, Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Typography, Button } from 'antd';

import AccountVerifier from '../../../HOC/AccountVerifier';
import QuizForm from '../../forms/user/QuizForm';
import UserContext from '../../../contexts/UserContext';
import { questions } from '../../../utils/onBoardingUtils';

const { Title } = Typography;

const QuizWrapper = styled.div`
  height: 100vh;
  .root-row {
    padding-top: 50px;
    @media only screen and (max-width: 600px) {
      padding-top: 0;
    }
    &.main {
      padding-top: 100px;
    }
    .root-col {
      padding: 24px;
      &:nth-child(2) {
        padding: 12px 24px;
      }
      h3 {
        font-weight: 700;
      }
    }
  }
`;

const StyledDiv = styled.div`
  padding: 24px 12px;
`;

const StyledButton = styled(Button)`
  min-width: 180px;
  display: block !important;
  margin: 24px auto;
  text-transform: uppercase;
`;

class Quiz extends React.Component<RouteComponentProps> {
  constructor(props: RouteComponentProps) {
    super(props);
  }

  render() {
    return (
      <QuizWrapper>
        <StyledDiv>
          <Switch>
            <Route
              exact
              path="/register/quiz"
              render={() => (
                <Row className="root-row main" type="flex">
                  <Col
                    xs={24}
                    md={{ span: 12, offset: 6 }}
                    lg={{ span: 10, offset: 7 }}
                    className="root-col"
                  >
                    <Title level={3} className="text-center">
                      Start Investing Smarter and Better
                    </Title>
                    <Title level={4}>
                      Whether you’re new to REITs or an experienced investor,&nbsp;
                      REITScreener makes it easy for you to make smarter investments.&nbsp;
                    </Title>
                    <Title level={4}>
                      Let’s get to know you better – it won’t take more than a minute&nbsp;
                      and it will help you (and us!) figure out where you are in your&nbsp;
                      investing journey and what’s your ideal next step.👍
                    </Title>
                    <StyledButton type="primary" size="large">
                      <Link to="/register/quiz/1">Let’s Go</Link>
                    </StyledButton>
                  </Col>
                </Row>
              )}
            />
            {questions.map((question, i) => (
              <Route
                key={i}
                path={`/register/quiz/${i + 1}`}
                render={() => (
                  <QuizForm
                    currentIndex={i}
                    question={question}
                  />
                )}
              />
            ))}
            <Route render={() => <Redirect to="/register/quiz" />} />
          </Switch>
        </StyledDiv>
      </QuizWrapper>
    );
  }
}

export default AccountVerifier(withRouter(Quiz), true);
