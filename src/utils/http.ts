import axios, { AxiosResponse, AxiosRequestConfig } from "axios" 
import { Message } from "element-ui"

/**
 * http请求工具类
 * 
 * 请求拦截器：负责讲客户端标识token值存储并放置在头部提交给服务端
 * 
 * 响应拦截器：负责全局处理业务请求的网络或者业务错误
 *  
 */

// 创建 axios 实例
const service = axios.create({
    timeout: 10000  // 超时时间
})

// 请求拦截
service.interceptors.request.use((config:AxiosRequestConfig) => {  // 成功回调
    return config;
},(err: any) => {   // 失败回调
    Promise.reject(err)
})

// 响应拦截
service.interceptors.response.use((response:AxiosResponse) => {
    return response;
},(err: any) =>{
    let errMsg = "";
    if(err && err.response.status) {
        switch(err.response.status){
            case 401:
                errMsg = "登录状态失效，请重新登录"
                break;
            case 403:
                errMsg = "拒绝访问"
                break;
            case 408:
                errMsg = "请求超时"
                break;
            case 500:
                errMsg = "服务器内部错误"
                break;
            case 501:
                errMsg = "服务未实现"
                break
            case 503: 
                errMsg = "服务不可用"
                break;
            case 504:
                errMsg = "网关超时"
                break;
            case 505:
                errMsg = "HTTP版本不受支持"
                break;
            default:
                errMsg = err.response.data.msg;
                break;
        }
    } else {
        errMsg = err;
    }

    Message.error(errMsg);
    return Promise.reject(errMsg);
})

export default service;