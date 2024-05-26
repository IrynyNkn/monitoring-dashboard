import React, {useMemo} from 'react';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useToggle } from 'react-use';
import { useNavigate, useLocation } from 'react-router-dom';
import {HomeOutlined, KubernetesOutlined, AimOutlined, NotificationOutlined, ClusterOutlined} from '@ant-design/icons';

import useStyles from './styles.tsx';
import externalPingStore from '@/store/extPingStore.ts';

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

const Sidebar = () => {
  const { externalPingEnabled } = externalPingStore(s => s);
  const { styles } = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, toggleCollapsed] = useToggle(false);

  const items: MenuItem[] = useMemo(() => {
    const nav = [
      getItem('Dashboard', '/', <HomeOutlined />),
      getItem('Cluster Data', '/kube-data', <KubernetesOutlined />),
      // getItem('Monitors', '/monitors', <MonitorOutlined />),
      getItem('Availability Pings', '/ping', <AimOutlined />, [
        { key: '/icmp-pings', label: 'Icmp Pings'},
        { key: '/http-health-checks', label: 'Health Checks'}
      ]),
      getItem('Alerts', '/alerts', <NotificationOutlined />)
    ];

    if (externalPingEnabled) {
      nav.push(getItem('External Ping', '/external-ping', <ClusterOutlined />));
    }

    return nav;
  }, [externalPingEnabled]);

  return (
    <div className={styles.container}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        theme={'light'}
      >
        <Menu
          defaultSelectedKeys={[location.pathname]}
          mode="inline"
          items={items}
          onClick={({key}) => navigate(key)}
        />
      </Sider>
    </div>
  );
};

export default Sidebar;