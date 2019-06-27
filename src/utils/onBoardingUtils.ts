export interface IQuestion {
  id?: number,
  subQuestions?: IQuestion[],
  requiredAnswer?: string,
  question?: string,
  options?: string[],
}

export const questions: IQuestion[] = [
  {
    id: 1,
    question: 'How would you rate your REITs Knowledge?',
    options: [
      'Absolute beginner',
      'I know a few things',
      'Somewhat knowledgable',
      'Knowledgable',
      'Expert knowledge',
    ],
  },
  {
    id: 2,
    question: 'Do you own any REITs?',
    options: [
      'Yes, I own REITs',
      'No, I don’t',
    ],
  },
  {
    id: 3,
    subQuestions: [
      {
        id: 3.1,
        requiredAnswer: 'Yes, I own REITs',
        question: 'How large is your current REIT Portfolio?',
        options: [
          '$1–$10,000',
          '$10,001–$25,000',
          '$25,001 – $50,000',
          '$50,000+',
        ],
      },
      {
        id: 3.2,
        requiredAnswer: 'No, I don’t',
        question: 'Are you interested in investing in REITs?',
        options: [
          'No plans at the moment',
          'Yes, in the next 6–12 months',
        ],
      },
    ],
  },
  {
    id: 4,
    question: 'Have you attended any REIT Training?',
    options: [
      'Yes, I have',
      'No, I haven\'t',
    ],
  },
  {
    id: 5,
    subQuestions: [
      {
        requiredAnswer: 'No, I haven\'t',
        id: 5.1,
        question: 'Are you interested in learning more about REITs Training?',
        options: [
          'Yes, I am interested',
          'Not at this moment',
        ],
      },
    ],
  },
  {
    id: 6,
    question: 'Which of the following motivated you the most to sign up for REITScreener?',
    options: [
      'I want access to the REIT Financial Data',
      'I want to learn more about REITs as an asset class',
      'I am interested in your weekly Market Briefs',
      'I want to access the online/offline Training',
      'Just exploring',
    ],
  },
];
