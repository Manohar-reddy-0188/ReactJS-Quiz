import React from 'react';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishQuiz from '../../components/FinishQuiz/FinishQuiz';
import styles from './Quiz.module.scss';


export interface IQuestion {
  id: number;
  question: string;
  answers: IAnswer[];
  rightAnswerId: number;
}

export interface IAnswer {
  id: number;
  text: string;
}

export interface IAnswerRight {
  [ answerId: number ]: string;

}

class Quiz extends React.Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        question: 'How You Feel?',
        rightAnswerId: 1,
        id: 1,
        answers: [
          { text: 'Bad', id: 1 },
          { text: 'Good', id: 2 },
          { text: 'Some', id: 3 },
          { text: 'Fuck You', id: 4 }
        ]
      },
      {
        question: 'How Many Year You?',
        rightAnswerId: 3,
        id: 2,
        answers: [
          { text: '25', id: 1 },
          { text: '26', id: 2 },
          { text: '24', id: 3 },
          { text: '23', id: 4 }
        ]
      }
    ]
  };

  onAnswerClickHandler = answerId => {
    if ( this.state.answerState ) {
      const key = Object.keys( this.state.answerState )[ 0 ];
      if ( this.state.answerState[ key ] === 'success' ) {
        return;
      }
    }

    const question = this.state.quiz[ this.state.activeQuestion ];
    const results = this.state.results;

    if ( question.rightAnswerId === answerId ) {
      if ( !results[ question.id ] ) {
        results[ question.id ] = 'success';
      }

      this.setState( {
        answerState: { [ answerId ]: 'success' },
        results
      } );

      const timeout = window.setTimeout( () => {
        if ( this.isQuizFinished() ) {
          this.setState( {
            isFinished: true
          } );
        } else {
          this.setState( {
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          } );
        }
        window.clearTimeout( timeout );
      }, 1000 );
    } else {
      results[ question.id ] = 'error';
      this.setState( {
        answerState: { [ answerId ]: 'error' },
        results
      } );
    }
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  retryHandler = () => {
    this.setState( {
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    } );
  };

  render() {
    return (
      <div className={styles.Quiz}>
        <div className={styles.QuizWrapper}>
          <h1>Quiz</h1>

          {
            this.state.isFinished
              ? <FinishQuiz
                results={this.state.results}
                quizs={this.state.quiz}
                onRetry={this.retryHandler}
              />
              : <ActiveQuiz
                answers={this.state.quiz[ this.state.activeQuestion ].answers}
                question={this.state.quiz[ this.state.activeQuestion ].question}
                onAnswerHandler={this.onAnswerClickHandler}
                quizLength={this.state.quiz.length}
                answerNumber={this.state.activeQuestion + 1}
                state={this.state.answerState}
              />
          }
        </div>
      </div>
    );
  }
}


export default Quiz;
