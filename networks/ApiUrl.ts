import { baseURL } from ".";

export const ApiUrl = {
  auth: {
    login: `${baseURL}auth/login`,
    forgotPassword: `${baseURL}auth/forgot/password`,
    changePassword: `${baseURL}auth/confirm/password`,
  },
};
