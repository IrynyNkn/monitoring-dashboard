import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  container: css`
      && {
          background: ${token.colorBgContainer};
          border-color: ${token.colorBorder};
          border-bottom-width: 1px;
          border-bottom-style: solid;
      }
  `,
  title: css`
      && {
          margin: 0;
          color: ${token.colorPrimary};
      }
  `,
  divider: css`
    && {
        height: 30px;
    }
  `
}));

export default useStyles;