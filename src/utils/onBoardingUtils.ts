export interface IQuestions {
  id: number,
  title: string,
  question: string,
  options: string[],
  answer: string,
  reason: string,
  remark: string,
}

export const questions: IQuestions[] = [
  {
    id: 1,
    title: 'Question 1',
// tslint:disable-next-line: max-line-length
    question: 'In most jurisdictions in Asia Pacific, REITs are mandated to distribute at least _____ of their taxable income in order to qualify for tax exemptions. As a result, REITs tend to pay higher dividends than other stocks.',
    options: [
      '70%',
      '80%',
      '90%',
      '100%',
    ],
    answer: '90%',
// tslint:disable-next-line: max-line-length
    reason: 'To qualify for tax exemptions under tax transparency laws, REITs are required to pay out at least 90% of their taxable income.',
// tslint:disable-next-line: max-line-length
    remark: 'This is probably a really simply question which most can answer. So if you are not able to answer this question, very likely you are “Newbie” and just heard about REITs, but know nothing about them.',
  },
  {
    id: 2,
    title: 'Question 2',
// tslint:disable-next-line: max-line-length
    question: 'Most REITs are regular dividend paying investments. Therefore as investors, we are able to differentiate strong and high quality REIT easily based on its dividend yield.',
    options: [
      'True',
      'False',
    ],
    answer: 'False',
// tslint:disable-next-line: max-line-length
    reason: 'Clearly a FALSE statement and yields alone should never be used to make an investment decision on REITs or for that matter any stock! The strength and sustainability of the dividend has nothing to do with its dividend yield.',
// tslint:disable-next-line: max-line-length
    remark: 'Likely “Newbies” and “Basic” tiers will answer TRUE, while the “Premium” and “Professionals” will answer FALSE. Very likely if you are a beginner, you would have been misled by the first question and answer TRUE.',
  },
  {
    id: 3,
    title: 'Question 3',
    question: 'All REITs have sponsors, most which are developers.',
    options: [
      'True',
      'False',
    ],
    answer: 'False',
// tslint:disable-next-line: max-line-length
    reason: 'The legal structure of a REIT does not mandate the need of a sponsor, though most REITs have a sponsor to inject the initial portfolio of properties. Most sponsors are also developers as developers have a pipeline of properties which they can inject into the REIT for future growth. But not all sponsors are necessarily developers.',
// tslint:disable-next-line: max-line-length
    remark: 'Due to the fact that majority of REITs have sponsors, many beginners or sometimes even regular REIT investors assume that all REITs have sponsors. This question will differentiate the Professional subscribers who probably have seen many REITs including sponsorless REITs.',
  },
  {
    id: 4,
    title: 'Question 4',
// tslint:disable-next-line: max-line-length
    question: 'REITs are simply NOT able to distribute dividends higher than its net profits/income sustainably. This is because it cannot distribute more than it earns. Distributing dividends higher than net profits/income is a red flag in REIT investing.',
    options: [
      'True',
      'False',
    ],
    answer: 'False',
    reason: '',
// tslint:disable-next-line: max-line-length
    remark: 'This one is again used to differentiate the Premium from the Professionals. Very likely investors who cannot answer this question correctly are likely stock investors and have a misconception on REITs and try to use stock metrics to assess REITs. They are probably quite familiar with stock investing already and but just need a little nudge into REITs.',
  },
  {
    id: 5,
    title: 'Question 5',
// tslint:disable-next-line: max-line-length
    question: 'In a typical structure of a REIT, which is the entity that legally owns the real estate assets?',
    options: [
      'Unitholders',
      'REIT Manager',
      'REIT Trustee',
      'Property Manager',
      'The REIT Itself',
    ],
    answer: 'REIT Trustee',
// tslint:disable-next-line: max-line-length
    reason: 'A REIT is a legally binding trust structure and not an entity. Therefore it cannot itself own the real estate. The real estate has to be owned by the Trustee who acts in the best interest of the unitholders. The REIT Manager is appointed to manage the REIT, therefore the ownership rights and the management rights are segregated in a REIT.',
// tslint:disable-next-line: max-line-length
    remark: 'It’s a common misconception among the beginners that the REIT owns the real estate. The truth is that the trustee is actually the legal owner of the property, not the REIT as the REIT is a “trust deed” which cannot legally under the law take ownership of properties. This question will differentiate the Professional subscribers who really know their stuff. Most investors wouldn’t even pay attention to this point. This question is slightly academic in nature, and affects very little in the way you invest.',
  },
];
