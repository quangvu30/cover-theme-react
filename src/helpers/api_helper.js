import axios from "axios";

export const get = async (url, params) => {
  let response;

  let paramKeys = [];

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: url,
  };

  if (params) {
    Object.keys(params).map((key) => {
      paramKeys.push(key + "=" + params[key]);
      return paramKeys;
    });
    const queryString =
      paramKeys && paramKeys.length ? paramKeys.join("&") : "";
    config.url = `${url}?${queryString}`;
    response = await axios(config);
  } else {
    response = await axios(config);
  }

  return response;
};

export const post = async (url, data) => {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: url,
    data: data,
  };

  return await axios(config);
};

export const put = async (url, data) => {
  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: url,
    data: data,
  };

  return await axios(config);
};

export const patch = async (url, data) => {
  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: url,
    data: data,
  };

  return await axios(config);
};
