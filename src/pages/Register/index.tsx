import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import authStore from '@/store/authStore.ts';
import {Button, Form, FormProps, Input, Space, Typography} from 'antd';

import {register} from '@/queries/auth.ts';
import LoginLayout from '@/layouts/LoginLayout';

type FieldType = {
  email: string;
  password: string;
  repeatPassword: string;
};
const { Item } = Form;

const Register = () => {
  const navigate = useNavigate();
  const authorize = authStore(s => s.authorize);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const registerData = await register({
      email: values.email,
      password: values.password,
      repeatPassword: values.repeatPassword
    });
    if (registerData) {
      authorize(registerData);
      navigate('/');
    }
  };

  return (
    <LoginLayout pageTitle="Register">
      <Form
        name="basic"
        labelAlign="left"
        layout="vertical"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
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

        <Item<FieldType>
          label="Repeat Password"
          name="repeatPassword"
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
            <Link to="/login">Log into existing account</Link>
          </Typography.Text>
        </Space>
      </Form>
    </LoginLayout>
  );
};

export default Register;