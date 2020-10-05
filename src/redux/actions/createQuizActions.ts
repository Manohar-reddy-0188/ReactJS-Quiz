import { ICreateQuizAction } from '../reducers/createQuizReducer';
import CreateQuizActionTypes from '../types/createQuizActions';


export const resetQuiz = (): ICreateQuizAction => ( { type: CreateQuizActionTypes.RESET_QUIZ } );
export const setNewQuiz = ( quiz: object ): ICreateQuizAction => ( {
  type: CreateQuizActionTypes.SET_NEW_QUIZ,
  payload: quiz
} );
export const postNewQuiz = ( quiz: object ): ICreateQuizAction => ( {
  type: CreateQuizActionTypes.POST_NEW_QUIZ,
  payload: quiz
} );
