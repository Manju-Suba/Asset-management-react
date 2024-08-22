import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { SendRequest } from 'components/redux/login/action';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../../routes/AuthContext';

const ForgorPassword = () => {
    // eslint-disable-next-line no-unused-vars
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    // const navigate = useNavigate();
    // const { login } = useAuth();

    const onFinish = (values) => {
        form.validateFields()
            .then(() => {
                dispatch(SendRequest(values))
                    .then((response) => {
                        if (response.status == 200) {
                            form.resetFields();
                            toast.success('Successfully sent reset password link to your email');
                        }
                    })
                    .catch((error) => {
                        toast.error('Invalid credential', error);
                    });
            })
            .catch((errorInfo) => {
                toast.error('Validation error', errorInfo);
            });
    };

    return (
        <Form
            style={{ width: '48%', margin: 'auto', marginTop: '20px' }}
            name="forgot_request_form"
            initialValues={{
                remember: true
            }}
            onFinish={onFinish}
            form={form}
        >
            <span style={{ color: '#637381', fontSize: '11px', fontWeight: '600' }}>Email</span>

            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please Enter your Email Id'
                    }
                ]}
            >
                <Input suffix={<UserOutlined style={{ color: '#000000' }} />} placeholder="Email Id" className="log_input" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-button">
                    Send Request
                </Button>
            </Form.Item>
        </Form>
    );
};
export default ForgorPassword;
