import React from 'react';
import { NavLink } from 'react-router-dom';
import BackDrop from '../../UI/BackDrop/BackDrop';
import styles from './Drawer.module.scss';


export interface ILink {
  to: string;
  label: string;
  exact: boolean;
}

const links: ILink[] = [
  { to: '/', label: 'Home Page', exact: true },
  { to: '/auth', label: 'Authentication', exact: false },
  { to: '/quiz-creator', label: 'Create Quiz', exact: false }
];

export interface IDrawer {
  isOpen: boolean;
  onClose: () => void;
}

const Drawer: React.FC<IDrawer> = ( { isOpen, onClose } ) => {

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
