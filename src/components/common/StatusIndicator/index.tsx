import React from 'react';
import { green, red, gray } from '@ant-design/colors';

import useStyles from './styles.tsx';

type Props = {
  isUp: boolean;
  isFetching: boolean;
};

const StatusIndicator = ({ isUp = true, isFetching }: Props) => {
  const { styles } = useStyles();
  return (
    <div
      className={styles.indicatorOuter}
      style={{ background: isFetching ? '#F0F0F0' : isUp ? green[1] : red[1] }}
    >
      <div
        className={styles.indicatorInner}
        style={{ background: isFetching ? gray[0] : isUp ? green[4] : red[4] }}
      />
    </div>
  );
};

export default StatusIndicator;