import React from 'react';
import AnswerItem from './AnswerItem/AnswerItem';
import styles from './AnswersList.module.scss';

const AnswersList = ( { answers, state, onAnswerHandler } ) => {
  return (
    <ul className={styles.AnswersList}>
      {answers.map( ( answer, index ) => {
        return <AnswerItem key={index} answer={answer} state={state ? state[ answer.id ] : null} onAnswerHandler={onAnswerHandler} />;
      } )}
    </ul>
  );
};

export default AnswersList;
