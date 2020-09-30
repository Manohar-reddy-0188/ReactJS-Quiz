import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button/Button';
import styles from './FinishQuiz.module.scss';


const FinishQuiz = ( { quizs, results, onRetry } ) => {

  const successCount = Object.keys( results ).reduce( ( total, key ) => {
    if ( results[ key ] === 'success' ) {
      total++;
    }

    return total;
  }, 0 );

  return (
    <div className={styles.FinishQuiz}>
      <ul>
        {quizs.map( ( quiz, index ) => {

          const classes = [ 'fa',
            results[ quiz.id ] === 'success' ? 'fa-times' : 'fa-check',
            styles[ results[ quiz.id ] ]
          ];

          return (
            <li key={index}>
              <strong>{index + 1}.</strong>&nbsp;
              {quiz.question}
              <i className={classes.join( ' ' )}></i>
            </li>
          );
        } )}
      </ul>
      <p>{successCount} of {quizs.length}</p>
      <div>
        <Button type='primary' onClick={onRetry}>Repeat</Button>
        <Link to='/'>
          <Button type='success'>Tests</Button>
        </Link>
      </div>
    </div >
  );
};

export default FinishQuiz;
