import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Typography, Radio, Button, Steps } from 'antd';

import QuizContext from '../../../contexts/QuizContext';
import { questions, IQuestion } from '../../../utils/onBoardingUtils';

const { Title } = Typography;
const { Step } = Steps;
const { Group: RadioGroup, Button: RadioButton } = Radio;

interface IQuizFormProps extends RouteComponentProps {
  currentIndex: number,
  question: IQuestion,
}

interface ICustomRadioGroupProps {
  options: string[] | undefined,
  answer: string | null,
  selectAnswer: (e: string) => void
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
    }
  }

  render() {
    const { answers, setSelectedAnswer, setAnswers }: any = this.context;
    const { question: propsQuestion, history, currentIndex } = this.props;

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
          <StyledSteps
            current={currentIndex}
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
            answer={currentAnswer}
            options={derivedQuestion ? derivedQuestion.options : options}
            selectAnswer={(selectedOption) => setSelectedAnswer(currentIndex, selectedOption)}
          />
          <Row gutter={{ xs: 12, sm: 14, md: 18, lg: 24 }}>
            <Col xs={12}>
              <StyledButton
                className="float-right"
                size="large"
                block
                onClick={() => {
                  (currentIndex === 5 && previousAnswer === null) ?
                    setAnswers(answers.filter((a: string) => a)) :
                    setAnswers(answers.slice(0, currentIndex));
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
                  const increment = (quizNumber === 4 && currentAnswer === 'Yes, I have') ? 2 : 1;
                  if (quizNumber === 4 && currentAnswer === 'Yes, I have') {
                    setSelectedAnswer(quizNumber, null);
                  }
                  history.push(`/register/quiz/${quizNumber + increment}`);
                }}
                disabled={!currentAnswer}
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

QuizForm.contextType = QuizContext;

export default withRouter(QuizForm);
