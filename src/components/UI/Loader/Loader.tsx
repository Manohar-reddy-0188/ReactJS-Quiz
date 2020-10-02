import React from 'react';
import styles from './Loader.module.scss';


const Loader: React.FC = (): JSX.Element => (
  <div className={styles.center}>
    <div className={styles.Loader}>
      <div /><div />
    </div>
  </div>
);

export default Loader;
