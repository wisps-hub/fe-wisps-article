import { Layout, Menu, Popconfirm } from "antd";
import './index.scss'
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined
} from '@ant-design/icons'
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo, clearUserInfo } from "@/store/modules/user";

const {Header, Sider} = Layout

const items = [
    {
        label: '首页',
        key:'/',
        icon: <HomeOutlined />
    },
    {
        label: '文章管理',
        key:'/article',
        icon: <DiffOutlined />
    },
    {
        label: '创建文章',
        key:'/publish',
        icon: <EditOutlined />
    }
]

const GeekLayout = () => {
    const navigate = useNavigate()

    // 点击菜单事件
    const onMenuClick = (route)=>{
        const path = route.key
        navigate(path)
    }

    // 获取当前路径路由
    const location = useLocation()
    const selectedKey = location.pathname

    //获取用户信息
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchUserInfo());
    }, [dispatch])

    const nickName = useSelector(state => state.user.userInfo.nickName)

    //执行退出
    const doLogout = () => {
        dispatch(clearUserInfo())
        navigate("/login")
    }

    return (
        <Layout>
            <Header className="header">
                <div className="logo"/>
                <div className="user-info">
                    <span className="user-name">{nickName}</span>
                    <span className="user-logout">
                        <Popconfirm title="是否确认退出?" okText="退出" cancelText="取消" onConfirm={doLogout}>
                            <LogoutOutlined /> {/* 退出 */}
                        </Popconfirm>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="dark"
                        selectedKeys={selectedKey}
                        onClick={onMenuClick}
                        items={items}
                        style={{height: '100%', borderRight: 0}}></Menu>
                </Sider>
                <Layout className="layout-content" style={{padding: 20}}>
                    {/* 二级路由出口 */}
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
    )
}

export default GeekLayout