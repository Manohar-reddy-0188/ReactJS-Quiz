import QuizActionTypes from '../types/quizActions';
import { IQuizList } from './../sagas/quizSagas';
import { IQuestion } from './quizReducer';


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

export interface IQuizState {
  quizList: IQuizList[];
  currentQuiz: IQuestion[],
  activeQuestion: number,
  answerState: object[] | null,
  results: IAnswerRight,
  isFinished: boolean,
  isLoading: boolean;
}

export interface IQuizAction {
  type: QuizActionTypes;
  payload?: any;
}

const initialState: IQuizState = {
  quizList: [],
  currentQuiz: [],
  activeQuestion: 0,
  answerState: null,
  results: {},
  isFinished: false,
  isLoading: false,
};


const quizReducer = ( state = initialState, { type, payload }: IQuizAction ) => {
  switch ( type ) {
    case QuizActionTypes.SHOW_LOADER:
      return { ...state, isLoading: true };
    case QuizActionTypes.HIDE_LOADER:
      return { ...state, isLoading: false };
    case QuizActionTypes.FINISHED_QUIZ:
      return { ...state, isFinished: true };
    case QuizActionTypes.SET_QUIZES:
      return { ...state, quizList: payload };
    case QuizActionTypes.SET_CURRENT_QUIZ:
      const newCurrentQuiz = [ ...state.currentQuiz, ...payload ];
      return { ...state, currentQuiz: newCurrentQuiz };
    case QuizActionTypes.SET_SUCCESS_RESULT_QUIZ:
      const newSuccessResults = { ...state.results, [ payload ]: 'success' };
      return { ...state, results: newSuccessResults };
    case QuizActionTypes.SET_ERROR_RESULT_QUIZ:
      const newErrorResults = { ...state.results, [ payload ]: 'error' };
      return { ...state, results: newErrorResults };
    case QuizActionTypes.SET_SUCCESS_ANSWER_QUIZ:
      const newSuccessAnswer = { ...state.answerState, [ payload ]: 'success' };
      return { ...state, answerState: newSuccessAnswer };
    case QuizActionTypes.SET_ERROR_ANSWER_QUIZ:
      const newErrorAnswer = { ...state.answerState, [ payload ]: 'error' };
      return { ...state, answerState: newErrorAnswer };
    case QuizActionTypes.SET_NEXT_ACTIVE_QUESTION:
      return { ...state, activeQuestion: state.activeQuestion + 1 };
    case QuizActionTypes.CLEAR_ANSWERS:
      return { ...state, answerState: null };
    case QuizActionTypes.RESET_RESULTS:
      return { ...state, currentQuiz: [], activeQuestion: 0, answerState: null, isFinished: false, results: {} };
    default:
      return state;
  }
};

export default quizReducer;
