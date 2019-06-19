import React, { GetDerivedStateFromProps } from 'react';
import styled from 'styled-components';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Typography, Button } from 'antd';

import AccountVerifier from '../HOC/AccountVerifier';
import QuizForm from '../components/forms/user/QuizForm';
import UserContext from '../contexts/UserContext';

const { Title } = Typography;

interface IRegisterQuizProps {
  quizNumber: string | undefined,
}

interface IRegisterQuizStates {
  quizNumber: string | undefined
}

const RegisterQuizWrapper = styled.div`
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
      .ant-typography {
        text-align: center;
        a:hover {
          text-decoration: underline;
        }
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
`;

class RegisterQuiz extends React.Component<
  RouteComponentProps<IRegisterQuizProps>,
  IRegisterQuizStates
> {
  static getDerivedStateFromProps: GetDerivedStateFromProps<
    RouteComponentProps<IRegisterQuizProps>,
    IRegisterQuizStates
  > = (nextProps) => {
    const { params: { quizNumber } } = nextProps.match;
    return { quizNumber };
  }

  constructor(props: RouteComponentProps<IRegisterQuizProps>) {
    super(props);
    const { match: { params } } = this.props;
    const { quizNumber } = params;
    this.state = {
      quizNumber,
    };
  }

  componentDidMount() {
    const { location, history } = this.props;
    if (!location.pathname.match(/\/register\/quiz\/[2-5]$/g)) {
      history.push('/register/quiz/1');
    }
  }

  render() {
    const { account, token } = this.context;
    const { quizNumber } = this.state;

    return (
      <RegisterQuizWrapper>
        <StyledDiv>
          {!quizNumber ? (
            <Row className="root-row main" type="flex">
              <Col
                xs={24}
                md={{ span: 12, offset: 6 }}
                lg={{ span: 10, offset: 7 }}
                className="root-col"
              >
                <Title level={3}>Welcome to the REITScreener Quiz</Title>
                <Title level={4}>
                  Whether you’re new to REITs or an experienced investor,&nbsp;
                  REITScreener can help you start investing smarter and better.&nbsp;
                  This quiz shouldn’t take more than 2 minutes and it will help you
                  (and us!) figure out where you are in your investing&nbsp;
                  journey and what’s your ideal next step. 👍
                </Title>
                <StyledButton type="primary" size="large">
                  <Link to="/register/quiz/1">Start the quiz</Link>
                </StyledButton>
              </Col>
            </Row>
          ) : (
            <QuizForm quizNumber={Number(quizNumber)} />
          )}
        </StyledDiv>
      </RegisterQuizWrapper>
    );
  }
}

RegisterQuiz.contextType = UserContext;

export default AccountVerifier(RegisterQuiz, true);
