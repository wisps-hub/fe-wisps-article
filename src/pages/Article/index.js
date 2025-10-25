import { Link, useNavigate } from "react-router-dom"
import { Card, Breadcrumb, Form, Radio, Select, Button, DatePicker, Table, Space, Tag, Popconfirm } from "antd"
import locale from "antd/es/date-picker/locale/zh_CN"
import './index.scss'
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { useChannel } from "@/hooks/useChannel"
import img404 from '@/assets/img/logo.png'
import { useEffect, useState } from "react"
import { deleteArticleAPI, getArticleListAPI } from "@/apis/article"

const Article = () =>{
    const { RangePicker } = DatePicker

    const statusEnum = {
        0 : <Tag color="processing">草稿</Tag>,
        1 : <Tag color="warning">审核中</Tag>,
        2 : <Tag color="success">审核通过</Tag>,
        3 : <Tag color="error">审核不通过</Tag>
    }

    // 删除
    const confirmDel = async (data)=>{
        await deleteArticleAPI(data.id)
        setReqData({
            ...reqData
        })
    }

    const navigator = useNavigate()

    const columns = [
        {
            title: '封面',
            dataIndex: 'images',
            with: 120,
            render: images =>{
                return <img src={images || img404} width={80} height={80} alt=""/>
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            with: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: data => statusEnum[data]
        },
        {
            title: '发布时间',
            dataIndex: 'pubTime'
        },
        {
            title: '阅读数',
            dataIndex: 'readCount'
        },
        {
            title: '评论数',
            dataIndex: 'commentCount'
        },
        {
            title: "点赞数",
            dataIndex: 'likeCount'
        },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => navigator(`/publish?id=${data.id}`)}/>
                        <Popconfirm title="删除" description="是否确认删除?" onConfirm={()=> confirmDel(data)} okText="是" cancelText="否">
                            <Button type="primary" shape="circle" danger icon={<DeleteOutlined />} />
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]

    // 获取频道列表
    const { channelList } = useChannel();

    //表单数据
    const [reqData, setReqData] = useState({
        status: '',
        channelId: '',
        beginPubDate: '',
        endPubDate: '',
        currPage: 1,
        pageSize: 4
    })

    // 获取文章列表
    const [list, setList] = useState([])
    const [count, setCount] = useState([])
    useEffect(()=>{
        async function getList(){
            const result = await getArticleListAPI(reqData)
            setList(result.data)
            setCount(result.total)
        }
        getList();
    }, [reqData])

    // 搜索功能
    const onFinsh = (searchForm)=>{
        setReqData({
            ...reqData,
            channelId: searchForm.channel_id,
            status: searchForm.status,
            beginPubDate: searchForm.date ? searchForm.date[0].format('YYYY-MM-DD') : '',
            endPubDate: searchForm.date ? searchForm.date[1].format('YYYY-MM-DD') : ''
        })
    }

    //分页功能
    const onPageChange = (page) => {
        setReqData({
            ...reqData,
            currPage: page
        })
    }

    return <div>
        {/* 搜索框 */}
         <Card title={
            <Breadcrumb items = {[
                {title: <Link to={'/home'}>首页</Link>},
                {title: '文章列表'}
            ]}/>}
            style = {{marginBottom: 20}}
        >
            <Form initialValues={{ status: null }} onFinish = {onFinsh}>

                <Form.Item label="状态" name="status">
                    <Radio.Group>
                        <Radio value={null}>全部</Radio>
                        <Radio value={0}>草稿</Radio>
                        <Radio value={2}>审核通过</Radio>
                        <Radio value={3}>删除</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="频道" name="channel_id">
                    <Select placeholder="选择频道" style={{ width: 120 }}>
                        {channelList.map(item => <Select.Option key={item.id} value={item.id}>{item.channelName}</Select.Option>)}
                    </Select>
                </Form.Item>

                <Form.Item label="日期" name="date">
                    <RangePicker locale={locale}></RangePicker>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{marginLeft: 40}}>搜索</Button>
                </Form.Item>

            </Form>
        </Card>
        {/* 数据列表 */}
        <Card title={`根据筛选条件供查询到 ${count} 条结果: `}>
            <Table rowKey="id" columns={columns} dataSource={list} pagination={{total: count, pageSize: reqData.pageSize, onChange: onPageChange}} />
        </Card>
    </div>
}

export default Article