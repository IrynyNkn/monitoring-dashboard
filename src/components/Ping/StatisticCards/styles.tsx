import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css  }) => ({
  card: css`
      position: relative;
      
      &::after {
          content: 'for last 1h';
          
          position: absolute;
          bottom: 20px;
          left: 26px;
          
          font-size: 10px;
          color: rgba(0, 0, 0, 0.45);
      }
  `,
  cardBody: css`
      && {
          padding-bottom: 8px;
      }
  `
}));

export default useStyles;