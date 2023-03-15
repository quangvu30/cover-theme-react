import { get, post, patch, put } from "./api_helper";

import * as url from "./url_helper";

export const postRegister = async (data) => {
  return await post(url.POST_REGISTER, data);
};

export const postVerifyEmail = async (data) => {
  return await post(url.POST_VERIFY_EMAIL, data);
};

export const patchChangePassword = async (data) => {
  return await patch(url.CHANGE_PASSWORD, data);
};

export const putChangePassword = async (data) => {
  return await put(url.CHANGE_PASSWORD, data);
};

export const getChangePassword = async (data) => {
  return await get(url.CHANGE_PASSWORD, data);
};

export const putUpdateProfile = async (data) => {
  return await put(url.USER_PROFILE, data);
};

export const getProfile = async (data) => {
  return await get(url.USER_PROFILE, data);
};

export const getLoginHistory = async (page, pageSize, email = undefined) => {
  let urlGetLoginHistory = `${url.GET_LOGIN_HISTORY}?page=${page}&limit=${pageSize}`;
  if (email) {
    urlGetLoginHistory += `&${email}`;
  }
  return await get(urlGetLoginHistory, {});
};

export const getListUser = async () => {
  return await get(url.GET_LIST_USER, {});
};

export const getLogOut = async () => {
  return await get("/api/auth/logout", {});
};
