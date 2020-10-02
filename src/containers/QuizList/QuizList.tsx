import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Axios from '../../axios/Axios-quiz';
import Loader from '../../components/UI/Loader/Loader';
import styles from './QuizList.module.scss';


const QuizList = () => {

  const [ quizList, setQuizList ] = useState<object[]>( [] );
  const [ isLoading, setIsLoading ] = useState<boolean>( true );

  useEffect( () => {
    Axios.get( 'quizes.json' )
      .then( response => {
        const quizes: object[] = [];
        Object.keys( response.data ).forEach( ( id, index ) => {
          quizes.push( {
            id,
            name: `Quiz №${ index + 1 }`
          } );
        } );
        setQuizList( quizes );
        setIsLoading( false );
      } )
      .catch( error => console.log( error ) );
  }, [] );

  const renderQuiz = () => {
    return quizList.map( ( quiz, index ) => {
      return (
        <li key={index}>
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
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
          {isLoading ? <Loader /> : renderQuiz()}
        </ul>
      </div>
    </div>
  );
};

export default QuizList;
