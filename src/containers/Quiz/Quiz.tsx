import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishQuiz from '../../components/FinishQuiz/FinishQuiz';
import Loader from '../../components/UI/Loader/Loader';
import { clearAnswers, finishedQuiz, requestCurrentQuiz as requestCurrentQuizById, resetResults, setErrorAnswer, setErrorResult, setNextActiveQuestion, setSuccessAnswer, setSuccessResult } from '../../redux/actions/quizActions';
import { IRootState } from '../../redux/reducers/rootReducer';
import styles from './Quiz.module.scss';


const Quiz: React.FC = ( { match } ): JSX.Element => {

  const quizs = useSelector( ( state: IRootState ) => state.quizs );
  const dispatch = useDispatch();

  const onAnswerClickHandler = ( answerId: number ): void => {
    if ( quizs.answerState ) {
      const key: string = Object.keys( quizs.answerState )[ 0 ];
      if ( quizs.answerState[ key ] === 'success' ) {
        return;
      }
    }

    const question = quizs.currentQuiz[ quizs.activeQuestion ];
    const results = quizs.results;

    if ( +question.rightAnswerId === answerId ) {
      if ( !results[ question.id ] ) {
        dispatch( setSuccessResult( question.id ) );
      }

      dispatch( setSuccessAnswer( answerId ) );

      const timeout = setTimeout( () => {
        if ( isQuizFinished() ) {
          dispatch( finishedQuiz() );
        } else {
          dispatch( setNextActiveQuestion() );
          dispatch( clearAnswers() );
        }
        clearTimeout( timeout );
      }, 1000 );
    } else {
      dispatch( setErrorResult( question.id ) );
      dispatch( setErrorAnswer( question.id ) );
    }
  };

  const isQuizFinished = () => {
    return quizs.activeQuestion + 1 === quizs.currentQuiz.length;
  };

  const retryHandler = () => {
    dispatch( resetResults() );
  };

  useEffect( () => {
    dispatch( requestCurrentQuizById( match.params.id ) );
    return () => {
      retryHandler();
    };
  }, [] );

  return (
    <div className={styles.Quiz}>
      <div className={styles.QuizWrapper}>
        <h1>Please Give Answers On This Questions:</h1>
        {
          quizs.isLoading || quizs.currentQuiz.length <= 0
            ? <Loader />
            : quizs.isFinished
              ? <FinishQuiz
                results={quizs.results}
                quizs={quizs.currentQuiz}
                onRetry={retryHandler}
              />
              : <ActiveQuiz
                answers={quizs.currentQuiz[ quizs.activeQuestion ].answers}
                question={quizs.currentQuiz[ quizs.activeQuestion ].question}
                onAnswerHandler={onAnswerClickHandler}
                quizLength={quizs.currentQuiz.length}
                answerNumber={quizs.activeQuestion + 1}
                state={quizs.answerState}
              />
        }
      </div>
    </div>
  );
};

export default Quiz;
