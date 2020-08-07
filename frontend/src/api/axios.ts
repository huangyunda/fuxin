import axios from 'axios';
import { message as antMessage } from 'antd';

export const baseURL = 'http://49.235.149.160:2333/';
// export const baseURL = 'http://127.0.0.1/';

const instance = axios.create({
  baseURL,
  timeout: 10000,
});

instance.interceptors.response.use(function (response) {
  const { success, message, data } = response.data;
  if (!success) {
    antMessage.error(message);
    return Promise.reject(message);
  }
  return data;
});

export const post = (url: string, params?: object) => instance.post(url, params);
