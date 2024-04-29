import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css }) => ({
  layout: css`
    && {
        min-height: 100vh;
    }
  `,
  content: css`
    && {
        display: flex;
        justify-content: center;
        align-items: center;
    }
  `,
  card: css`
    && {
        max-width: 550px;
        width: 100%;
        transform: translateY(-25px);
        padding-bottom: 12px;
    }
  `,
  title: css`
    && {
        margin: 8px 0 48px;
        text-align: center;
    }
  `
}));

export default useStyles;
