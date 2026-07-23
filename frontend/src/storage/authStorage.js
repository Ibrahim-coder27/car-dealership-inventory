import { STORAGE_KEYS } from "../constants/storage";

export const authStorage = {
  saveToken(token) {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  },

  getToken() {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  removeToken() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  },

  saveUser(user) {
    localStorage.setItem(
      STORAGE_KEYS.USER,
      JSON.stringify(user)
    );
  },

  getUser() {
    const user = localStorage.getItem(STORAGE_KEYS.USER);

    return user ? JSON.parse(user) : null;
  },

  removeUser() {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  clearSession() {
    this.removeToken();
    this.removeUser();
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};