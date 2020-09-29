import React, { useState } from 'react';
import Drawer from '../../components/Navigation/Drawer/Drawer';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import styles from './Layout.module.scss';


const Layout: React.FC = ( { children } ): JSX.Element => {

  const [ isOpen, setIsOpen ] = useState<boolean>( false );

  const toggleMenuHandler = () => {
    setIsOpen( ( prevState: boolean ) => !prevState );
  };

  const closeHandler = () => {
    setIsOpen( false );
  };

  return (
    <div className={styles.Layout}>
      <Drawer isOpen={isOpen} onClose={closeHandler} />
      <MenuToggle isOpen={isOpen} onClick={toggleMenuHandler} />

      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
