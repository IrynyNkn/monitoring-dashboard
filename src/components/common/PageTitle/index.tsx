import React from 'react';

import useStyles from './styles.ts';

type Props = {
  children: React.ReactNode;
};

const PageTitle = ({children}: Props) => {
  const { styles } = useStyles();

  return (
    <h1 className={styles.title}>
      {children}
    </h1>
  );
};

export default PageTitle;