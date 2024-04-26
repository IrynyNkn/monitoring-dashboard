import React from 'react';
import { green, red } from '@ant-design/colors';

import useStyles from './styles.tsx';

type Props = {
  isUp: boolean;
};

const StatusIndicator = ({ isUp = true }: Props) => {
  const { styles } = useStyles();
  return (
    <div
      className={styles.indicatorOuter}
      style={{ background: isUp ? green[1] : red[1] }}
    >
      <div
        className={styles.indicatorInner}
        style={{ background: isUp ? green[4] : red[4] }}
      />
    </div>
  );
};

export default StatusIndicator;