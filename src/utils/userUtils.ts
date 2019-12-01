export const setAuthToken = (token: string): void => localStorage.setItem('access_token', token);

export const setRefreshToken = (refreshToken: string): void => {
  return localStorage.setItem('refresh_token', refreshToken);
};

export const getAuthToken = (): string => localStorage.getItem('access_token') || '';

export const deleteAuthToken = (): void => localStorage.removeItem('access_token');

export const isLoggedIn = (): boolean => getAuthToken().length > 0;

export const setOnboardingAnswers = (answers: string[] | null[]): void => {
  sessionStorage.setItem('onboarding_answers', JSON.stringify(answers));
};

export const getOnboardingAnswers = (): string[] | null[] => {
  const answers = sessionStorage.getItem('onboarding_answers') || '[]';
  return JSON.parse(answers);
};
