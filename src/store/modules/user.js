import { createSlice } from "@reduxjs/toolkit";
import { saveToken as _saveToken, getToken, removeToken } from "@/utils";
import { loginAPI, getProfileAPI } from "@/apis/user";


const userStore = createSlice({
    name: "user",
    // 数据状态
    initialState: {
        token: getToken() || '',
        userInfo: {}
    },
    // 同步修改方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            _saveToken(action.payload)
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        clearUserInfo(state) {
            state.token = ''
            state.userInfo = {}
            removeToken()
        }
    }
})

//解构出actionCreater
const {setToken, setUserInfo, clearUserInfo} = userStore.actions

//获取reducer函数
const userReducer = userStore.reducer

//异步方法 完成登陆获取token
const fetchLogin = (loginForm)=>{
    return async (dispatch)=>{
        //1. 发送异步请求
        const result = await loginAPI(loginForm)
        //2. 提交同步action 保存token
        dispatch(setToken(result.data.token))
    }
}

//获取个人信息 异步方法
const fetchUserInfo = ()=>{
    return async (dispatch)=>{
        //1. 发送异步请求
        const result = await getProfileAPI()
        //2. 提交同步action 保存token
        dispatch(setUserInfo(result.data))
    }
}

export { fetchLogin, fetchUserInfo, clearUserInfo, setToken }

export default userReducer