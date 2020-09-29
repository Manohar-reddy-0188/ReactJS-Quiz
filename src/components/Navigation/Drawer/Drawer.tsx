import React from 'react';
import BackDrop from '../../UI/BackDrop/BackDrop';
import styles from './Drawer.module.scss';

const links = [ 1, 2, 3 ];

const Drawer = ( { isOpen, onClose } ) => {

  const renderLinks = () => {
    return links.map( ( link, index ) => {
      return (
        <li key={index}>
          <a>Link {link}</a>
        </li>
      );
    } );
  };

  const classes = [ styles.Drawer ];

  if ( !isOpen ) {
    classes.push( styles.close );
  }

  return (
    <>
      <nav className={classes.join( ' ' )}>
        <ul>
          {renderLinks()}
        </ul>
      </nav>
      {isOpen && <BackDrop onClick={onClose} />}
    </>
  );
};

export default Drawer;
