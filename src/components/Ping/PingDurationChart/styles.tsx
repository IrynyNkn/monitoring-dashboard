import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css  }) => ({
  title: css`
      && {
          margin: 4px 0 16px 4px;
      }
  `,
  wrapper: css`
      margin-left: -16px;
  `,
}));

export default useStyles;