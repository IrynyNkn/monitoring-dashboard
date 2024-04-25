import React from 'react';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useToggle } from 'react-use';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, KubernetesOutlined, AimOutlined, NotificationOutlined } from '@ant-design/icons';

import useStyles from './styles.tsx';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
};

const items: MenuItem[] = [
  getItem('Dashboard', '/', <HomeOutlined />),
  getItem('Cluster Data', '/cluster-data', <KubernetesOutlined />),
  getItem('Ping', '/ping', <AimOutlined />),
  getItem('Notifications', '/notifications', <NotificationOutlined />)
];

const Sidebar = () => {
  const { styles } = useStyles();
  const navigate = useNavigate();
  const [collapsed, toggleCollapsed] = useToggle(false);

  return (
    <div className={styles.container}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        theme={'light'}
      >
        <Menu
          defaultSelectedKeys={['/']}
          mode="inline"
          items={items}
          className={styles.menu}
          onClick={({key}) => navigate(key)}
        />
      </Sider>
    </div>
  );
};

export default Sidebar;