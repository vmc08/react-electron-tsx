import React from 'react';
import { withApollo, WithApolloClient } from 'react-apollo';
import styled from 'styled-components';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { Row, Col, Typography, Button, message } from 'antd';

import AccountVerifier from '../../../HOC/AccountVerifier';
import QuizForm from '../../forms/user/QuizForm';

import { questions } from '../../../utils/onBoardingUtils';
import UserContext from '../../../contexts/UserContext';
import { ACCOUNT } from '../../../apollo/queries/user';
import { ASSESS_ONBOARDING_SCORE } from '../../../apollo/mutations/user';

const { Title } = Typography;

interface IQuizStates {
  isLoading: boolean,
  error: string | null,
}

const QuizWrapper = styled.div`
  height: 100vh;
  .root-row {
    padding-top: 50px;
    @media (max-width: 577px) {
      padding-top: 0;
    }
    &.main {
      padding-top: 100px;
    }
    .root-col {
      padding: 24px;
      @media (max-width: 577px) {
        padding: 24px 0;
      }
      &:nth-child(2) {
        padding: 12px 24px;
        @media (max-width: 577px) {
          padding: 12px;
        }
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

class Quiz extends React.PureComponent<WithApolloClient<{}>, IQuizStates> {
  constructor(props: WithApolloClient<{}>) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
    };
    this.submitAnswers = this.submitAnswers.bind(this);
    this.resetError = this.resetError.bind(this);
  }

  async submitAnswers(answers: string[]) {
    const { token } = this.context;
    const { client } = this.props;
    const input = answers.map((answer: string, order: number) => ({
      answer, order,
    }));
    this.setState({ isLoading: true });
    await client.mutate({
      mutation: ASSESS_ONBOARDING_SCORE,
      variables: { token, input },
      awaitRefetchQueries: true,
      refetchQueries: [{
        query: ACCOUNT,
        variables: { token },
      }],
    }).then(({ data }: { data: { assessOnboardingScore: boolean } }) => {
      const { assessOnboardingScore: userOnboarded } = data;
      if (userOnboarded) {
        sessionStorage.removeItem('onboarding_answers');
        message.success('Thank you for sharing us those information', 2);
      }
    }).catch((error: any) => {
      const { message: errorMessage } = error.graphQLErrors[0];
      this.setState({ isLoading: false, error: errorMessage });
    });
  }

  resetError() {
    this.setState({ error: null });
  }

  render() {
    const { isLoading, error } = this.state;
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
                    <Title level={4} className="text-center">
                      Whether you’re new to REITs or an experienced investor,&nbsp;
                      REITScreener makes it easy for you to make smarter investments.&nbsp;
                    </Title>
                    <Title level={4} className="text-center">
                      Let’s get to know you better – it won’t take more than a minute&nbsp;
                      and it will help you (and us!) figure out where you are in your&nbsp;
                      investing journey and what’s your ideal next step.&nbsp;
                      <span role="img" aria-label="thumbs-up">👍</span>
                    </Title>
                    <Link to="/register/quiz/1">
                      <StyledButton type="primary" size="large">
                        Let’s Go
                      </StyledButton>
                    </Link>
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
                    submitAnswers={this.submitAnswers}
                    isLoading={isLoading}
                    error={error}
                    resetError={this.resetError}
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

Quiz.contextType = UserContext;

export default AccountVerifier(
  withApollo<WithApolloClient<{}>>(Quiz), true,
);
