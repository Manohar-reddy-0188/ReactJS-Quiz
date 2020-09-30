import React from 'react';
import styles from './MenuToggle.module.scss';


export interface IMenuToggle {
  isOpen: boolean;
  onClick: () => void;
}

const MenuToggle: React.FC<IMenuToggle> = ( { isOpen, onClick } ): JSX.Element => {

  const classes = [
    styles.MenuToggle,
    'fa'
  ];

  if ( isOpen ) {
    classes.push( 'fa-times' );
    classes.push( styles.Open );
  } else {
    classes.push( 'fa-bars' );
  }

  return (
    <i className={classes.join( ' ' )} onClick={onClick} />
  );
};

export default MenuToggle;
