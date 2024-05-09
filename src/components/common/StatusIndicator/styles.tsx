import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css  }) => ({
  indicatorOuter: css`
      width: 64px;
      height: 64px;
      border-radius: 50%;

      display: flex;
      justify-content: center;
      align-items: center;
  `,
  indicatorInner: css`
      width: 32px;
      height: 32px;
      border-radius: 50%;
  `,
}));

export default useStyles;