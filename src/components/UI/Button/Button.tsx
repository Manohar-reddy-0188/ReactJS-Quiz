import React from 'react';
import styles from './Button.module.scss';

const Button = ( { type, disabled = false, onClick, children } ) => {

  const cls = [
    styles.Button,
    styles[ type ]
  ];

  return (
    <button
      onClick={onClick}
      className={cls.join( ' ' )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
