import React from 'react';
import styles from './MenuToggle.module.scss';


const MenuToggle = ( { isOpen, onClick } ) => {

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
