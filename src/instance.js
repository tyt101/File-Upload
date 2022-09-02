import axios from 'axios'
import Qs from 'qs'
let instance = axios.create();
instance.defaults.baseURL = 'http://127.0.0.1:8888';
instance.defaults.headers['Content-Type'] = 'multipart/form-data';
instance.defaults.transformRequest = (data, headers) => {
    const contentType = headers['Content-Type'];
    // Qs和JSON的区别：
    //QS将JSON对象转换成'aa=2&bb="tangyating"'。
    //JSON将对象转换成"{"aa"=1,"bb"="tangyating"}"
    if (contentType === "application/x-www-form-urlencoded") return Qs.stringify(data);
    return data; 
};  
instance.interceptors.response.use(response => {
    return response.data;
});
export default instance