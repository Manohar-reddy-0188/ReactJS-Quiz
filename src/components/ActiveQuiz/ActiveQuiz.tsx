import React from 'react';
import styles from './ActiveQuiz.module.scss';
import AnswersList from './AnswersList/AnswersList';

const ActiveQuiz = ( { question, answers, quizLength, answerNumber, state, onAnswerHandler } ) => {
  return (
    <div className={styles.ActiveQuiz}>
      <p className={styles.Question}>
        <span>
          <strong>
            {answerNumber}.
          </strong>&nbsp;
          {question}
        </span>
        <small>{answerNumber} of {quizLength}</small>
      </p>

      <AnswersList answers={answers} state={state} onAnswerHandler={onAnswerHandler} />

    </div>
  );
};

export default ActiveQuiz;
