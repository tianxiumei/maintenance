import axios from "axios";

axios.defaults.timeout = 100000;
// 请求前拦截
axios.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    console.log("请求超时");
    return Promise.reject(err);
  }
);

// 返回后拦截
axios.interceptors.response.use(
  data => {
    return data;
  },
  err => {
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

export const get = (url: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const post = function(url: string, params: any) {
  return new Promise((resolve, reject) => {
    // qs.stringify(data)
    axios
      .post(url, params)
      .then(res => {
        console.log(res);
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
