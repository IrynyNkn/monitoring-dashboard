import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css  }) => ({
  wrap: css`
      && {
          margin-bottom: 20px;
      }
  `,
  title: css`
    && {
        margin: 0 0 10px;
    }
  `,
  indicatorText: css`
    && {
        position: relative;
        
        &::after {
            content: '•';
            position: absolute;
            right: -11px;
            top: 0.5px;
        }
    }
  `,
  infoText: css`
      && {
          color: ${token.colorTextSecondary};
      }
  `
}));

export default useStyles;