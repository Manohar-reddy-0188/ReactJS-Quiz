import React from 'react';
import styles from './Input.module.scss';


export interface IInput {
  type?: string;
  label: string;
  value?: string;
  touched?: string;
  valid?: boolean;
  shouldValidate?: boolean;
  errorMessage?: string;
  onChange: () => void;

}

const Input: React.FC<IInput> = ( {
  type = 'text',
  label,
  value,
  touched,
  valid,
  shouldValidate,
  errorMessage,
  onChange
} ): JSX.Element => {

  const id = `${ type }-${ Math.random() }`;
  const isInvalid = ( touched, valid, shouldValidate ): boolean => {
    return !valid && shouldValidate && touched;
  };

  return (
    <div className={styles.Input}>
      <label
        htmlFor={id}
        className={`${ isInvalid( touched, valid, shouldValidate ) && styles.invalid }`}
      >{label}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange} />
      </label>
      {isInvalid( touched, valid, shouldValidate ) && <span>{errorMessage}</span>}
    </div>
  );
};

export default Input;
