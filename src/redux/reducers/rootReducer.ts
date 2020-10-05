import { combineReducers, Reducer } from 'redux';
import authReducer, { IAuthAction, IAuthState } from './authReducer';
import createQuizReducer, { ICreateQuizAction, ICreateQuizState } from './createQuizReducer';
import quizReducer, { IQuizAction, IQuizState } from './quizReducer';


export interface IRootState {
  quizs: IQuizState;
  create: ICreateQuizState;
  auth: IAuthState;

}

export interface IRootAction {
  type: IQuizAction | ICreateQuizAction | IAuthAction;
  payload?: any;
}

const rootReducer: Reducer<IRootState, IRootAction> = combineReducers( {
  quizs: quizReducer,
  create: createQuizReducer,
  auth: authReducer
} );

export default rootReducer;
