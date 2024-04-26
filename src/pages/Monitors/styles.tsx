import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css  }) => ({
  container: css`
      display: flex;
      justify-content: center;
  `,
  space: css`
      && {
          width: 100%;
          max-width: 600px;
      }
  `,
}));

export default useStyles;
