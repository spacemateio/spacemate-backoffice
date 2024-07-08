import { BackOfficeUser } from "./types.ts";

const KEY = "boUser";

const getUser = () => {
  return JSON.parse(localStorage.getItem(KEY) || "{}") as BackOfficeUser;
};

const setUser = (user: BackOfficeUser) => {
  localStorage.setItem(KEY, JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem(KEY);
};

export const authLocalStorageService = {
  getUser,
  setUser,
  removeUser,
};
