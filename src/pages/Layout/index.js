import './index.scss'
import { Layout, Menu, Popconfirm } from "antd";
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined
} from '@ant-design/icons'
import { Outlet, useNavigate } from 'react-router-dom';

const {Header, Sider} = Layout

const items = [
    {
        label: '首页',
        key:'/home',
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
    const navigate = useNavigate();

    //获取用户信息
    const nickName = 'admin'

    //退出
    const doLogout = ()=>{

    }

    //默认选中菜单
    const selectedKey = null

    //切换菜单
    const onMenuClick = (router)=>{
        navigate(router.key)
    }

    return (
        <div>
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
                            defaultSelectedKeys={['/home']}
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
        </div>
    )
}

export default MLayout