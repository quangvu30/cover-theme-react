import * as _ from "lodash";

import { randomString } from "@/backend/utils/random";
import TokenModel from "./token.model";
import { TokenType } from "@/backend/constant/enum";

export const createToken = async (user, tokenType) => {
  const tokenString = randomString(40);
  const token = await TokenModel.create({
    token: tokenString,
    type: tokenType,
    expires: new Date(Date.now() + 15 * 60 * 1000), // 15p
    active: true,
    user,
  });

  return token;
};

export const getToken = async (tokenString) => {
  const token = await TokenModel.findOne({ token: tokenString });
  if (_.isNull(token)) {
    return new Error("Token not found");
  }

  if (!token.active) {
    return new Error("Token not active");
  }

  // check expired
  const dateNow = new Date(Date.now());
  const dateToken = new Date(token.expires);
  if (dateNow > dateToken) {
    return new Error("Token expired");
  }
  return token;
};

export const disableToken = async (tokenString) => {
  const token = await TokenModel.findOne({ token: tokenString });
  if (_.isNull(token)) {
    return new Error("Token not found");
  }

  token.active = false;
  await token.save();
  return token;
};
