import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  container: css` 
      && {
          background: #ffffff;
          border-color: ${token.colorBorder};
          border-right-width: 1px;
          border-right-style: solid;
      }
  `,
  menu: css`
      && {
          padding-top: 48px;
      }
  `,
  divider: css`
      && {
          margin-left: 10px;
          margin-right: 10px;
      }
  `
}));

export default useStyles;