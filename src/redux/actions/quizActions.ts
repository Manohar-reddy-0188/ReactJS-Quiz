import { IQuizAction } from '../reducers/quizReducer';
import QuizActionTypes from '../types/quizActions';
import { IQuestion } from './../reducers/quizReducer';
import { IQuizList } from './../sagas/quizSagas';


export const showLoader = (): IQuizAction => ( { type: QuizActionTypes.SHOW_LOADER } );
export const hideLoader = (): IQuizAction => ( { type: QuizActionTypes.HIDE_LOADER } );
export const requestQuizes = (): IQuizAction => ( { type: QuizActionTypes.REQUEST_QUIZES } );
export const requestCurrentQuiz = ( id: string ): IQuizAction => ( {
  type: QuizActionTypes.REQUEST_CURRENT_QUIZ,
  payload: id
} );
export const finishedQuiz = (): IQuizAction => ( { type: QuizActionTypes.FINISHED_QUIZ } );
export const resetResults = (): IQuizAction => ( { type: QuizActionTypes.RESET_RESULTS } );
export const setSuccessResult = ( id: number ): IQuizAction => ( {
  type: QuizActionTypes.SET_SUCCESS_RESULT_QUIZ,
  payload: id
} );
export const setErrorResult = ( id: number ): IQuizAction => ( {
  type: QuizActionTypes.SET_ERROR_RESULT_QUIZ,
  payload: id
} );
export const setSuccessAnswer = ( id: number ): IQuizAction => ( {
  type: QuizActionTypes.SET_SUCCESS_ANSWER_QUIZ,
  payload: id
} );
export const setErrorAnswer = ( id: number ): IQuizAction => ( {
  type: QuizActionTypes.SET_ERROR_ANSWER_QUIZ,
  payload: id
} );
export const clearAnswers = (): IQuizAction => ( { type: QuizActionTypes.CLEAR_ANSWERS } );
export const setNextActiveQuestion = (): IQuizAction => ( { type: QuizActionTypes.SET_NEXT_ACTIVE_QUESTION } );
export const setQuizes = ( quizes: IQuizList[] ): IQuizAction => ( {
  type: QuizActionTypes.SET_QUIZES,
  payload: quizes
} );
export const setCurrentQuiz = ( quiz: IQuestion[] ): IQuizAction => ( {
  type: QuizActionTypes.SET_CURRENT_QUIZ,
  payload: quiz
} );
