import axios from "axios";
import { getToken, removeToken } from "./token";
import router from "@/router";


const request = axios.create({
    baseURL: 'http://localhost',
    timeout: 5000
})

//请求发送之前 做拦截处理
request.interceptors.request.use((config)=>{
    //注入token数据
    const token = getToken()
    if(token){
        config.headers.Authorization = `Bearer ${token}`
        config.headers.uid = 2
    }
    return config
}, (error)=>{
    return Promise.reject(error)
})

//响应拦截器
request.interceptors.response.use((response)=>{
    //响应成功处理
    return response.data
}, (error)=>{

    if(error.response.code === 12001){
        removeToken()
        router.navigate.router("/login")
        window.location.reload()
    }

    //响应失败处理
    return Promise.reject(error)
})

export {request}