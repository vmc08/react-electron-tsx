export const setAuthToken = (token: string): void => localStorage.setItem('auth_token', token);

export const getAuthToken = (): string => localStorage.getItem('auth_token') || '';

export const deleteAuthToken = (): void => localStorage.removeItem('auth_token');

export const isLoggedIn = (): boolean => getAuthToken().length > 0;

export const setTalkToken = (token: string): void => localStorage.setItem('talk_token', token);

export const getTalkToken = (): string => localStorage.getItem('talk_token') || '';
