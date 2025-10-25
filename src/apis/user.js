import { request } from "@/utils";

//登陆请求
export function loginAPI(loginForm){
    return request({
        url: "/api/auth/api/v1/auth/login",
        method: "POST",
        data: loginForm
    })
}

//获取用户信息
export function getProfileAPI(){
    return request({
        url: "/api/user/api/v1/user/userInfo?user=haha",
        method: "GET"
    })
}


