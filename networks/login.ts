import http from "./index";
import { ApiUrl } from "./ApiUrl";

import {
  ChangePasswordType,
  ForgotPasswordType,
  LoginRequestType,
} from "@/types";

export const login = async (data: LoginRequestType) => {
  try {
    const res = await http.post(ApiUrl.auth.login, data);
    return res;
  } catch (error: any) {
    return error.response;
  }
};

export const forgotPassword = async (data: ForgotPasswordType) => {
  try {
    const res = await http.post(ApiUrl.auth.forgotPassword, data);
    return res;
  } catch (error: any) {
    return error.response;
  }
};

export const changePassword = async (data: ChangePasswordType) => {
  try {
    const res = await http.post(ApiUrl.auth.changePassword, data);
    return res;
  } catch (error: any) {
    return error.response;
  }
};
