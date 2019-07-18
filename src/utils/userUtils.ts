export const setAuthToken = (token: string): void => localStorage.setItem('auth_token', token);

export const getAuthToken = (): string => localStorage.getItem('auth_token') || '';

export const deleteAuthToken = (): void => localStorage.removeItem('auth_token');

export const isLoggedIn = (): boolean => getAuthToken().length > 0;

export const setOnboardingAnswers = (answers: string[] | null[]): void => {
  sessionStorage.setItem('onboarding_answers', JSON.stringify(answers));
};

export const getOnboardingAnswers = (): string[] | null[] => {
  const answers = sessionStorage.getItem('onboarding_answers') || '[]';
  return JSON.parse(answers);
};
