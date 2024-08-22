import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Grid } from '../../../../node_modules/@mui/material/index';
// import { LoginStore } from 'components/redux/login/action';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../routes/AuthContext';
import { jwtDecode } from 'jwt-decode';
import {ROLE_LIST} from '../../../constants/constants'

const AuthLogin = (props) => {
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleForgotAction = () => {
    props.onForgotAction(); // Call the provided function when the button is clicked
  };

  const onFinish = (values) => {
    form
      .validateFields()
      .then(() => {
        login(values)
          .then((response) => {
            if (response.status == 200) {
              form.resetFields();
              let token = response.data.data[0].token;
              let decoded;
              if (token === '') {
                decoded = '';
                navigate('/');
              } else {
                decoded = jwtDecode(token);
                let role = decoded?.role?.[0]?.authority || '';
                if (role == ROLE_LIST.ADMIN) {
                  navigate('/dashboard');
                } else if (role == ROLE_LIST.AUDITOR) {
                  navigate('/AssetAuditDisposed');
                } else if (role == ROLE_LIST.SAP) {
                  navigate('/SapAssetCreation');
                } else if (role == ROLE_LIST.USER) {
                  navigate('/asset-list');
                } else if (role == ROLE_LIST.USER1) {
                  navigate('/asset-list');
                } else {
                  navigate('/');
                }
              }
            }
          })
          .catch((error) => {
            toast.error('Invalid credential', error);
            console.log(error);
          });
      })
      .catch((errorInfo) => {
        toast.error('Validation error', errorInfo);
      });
  };

  return (
    <Form
      style={{ width: '48%', margin: 'auto', marginTop: '20px' }}
      name="normal_login"
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
            message: 'Please Enter your Username'
          }
        ]}
      >
        <Input suffix={<UserOutlined style={{ color: '#000000' }} />} placeholder="Username" className="log_input" />
      </Form.Item>
      <span style={{ color: '#637381', fontSize: '11px', fontWeight: '600' }}>Password</span>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please Enter your Password'
          }
        ]}
        className="log-form"
      >
        {/* <Input.Password placeholder="input password" /> */}
        <Input.Password
          placeholder="Password"
          className="log_input"
          iconRender={(visible) => (visible ? <LockOutlined style={{ color: 'black' }} /> : <LockOutlined style={{ color: '#000000' }} />)}
        />
      </Form.Item>

      <Form.Item className="log-form hgt-lof">
        <Grid Item sx={{ display: 'flex', justifyContent: 'space-between', width: '96%' }}>
          <Grid Item>
            <Form.Item>
              <Checkbox style={{ color: '#454F5B', fontSize: '11px', fontWeight: '600' }}>Remember me</Checkbox>
            </Form.Item>
          </Grid>
          <Grid item>
            <a href="#" onClick={handleForgotAction} style={{ color: '#4380EB', fontSize: '11px', fontWeight: '600' }}>
              Forgot password?
            </a>
          </Grid>
        </Grid>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AuthLogin;
