import http from "../utils/http";
import proxy from "../config/proxy";

const config = {proxy, headers: {"Content-Type": "application/json"}, timeout: 1000000};

// 登录
export const login = (data) => http({url: "/login", method: "post", data, config: config});
//注册
export const regist = (data) => http({url: "/regist", method: "post", data, config: config});
//心跳
export const report = () => http({url: "/report", method: "get", config: config});
//获取user
export const getUserMsg = (params) => http({url: "/getUserByUsername", method: "get", data: params, config: config});
//获取users
export const getUser = (data) => http({url: "/getUser", method: "post", data: data, config: config});
//更改user
export const updateUserMsg = (data) => http({url: "/updateUserByUsername", method: "post", data: data, config: config});
//获取文章
export const getArticle = (params) => http({url: "/getArticle", method: "post", data: params, config: config});
//获取文章ById
export const getArticleById = (params) => http({url: "/getArticleById", method: "get", data: params, config: config});
//发布文章
export const publicArticle = (data) => http({url: "/publicArticle", method: "post", data: data, config: config});
//删除文章
export const deleteArticle = (data) => http({url: "/deleteArticle", method: "post", data: data, config: config});
//更新文章
export const updateArticle = (data) => http({url: "/updateArticle", method: "post", data: data, config: config});