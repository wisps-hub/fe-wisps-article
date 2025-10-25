import { request } from "@/utils";

//获取频道列表
export function getChannelsAPI(){
    return request({
        url: "/api/article/api/v1/channel/channels",
        method: "GET"
    })
}

//发布文章
export function createArticleAPI(data){
    return request({
        url: "/api/article/api/v1/article/save",
        method: "POST",
        data
    })
}

//获取文章列表
export function getArticleListAPI(data){
    return request({
        url: "/api/article/api/v1/article/pageQuery",
        method: "POST",
        data
    })
}

//删除文章
export function deleteArticleAPI(id){
    return request({
        url: `/api/article/api/v1/article/delete/${id}`,
        method: "DELETE"
    })
}

//获取文章
export function getArticleAPI(id){
    return request({
        url: `/api/article/api/v1/article/${id}`,
        method: "GET"
    })
}