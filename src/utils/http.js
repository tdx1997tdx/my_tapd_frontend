/** **   http.js   ****/
// 导入封装好的axios实例
import axios from "axios";

const http = ({method, url, data, config, headers = {"Content-Type": "application/json;charset=UTF-8;"}}) => {
    const env = process.env.NODE_ENV || "development";
    const {host} = config.proxy[env];
    const baseURL = host;
    const instance = axios.create({
        baseURL, // 接口统一域名
        timeout: 6000, // 设置超时
        headers: headers
    });
    // 请求拦截器
    instance.interceptors.request.use(
        (config) => {
            // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加 了
            const token = window.localStorage.getItem("token");
            const loginName = localStorage.getItem("loginName");
            token && (config.headers.Authorization = token);
            loginName && (config.headers.loginName = loginName);
            // 若请求方式为post，则将data参数转为JSON字符串
            if (config.method === "post" || config.method === "put") {
                config.data = JSON.stringify(config.data);
            }
            return config;
        },
        (error) =>
            // 对请求错误做些什么
            Promise.reject(error)
    );
    // 响应拦截器
    instance.interceptors.response.use(
        (response) =>
            // hideLoading();
            // 响应成功
            // console.log('响应成功');
            response.data,
        (error) => {
            console.log(error);
            // 响应错误
            if (error.response && error.response.status) {
                return Promise.reject(error);
            }
            return Promise.reject(error);
        }
    );
    method = method.toLowerCase();
    if (method === "get" || method === "delete") {
        console.log(data)
        return instance({url, method, params: data, ...config});
    }
    return instance({url, method, data, ...config});
};

// 导出
export default http;
