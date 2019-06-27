import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Typography, Radio, Button, Steps } from 'antd';

import { questions, IQuestion } from '../../../utils/onBoardingUtils';
import {
  getOnboardingAnswers,
  setOnboardingAnswers,
  IOnboardingAnswer,
} from '../../../utils/userUtils';

const { Title } = Typography;
const { Step } = Steps;
const { Group: RadioGroup, Button: RadioButton } = Radio;

interface IQuizFormProps extends RouteComponentProps {
  quizNumber: number,
  question: IQuestion,
}

interface IQuizFormStates {
  answer: string | null,
}

interface ICustomRadioGroupProps {
  options: string[] | undefined,
  answer: string | null,
  selectAnswer: (e: any) => void
}

const StyledSteps = styled(Steps)`
  .ant-steps-item {
    margin-right: 0 !important;
    &.ant-steps-item-finish {
      .ant-steps-item-icon {
        background: #1890ff;
      }
    }
    .ant-steps-item-icon {
      width: 24px;
      height: 24px;
      margin-right: 0 !important;
      .ant-steps-icon {
        display: none;
      }
    }
    .ant-steps-item-content > .ant-steps-item-title {
      &:after {
        left: 0;
        height: 3px;
        top: 12px;
      }
    }
  }
`;

const StyledRadioGroup = styled(RadioGroup)`
  display: block !important;
  .ant-radio-button-wrapper {
    border-radius: 4px !important;
    margin-bottom: 12px;
    text-align: center;
    display: block;
  }
`;

const StyledButton = styled(Button)`
  max-width: 65%;
  @media only screen and (max-width: 600px) {
    max-width: 100%;
  }
`;

const CustomRadioGroup = ({ options, selectAnswer, answer }: ICustomRadioGroupProps) => {
  return (
    <StyledRadioGroup value={answer} size="large">
      {options && options.map((option, idx) => (
        <RadioButton
          value={option}
          key={idx}
          onChange={() => selectAnswer(option)}
        >
          {option}
        </RadioButton>
      ))}
    </StyledRadioGroup>
  );
};

class QuizForm extends React.PureComponent<IQuizFormProps, IQuizFormStates> {
  constructor(props: IQuizFormProps) {
    super(props);
    this.pageChange = this.pageChange.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
    this.state = {
      answer: null,
    };
  }

  componentDidMount() {
    const { history, quizNumber } = this.props;
    const onBoardingAnswers: IOnboardingAnswer[] = getOnboardingAnswers();
    const lastQuestionNumber = onBoardingAnswers.length + 1;
    if (quizNumber > lastQuestionNumber) {
      history.push(`/register/quiz/${lastQuestionNumber}`);
    } else if (quizNumber < lastQuestionNumber) {
      const reducedAnswers: IOnboardingAnswer[] = getOnboardingAnswers().slice(0, quizNumber);
      setOnboardingAnswers(reducedAnswers);
      const { answer } = reducedAnswers.pop() || { answer: null };
      this.setState({ answer });
    }
  }

  selectAnswer(value: string | null) {
    this.setState({
      answer: value,
    }, () => {
      const { quizNumber } = this.props;
      const onBoardingAnswers: IOnboardingAnswer[] = getOnboardingAnswers();
      const { answer } = this.state;
      onBoardingAnswers[quizNumber - 1] = { answer };
      setOnboardingAnswers(onBoardingAnswers);
    });
  }

  pageChange(pageNumber: number) {
    const { history, quizNumber } = this.props;
    const toPageNum = quizNumber + pageNumber;
    if (pageNumber > 0) {
      this.setState({ answer: null });
      history.push(`/register/quiz/${toPageNum || ''}`);
    } else {
      const onBoardingAnswers: IOnboardingAnswer[] = getOnboardingAnswers();
      const {
        answer: currentAnswer,
      }: IOnboardingAnswer = onBoardingAnswers.pop() || { answer: null };
      this.setState({ answer: currentAnswer });
    }
  }

  render() {
    const { answer } = this.state;
    const { quizNumber, question: propsQuestion, history } = this.props;
    const { question, options, subQuestions = [] }: IQuestion = propsQuestion;
    const lastQuestion = (quizNumber === questions.length);
    const derivedQuestion: IQuestion | undefined = subQuestions.find(({ requiredAnswer }) => {
      const { answer: previousAnswer }: IOnboardingAnswer = getOnboardingAnswers().pop() || {
        answer: null,
      };
      return requiredAnswer === previousAnswer;
    });

    return (
      <Row className="root-row" type="flex">
        <Col xs={24} md={{ span: 12, offset: 6 }} lg={{ span: 10, offset: 7 }} className="root-col">
          <StyledSteps
            current={quizNumber - 1}
            style={{ display: 'flex' }}
          >
            {questions.map((_, i) => (
              <Step key={i} />
            ))}
          </StyledSteps>
        </Col>
        <Col xs={24} md={{ span: 12, offset: 6 }} lg={{ span: 10, offset: 7 }} className="root-col">
          <Title level={4}>
            {derivedQuestion ? derivedQuestion.question : question}
          </Title>
        </Col>
        <Col xs={24} md={{ span: 12, offset: 6 }} lg={{ span: 10, offset: 7 }} className="root-col">
          <CustomRadioGroup
            answer={answer}
            options={derivedQuestion ? derivedQuestion.options : options}
            selectAnswer={this.selectAnswer}
          />
          <Row gutter={{ xs: 12, sm: 14, md: 18, lg: 24 }}>
            <Col xs={12}>
              <StyledButton
                className="float-right"
                size="large"
                block
                onClick={() => {
                  this.pageChange(-1);
                  history.goBack();
                }}
              >
                Previous
              </StyledButton>
            </Col>
            <Col xs={12}>
              <StyledButton
                type="primary"
                size="large"
                block
                onClick={() => {
                  const increment = (quizNumber === 4 && answer === 'Yes, I have') ? 2 : 1;
                  lastQuestion ? this.pageChange(-1) : this.pageChange(increment);
                }}
                disabled={!answer}
              >
                {lastQuestion ? 'Submit answers' : 'Next'}
              </StyledButton>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default withRouter(QuizForm);
