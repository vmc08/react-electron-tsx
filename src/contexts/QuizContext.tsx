import React, { createContext, useContext } from 'react';
import {
  getOnboardingAnswers,
  setOnboardingAnswers,
} from '../utils/userUtils';

interface IQuizProviderState {
  answers: string[] | null[],
}

const QuizContext = createContext({});

class QuizProvider extends React.Component<{}, IQuizProviderState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      answers: getOnboardingAnswers(),
    };
    this.setSelectedAnswer = this.setSelectedAnswer.bind(this);
    this.setAnswers = this.setAnswers.bind(this);
  }

  setSelectedAnswer(index: number, selectedAnswer: string) {
    const { answers } = this.state;
    answers[index] = selectedAnswer;
    this.setState({ answers });
    setOnboardingAnswers(answers);
  }

  setAnswers(answers: string[] | null[]) {
    this.setState({ answers });
    setOnboardingAnswers(answers);
  }

  render() {
    const { answers } = this.state;
    const { setSelectedAnswer, setAnswers } = this;
    return (
      <QuizContext.Provider
        value={{ answers, setSelectedAnswer, setAnswers }}
      >
        {this.props.children}
      </QuizContext.Provider>
    );
  }
}

const QuizConsumer = QuizContext.Consumer;

const useQuizContextValue = () => useContext(QuizContext);

export { QuizProvider, QuizConsumer, useQuizContextValue };

export default QuizContext;
