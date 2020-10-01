import React from 'react';
import styles from './Select.module.scss';


export interface ISelect {
  options: object;
  value: number;
  label: string;
  onChange: ( event: Event ) => void;
}

const Select: React.FC<ISelect> = ( { options, value, label, onChange } ): JSX.Element => {

  const htmlFor = `${ label }-${ Math.random() }`;

  return (
    <div className={styles.Select}>
      <label htmlFor={htmlFor}>{label}</label>
      <select
        id={htmlFor}
        value={value}
        onChange={onChange}
      >
        {options.map( ( option, index ) => {
          return (
            <option
              value={option.value}
              key={option.value + index}
            >
              {option.text}
            </option>
          );
        } )}
      </select>
    </div>
  );
};

export default Select;
