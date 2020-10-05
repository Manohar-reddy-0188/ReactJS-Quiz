import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';
import { requestQuizes } from '../../redux/actions/quizActions';
import { IRootState } from '../../redux/reducers/rootReducer';
import styles from './QuizList.module.scss';


const QuizList = () => {

  const quizList = useSelector( ( state: IRootState ) => state.quizs.quizList );
  const isLoading = useSelector( ( state: IRootState ) => state.quizs.isLoading );
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch( requestQuizes() );
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
