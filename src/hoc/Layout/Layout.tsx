import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Drawer from '../../components/Navigation/Drawer/Drawer';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import { IRootState } from '../../redux/reducers/rootReducer';
import styles from './Layout.module.scss';


const Layout: React.FC = ( { children } ): JSX.Element => {

  const [ isOpen, setIsOpen ] = useState<boolean>( false );
  const isAuth = useSelector( ( state: IRootState ) => state.auth.isAuth );

  const toggleMenuHandler = (): void => {
    setIsOpen( ( prevState: boolean ) => !prevState );
  };

  const closeHandler = (): void => {
    setIsOpen( false );
  };

  return (
    <div className={styles.Layout}>
      <Drawer isOpen={isOpen} onClose={closeHandler} isAuth={isAuth} />
      <MenuToggle isOpen={isOpen} onClick={toggleMenuHandler} />
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
