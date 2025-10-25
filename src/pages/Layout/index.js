import { Layout, Menu, Popconfirm } from "antd";
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined
} from '@ant-design/icons'
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './index.scss'

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

const MLayout = () => {
    const navigate = useNavigate()

    //获取用户信息
    const nickName = 'admin'

    //退出
    const doLogout = ()=>{

    }

    // 获取当前路径路由
    const location = useLocation()
    const selectedKey = location.pathname

    //切换菜单
    const onMenuClick = (router)=>{
        console.log('onMenuClick', router)
        navigate(router.key)
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

export default MLayout