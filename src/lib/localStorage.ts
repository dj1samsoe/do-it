export const setTokenInLocalStorage = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwtToken", token);
  }
};
