import React from 'react';
import { NavLink } from 'react-router-dom';
import BackDrop from '../../UI/BackDrop/BackDrop';
import styles from './Drawer.module.scss';


export interface ILink {
  to: string;
  label: string;
  exact: boolean;
}

export interface IDrawer {
  isOpen: boolean;
  isAuth: boolean;
  onClose: () => void;
}

const Drawer: React.FC<IDrawer> = ( { isOpen, isAuth, onClose } ) => {

  const links: ILink[] = [];

  if ( isAuth ) {
    links.push( { to: '/', label: 'Home Page', exact: true } );
    links.push( { to: '/logout', label: 'LogOut', exact: false } );
    links.push( { to: '/quiz-creator', label: 'Create Quiz', exact: false } );
  } else {
    links.push( { to: '/auth', label: 'Authentication', exact: false } );
  }

  const renderLinks = () => {
    return links.map( ( link, index ) => {
      return (
        <li key={index}>
          <NavLink
            exact={link.exact}
            to={link.to}
            activeClassName={styles.active}
            onClick={onClose}
          >
            {link.label}
          </NavLink>
        </li>
      );
    } );
  };

  return (
    <>
      <nav className={`${ styles.Drawer } ${ !isOpen && styles.close }`}>
        <ul>
          {renderLinks()}
        </ul>
      </nav>
      {isOpen && <BackDrop onClick={onClose} />}
    </>
  );
};

export default Drawer;
