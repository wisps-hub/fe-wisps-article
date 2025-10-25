import { Card, Breadcrumb, Form, Button, Radio, Input, Upload, Space, Select, message } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { Link, useSearchParams } from "react-router-dom"
import './index.scss'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useEffect, useState } from "react"
import { createArticleAPI, getArticleAPI } from "@/apis/article"
import { useChannel } from "@/hooks/useChannel"


const Publish = () =>{

    const {channelList} = useChannel()

    //创建文章方法
    const onfinish = (articleForm)=>{
        console.log("articleForm", articleForm)
        if(imgList.length > imgType){
            return message.warning('检查图片数量')
        } 
        const {title, content, channel_id} = articleForm
        const articleReq = {
            id: articleId,
            title,
            content,
            channelId: channel_id,
            cover: {
                type: imgType,
                images: imgList.map(item => {
                    // 适配编辑和新增图片url
                    if(item.response){
                        return item.response.data
                    }else{
                        return item.url
                    }
                    
                })
            }
        }
        console.log("articleReq", articleReq)
        createArticleAPI(articleReq)
    }

    //上传回调
    const [imgList, setImgList] = useState([])
    const onUploadChange = (uploadData)=>{
        setImgList(uploadData.fileList)
    }

    //切换封面type
    const [imgType, setImgType] = useState([])
    const onTypeChange = (e)=>{
        setImgType(e.target.value)
    }

    //填充表单
    const [form] = Form.useForm();
    const [searchParms] = useSearchParams()
    const articleId = searchParms.get('id')
    useEffect(()=>{
        async function getArticle(){
            const result = await getArticleAPI(articleId)
            const data = result.data
            //回填表单
            form.setFieldsValue({
                ...data,
                channel_id: data.channelId,
                type: data.coverType
            })
            //回填封面
            setImgType(data.coverType)
            if(data.images){
                const urls = data.images.split(',')
                setImgList(urls.map(url => {
                    return { url }
                }))
            }
            
        }
        if(articleId){
            getArticle()
        }
    }, [articleId, form])

    return <div className="publish">
        <Card title={
            <Breadcrumb items = {[
                {title: <Link to={'/home'}>首页</Link>},
                {title: `${articleId? '编辑' : '发布'}文章`}
            ]}/>}
        >
            <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} initialValues={{ type: 0 }} onFinish={onfinish} form={form} >
                
                <Form.Item label="标题" name="title" rules={[{ required: true, message: "输入文章标题" }]}>
                    <Input placeholder="输入文章标题" style={{width: 400}} />
                </Form.Item>

                <Form.Item label="频道" name="channel_id" rules={[{ required: true, message: "选择文章频道" }]} >
                    <Select placeholder="选择文章频道" style={{width: 400}}>
                        {channelList.map(item => <Select.Option key={item.id} value={item.id}>{item.channelName}</Select.Option>)}
                    </Select>
                </Form.Item>

                <Form.Item label = "封面">
                    <Form.Item name = "type">
                        <Radio.Group onChange={onTypeChange}>
                            <Radio value={1}>单图</Radio>
                            <Radio value={3}>三图</Radio>
                            <Radio value={0}>无图</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {imgType > 0 &&
                        // listType 控制选择文件框样式
                        // showUploadList 控制显示上传列表
                        <Upload 
                            name="image" maxCount={imgType} 
                            listType="picture-card" 
                            showUploadList action={"http://localhost/api/article/api/v1/file/upload"} 
                            onChange={onUploadChange}
                            fileList={imgList}
                        >
                            <div style={{ marginTop: 8 }}> <PlusOutlined /> </div>
                        </Upload>
                    }
                </Form.Item>

                <Form.Item label="内容" name="content" rules={[{ required: true, message: "输入文章内容" }]}>
                    <ReactQuill className="publish-quill" theme="snow" placeholder="开始创作文章" />
                </Form.Item>

                <Form.Item wrapperCol={{offset: 4}}>
                    <Space>
                        <Button size="large" type="primary" htmlType="submit">发布文章</Button>
                    </Space>
                </Form.Item>
            </Form>
        </Card>
    </div>
}

export default Publish