export const clearSession = () => {
  document.cookie = "refreshToken=; Max-Age=0; path=/";
  document.cookie = "sessionId=; Max-Age=0; path=/";
};
