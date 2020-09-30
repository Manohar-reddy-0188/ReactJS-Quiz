import React from 'react';
import styles from './Button.module.scss';


export interface IButton {
  type: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button: React.FC<IButton> = ( {
  type,
  disabled = false,
  onClick,
  children
} ): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className={`${ styles.Button } ${ type && styles[ type ] }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
