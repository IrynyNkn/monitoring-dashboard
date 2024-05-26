import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Layout, Space, Typography, Flex, Avatar, Divider, Button} from 'antd';
import { ToolOutlined, UserOutlined } from '@ant-design/icons';

import useStyles from './styles.tsx';
import authStore from '@/store/authStore.ts';
import {authStorageKey} from '@/utils/consts.ts';
import {useQueryClient} from '@tanstack/react-query';

const { Header: HeaderBase } = Layout;
const { Title } = Typography;

const Header = () => {
  const queryClient = useQueryClient();
  const { styles, theme } = useStyles();
  const clearAuthData = authStore(s => s.clearAuthData);
  const navigate = useNavigate();

  const logout = () => {
    clearAuthData();
    localStorage.removeItem(authStorageKey);
    navigate('/login');
    // queryClient.invalidateQueries().then(() => navigate('/login'));
  };

  return (
    <HeaderBase className={styles.container}>
      <Flex justify="space-between" align="center">
        <Space>
          <ToolOutlined style={{ color: theme.colorPrimary, fontSize: 20 }} />
          <Title level={4} className={styles.title}>ObserverApp</Title>
        </Space>
        <Flex align={'center'}>
          <Avatar
            size="large"
            icon={<UserOutlined />}
            style={{ background: theme.colorBgSpotlight }}
          />
          <Divider
            type="vertical"
            className={styles.divider}
          />
          <Button onClick={logout}>Log Out</Button>
        </Flex>
      </Flex>
    </HeaderBase>
  );
};

export default Header;