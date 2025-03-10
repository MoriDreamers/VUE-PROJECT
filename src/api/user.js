//封装一些前后端交互的请求 调用request方法 使用config中解构的api地址
import request from "../api/index.js";
import { apiUrl } from '../config';

export const getUserListApi = () => {
    return request(apiUrl.userGetList, {}, "get",2000);
}

export const getUserDeleteApi = (id) => { 
    console.log("id",id);
    return request(apiUrl.userDelete, {id}, "get",2000);
}