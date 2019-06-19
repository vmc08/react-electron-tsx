import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Typography, Radio, Button, Steps } from 'antd';

import { questions } from '../../../utils/onBoardingUtils';
import {
  getOnboardingAnswers,
  setOnboardingAnswers,
  IOnboardingAnswer,
} from '../../../utils/userUtils';

const { Title, Paragraph } = Typography;
const { Step } = Steps;
const { Group: RadioGroup, Button: RadioButton } = Radio;

interface IQuizFormProps extends RouteComponentProps {
  quizNumber: number,
}

interface IQuizFormStates {
  answer: string | null,
}

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

class QuizForm extends React.PureComponent<IQuizFormProps, IQuizFormStates> {
  constructor(props: IQuizFormProps) {
    super(props);
    this.pageChange = this.pageChange.bind(this);
    this.stepChange = this.stepChange.bind(this);
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
      const { answer } = reducedAnswers.pop() || { answer: null };
      setOnboardingAnswers(reducedAnswers);
      this.setState({ answer });
    }
  }

  selectAnswer(e: any) {
    this.setState({
      answer: e.target.value,
    });
  }

  pageChange(pageNumber: number) {
    const { history, quizNumber } = this.props;
    const toPageNum = quizNumber + pageNumber;
    const onBoardingAnswers: IOnboardingAnswer[] = getOnboardingAnswers();
    const { answer } = this.state;
    if (pageNumber > 0) {
      onBoardingAnswers.push({ answer });
      setOnboardingAnswers(onBoardingAnswers);
      this.setState({ answer: null });
    } else {
      const {
        answer: currentAnswer,
      }: IOnboardingAnswer = onBoardingAnswers.pop() || { answer: null };
      setOnboardingAnswers(onBoardingAnswers);
      this.setState({ answer: currentAnswer });
    }
    history.push(`/register/quiz/${toPageNum || ''}`);
  }

  stepChange(currentStep: number) {
    const { history, quizNumber } = this.props;
    const toPageNum = currentStep + 1;
    if (toPageNum > quizNumber) {
      return null;
    }
    history.push(`/register/quiz/${toPageNum}`);
  }

  render() {
    const { answer } = this.state;
    const { quizNumber } = this.props;
    const currentStep = quizNumber - 1;
    const { question, options } = questions[currentStep] || { question: null, options: [] };
    const lastQuestion = quizNumber === questions.length;
    return (
      <Row className="root-row" type="flex">
        <Col xs={24} md={{ span: 12, offset: 6 }} lg={{ span: 10, offset: 7 }} className="root-col">
          <Title level={3} style={{ marginBottom: 36 }}>Questions</Title>
          <Steps
            current={currentStep}
            style={{ display: 'flex' }}
            onChange={this.stepChange}
          >
            {questions.map((_, i) => (
              <Step key={i} />
            ))}
          </Steps>
        </Col>
        <Col xs={24} md={{ span: 12, offset: 6 }} lg={{ span: 10, offset: 7 }} className="root-col">
          <Title level={4}>
            {question}
          </Title>
        </Col>
        <Col xs={24} md={{ span: 12, offset: 6 }} lg={{ span: 10, offset: 7 }} className="root-col">
          <Paragraph style={{ textAlign: 'center' }}>Select one</Paragraph>
          <StyledRadioGroup value={answer} size="large">
            {options.map((option, idx) => (
              <RadioButton
                value={option}
                key={idx}
                onChange={this.selectAnswer}
              >
                {option}
              </RadioButton>
            ))}
          </StyledRadioGroup>
          <Row gutter={{ xs: 12, sm: 14, md: 18, lg: 24 }}>
            <Col xs={12}>
              <StyledButton
                className="float-right"
                size="large"
                block
                onClick={() => this.pageChange(-1)}
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
                  lastQuestion ? this.pageChange(-1) : this.pageChange(1);
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
