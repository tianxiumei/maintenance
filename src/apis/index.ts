import axios from "axios";
import qs from "qs";
import { isObject } from "lodash";
import { message } from "antd";
import { get as getItem } from "lodash";
import { SUCCESS_CODE } from "./constains";

const config = {
  // 请求头信息,避免同源策略
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
  },

  //设置超时时间
  timeout: 5000,
  // `withCredentials` 表示跨域请求时是否需要使用凭证cookie
  withCredentials: false,
};

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;
axios.defaults.timeout = 100000;
// 请求前拦截
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    console.log("请求超时");
    return Promise.reject(err);
  }
);

axios.interceptors.request.use(
  (req) => {
    // 对 post 请求数据进行处理
    if (req.method === "post" && isObject(req.data)) {
      Object.keys(req.data).forEach((item) => {
        !isObject(req.data[item]) &&
          (req.data[item] = JSON.stringify(req.data[item]));
      });
      req.data = qs.stringify(req.data);
    }
    return req;
  },
  (error) => {
    // 请求出错时处理
    return Promise.reject(error);
  }
);

// 返回后拦截
axios.interceptors.response.use(
  (data) => {
    return data;
  },
  (err) => {
    if (!err.response) {
      console.log(err);
      return;
    }
    if (err.response.status === 504 || err.response.status === 404) {
      console.log("服务器被吃了⊙﹏⊙∥");
      return;
    } else if (err.response.status === 401) {
      console.log("登录信息失效⊙﹏⊙∥");
      return;
    } else if (err.response.status === 500) {
      console.log("服务器开小差了⊙﹏⊙∥");
      return;
    }
    return Promise.reject(err);
  }
);

export function get(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(url, config)
      .then((res) => {
        const data = getItem(res, "data");
        if (data && data.message && data.code !== SUCCESS_CODE) {
          message.error(data.message);
          reject(data.message);
        } else resolve(getItem(data, "data"));
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export const post = function (url: string, params?: any) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, config)
      .then((res) => {
        const data = getItem(res, "data");
        if (data && data.message && data.code !== SUCCESS_CODE) {
          message.error(data.message);
          reject(data);
        } else {
          resolve(getItem(data, "data"));
          message.success(data.message);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
