import React from 'react';
import styles from './BackDrop.module.scss';


export interface IBackDrop {
  onClick: () => void;
}

const BackDrop: React.FC<IBackDrop> = ( { onClick } ): JSX.Element => {
  return (
    <div className={styles.BackDrop} onClick={onClick}>
    </div>
  );
};

export default BackDrop;
