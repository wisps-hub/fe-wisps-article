import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/img/logo.png'
import { useDispatch } from 'react-redux';
import { fetchLogin } from '@/store/modules/user';
import { useNavigate } from 'react-router-dom';



const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onFinish = async loginForm => {
        //触发异步action 调用fetchLogin
        await dispatch(fetchLogin(loginForm))
        //1 跳转
        navigate("/")
        //2 提示
        message.success("登陆成功")
    }

    return (
        <div className='login'>
            <Card className='login-container'>
                <img className='login-logo' src={logo} alt=''/>
                {/* 登陆表单 */}
                <Form validateTrigger = 'onBlur' onFinish={onFinish}>
                    <Form.Item
                        name="mobile"
                        rules={[
                            {
                                required: true,
                                message: '输入手机号'
                            },
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '输入正确手机号'
                            }
                        ]}>
                        <Input size='large' placeholder='输入手机号'></Input>
                    </Form.Item>
                    <Form.Item
                        name="captcha"
                        rules={[
                            {
                                required: true,
                                message: '输入验证码'
                            }
                        ]}>
                        <Input size='large' placeholder='输入验证码'></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' size='large' block>login</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login