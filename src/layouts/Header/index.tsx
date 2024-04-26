import {Layout, Space, Typography, Flex, Avatar, Divider, Button} from 'antd';
import { ToolOutlined, UserOutlined } from '@ant-design/icons';

import useStyles from './styles.tsx';

const { Header: HeaderBase } = Layout;
const { Title } = Typography;

const Header = () => {
  const { styles, theme } = useStyles();

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
          <Button>Log Out</Button>
        </Flex>
      </Flex>
    </HeaderBase>
  );
};

export default Header;