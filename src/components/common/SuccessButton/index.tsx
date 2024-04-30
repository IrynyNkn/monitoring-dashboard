import React, {ReactNode} from 'react';
import { ConfigProvider, Button } from 'antd';
import type {ButtonProps} from 'antd';
import { green } from '@ant-design/colors';

type Props = ButtonProps & {
  children: ReactNode;
};

const SuccessButton = ({ children, ...props }: Props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: green[4],
            colorPrimaryHover: green[5],
            colorPrimaryActive: green[6],
          }
        }
      }}
    >
      <Button {...props}>
        {children}
      </Button>
    </ConfigProvider>
  );
};

export default SuccessButton;