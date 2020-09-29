import React from 'react';
import styles from './BackDrop.module.scss';

const BackDrop = ( { onClick } ) => {
  return (
    <div className={styles.BackDrop} onClick={onClick}>
    </div>
  );
};

export default BackDrop;
