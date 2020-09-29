import React from 'react';
import styles from './AnswerItem.module.scss';

const AnswerItem = ( { answer, state, onAnswerHandler } ) => {

  const classArray = [ styles.AnswerItem ];

  if ( state ) {
    classArray.push( styles[ state ] );
  }

  return (
    <li className={classArray.join( ' ' )} onClick={() => onAnswerHandler( answer.id )}>
      { answer.text}
    </li>
  );
};

export default AnswerItem;
