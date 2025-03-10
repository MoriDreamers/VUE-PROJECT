import request from "../api/index.js";
import { apiUrl } from '../config';

export const getUserList = () => {
    return request(apiUrl.userGetList, {}, "get",2000);
}