/*
    封装axios:
    超时时间
    URL
    请求头
    请求方法
    请求参数
*/
import axios from 'axios'

const request = (url = '',data = {} , method , timeout = 2000) =>{ //默认值写到接受参数里
    return new Promise((resolve, reject) => {
        method = method.toLowCase()//将请求方法转为小写以统一处理
        if (method === 'get'){
            axios({
                method:method.toLowercase,
                params:data,
                timeout:timeout,
                url:url,
            }).then((Response)=>{
                console.log("请求成功")
                resolve(Response.data)
            }).catch((error)=>{
                reject(error)
            })
        }else if (method === 'post'){
            axios({
                method:method.toLowercase,
                data:data,
                timeout:timeout,
                url:url,
            }).then((Response)=>{
                console.log("请求成功")
                resolve(Response.data)
            }).catch((error)=>{
                reject(error)
            })
        }
    })
}

export default request //方法导出