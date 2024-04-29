import React from 'react';

import useStyles from './styles.tsx';
import {Card, Layout, Typography} from 'antd';

type Props = {
  children: React.ReactNode;
  pageTitle: string;
};

const LoginLayout = ({ children, pageTitle }: Props) => {
  const { styles } = useStyles();

  return (
    <Layout className={styles.layout}>
      <Layout.Content className={styles.content}>
        <Card className={styles.card}>
          <Typography.Title
            className={styles.title}
            level={2}
          >{pageTitle}</Typography.Title>
          {children}
        </Card>
      </Layout.Content>
    </Layout>
  );
};

export default LoginLayout;