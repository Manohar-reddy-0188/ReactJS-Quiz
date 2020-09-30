import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './QuizList.module.scss';


const QuizList = () => {

  const renderQuiz = () => {
    return [ 1, 2, 3 ].map( ( quiz, index ) => {
      return (
        <li key={index}>
          <NavLink to={'/quiz/' + quiz}>
            Quiz {quiz}
          </NavLink>
        </li >
      );
    } );
  };

  return (
    <div className={styles.QuizList}>
      <div>
        <h1>Quiz List</h1>

        <ul>
          {renderQuiz()}
        </ul>
      </div>
    </div>
  );
};

export default QuizList;
