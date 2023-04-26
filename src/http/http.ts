/**
 * @Author zhouyi
 * @Data 2023年3月24日
 * @Title 封装axios
 */

import axios,  { type AxiosRequestConfig } from "axios"
import { ElMessage } from "element-plus"
// import StorageHandler from "../utils/StorageHandler";

const instance = axios.create({
  timeout: 100000,
  baseURL: 'http://kangfu-api-test.shuoboys.net',
  headers: {
    "Content-Type": "application/json",
    // "Cache-Control": "no-cache"
  },
})
axios.defaults.baseURL = '/api'
// console.log(import.meta.env.VUE_APP_API_URL,'import.meta.env.VUE_APP_API_URL');

/**
 * @Author zhouyi
 * @Title axios请求拦截和响应拦截器
 * @Date 2023年3月21日
 */

//HTTPrequest拦截
instance.interceptors.request.use(
  config => {
    // 在发送前做什么

    // 设置token
    let storageHandler = localStorage.getItem('token')
    let uid = localStorage.getItem('userId')
    // console.log(storageHandler,'storageHandler');
    
    if (storageHandler) {
      config.headers["token"] = storageHandler;
      config.headers["uid"] = uid;
    }
    return config
  },
  error => {
    // 处理错误请求
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }

)

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    // console.log(response.headers,'hea');
    
  // 对响应数据做点什么
  return response;
}, 
  error => {
    // console.log('error', error);
    if(error && error.response) {
      switch (error.code) {
        case 400:
          error.massage = '错误请求';
          break;
        case 401:
          error.massage = '未授权，请重新登录';
          break;
        case 403:
          error.massage = '拒绝访问';
          break;
        case 404:
          error.massage = '请求错误,未找到该资源';
          break;
        case 405:
          error.massage = '请求方法未允许';
          break;
        case 408:
          error.massage = '请求超时';
          break;
        case 500:
          error.massage = '服务器端出错';
          break;
        case 501:
          error.massage = '网络未实现';
          break;
        case 502:
          error.massage = '网络错误';
          break;
        case 503:
          error.massage = '服务不可用';
          break;
        case 504:
          error.massage = '网络超时';
          break;
        case 505:
          error.message = "http版本不支持该请求";
          break;
        default:
          error.message = `错误链接${error.response.status}`;
          break;
      }
    } else {
      error.message = "连接到服务器失败";
    }
    //错误逻辑处理，在此可做页面弹窗处理
    console.log(error.message);
    
    // ElMessage.error(error.message)
    return Promise.reject(error.message);
  }
);

async function httpProxy(config: AxiosRequestConfig): Promise<any> {
  let resData = await instance(config);
  return resData.data
}

export default httpProxy