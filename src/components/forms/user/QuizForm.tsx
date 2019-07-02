import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Typography, Radio, Button, Steps, Form as AntdForm, Alert } from 'antd';

import QuizContext from '../../../contexts/QuizContext';
import { questions, IQuestion } from '../../../utils/onBoardingUtils';

const { Title } = Typography;
const { Step } = Steps;
const { Group: RadioGroup, Button: RadioButton } = Radio;

interface IQuizFormProps extends RouteComponentProps {
  currentIndex: number,
  question: IQuestion,
  isLoading: boolean,
  error: string | null,
  submitAnswers: (answers: string[]) => void,
  resetError: () => void,
}

interface ICustomRadioGroupProps {
  isLoading: boolean,
  options: string[] | undefined,
  answer: string | null,
  selectAnswer: (e: string) => void
}

const StyledSteps = styled(Steps)`
  display: flex !important;
  .ant-steps-item {
    margin-right: 0 !important;
    &.ant-steps-item-finish {
      .ant-steps-item-icon {
        background: #1890ff;
      }
    }
    .ant-steps-item-tail {
      display: none !important;
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
        display: block !important;
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

const CustomRadioGroup = ({ options, selectAnswer, answer, isLoading }: ICustomRadioGroupProps) => {
  return (
    <StyledRadioGroup value={answer} size="large" disabled={isLoading}>
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

class QuizForm extends React.PureComponent<IQuizFormProps> {
  constructor(props: IQuizFormProps) {
    super(props);
  }

  componentDidMount() {
    const { history, currentIndex } = this.props;
    const { answers, setAnswers } = this.context;
    // forcing 5th question via direct access to url when previous answer is invalid
    const skipNext = (answers[currentIndex - 1] === 'Yes, I have' && currentIndex === 4);
    if ((currentIndex - answers.length) > 0 || skipNext) {
      setAnswers(answers.slice(0, 1));
      history.push('/register/quiz/1');
    } else {
      setAnswers(answers.slice(0, currentIndex + 1));
    }
  }

  render() {
    const { answers, setSelectedAnswer }: any = this.context;
    const {
      question: propsQuestion,
      history, currentIndex, submitAnswers, isLoading, error: serverError, resetError,
    } = this.props;

    const { question, options, subQuestions = [] }: IQuestion = propsQuestion;
    const quizNumber = currentIndex + 1;
    const currentAnswer = answers[currentIndex];
    const previousAnswer = answers[currentIndex - 1];
    const lastQuestion = (quizNumber === questions.length);

    const derivedQuestion: IQuestion | undefined = subQuestions.find(({ requiredAnswer }) => {
      return requiredAnswer === previousAnswer;
    });

    return (
      <Row className="root-row" type="flex">
        <Col xs={24} md={{ span: 12, offset: 6 }} lg={{ span: 10, offset: 7 }} className="root-col">
          <StyledSteps current={currentIndex}>
            {questions.map((_, i) => (
              <Step key={i} />
            ))}
          </StyledSteps>
        </Col>
        <Col xs={24} md={{ span: 12, offset: 6 }} lg={{ span: 10, offset: 7 }} className="root-col">
          {serverError && (
            <AntdForm.Item>
              <Alert
                message={serverError}
                type="error"
                closable
                onClose={resetError}
              />
            </AntdForm.Item>
          )}
          <Title level={4} className="text-center">
            {derivedQuestion ? derivedQuestion.question : question}
          </Title>
        </Col>
        <Col xs={24} md={{ span: 12, offset: 6 }} lg={{ span: 10, offset: 7 }} className="root-col">
          <CustomRadioGroup
            isLoading={isLoading}
            answer={currentAnswer}
            options={derivedQuestion ? derivedQuestion.options : options}
            selectAnswer={(selectedOption) => setSelectedAnswer(currentIndex, selectedOption)}
          />
          <Row gutter={{ xs: 12, sm: 14, md: 18, lg: 24 }}>
            <Col xs={12} md={12} lg={12}>
              <Button
                disabled={isLoading}
                className="float-right"
                size="large"
                block
                onClick={() => {
                  history.goBack();
                }}
              >
                Previous
              </Button>
            </Col>
            <Col xs={12} md={12} lg={12}>
              <Button
                disabled={!currentAnswer || isLoading}
                loading={isLoading}
                type="primary"
                size="large"
                block
                onClick={() => {
                  if (lastQuestion) {
                    submitAnswers(answers);
                  } else {
                    const increment = (quizNumber === 4 && currentAnswer === 'Yes, I have') ? 2 : 1;
                    if (quizNumber === 4 && currentAnswer === 'Yes, I have') {
                      setSelectedAnswer(quizNumber, null);
                    }
                    history.push(`/register/quiz/${quizNumber + increment}`);
                  }
                }}
              >
                {lastQuestion ? 'Submit answers' : 'Next'}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

QuizForm.contextType = QuizContext;

export default withRouter(QuizForm);
