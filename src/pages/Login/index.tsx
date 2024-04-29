import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FormProps, Space } from 'antd';
import { Button, Form, Input, Typography } from 'antd';

import LoginLayout from '@/layouts/LoginLayout';
import {login} from '@/queries/auth.ts';
import authStore from '@/store/authStore.ts';

type FieldType = {
  email: string;
  password: string;
};
const { Item } = Form;

// const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
//   console.log('Failed:', errorInfo);
// };

const LoginPage = () => {
  const navigate = useNavigate();
  const authorize = authStore(s => s.authorize);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const loginData = await login({email: values.email, password: values.password});
    if (loginData) {
      authorize(loginData);
      navigate('/');
    }
  };

  return (
    <LoginLayout pageTitle="Login">
      <Form
        name="basic"
        labelAlign="left"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Item>

        <Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Item>
        <Space align="center" size="middle">
          <Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Item>

          <Typography.Text strong>
            <Link to="/register">Create account</Link>
          </Typography.Text>
        </Space>
      </Form>
    </LoginLayout>
  );
};

export default LoginPage;