import CreateQuizActionTypes from '../types/createQuizActions';

export interface ICreateQuizState {
  quiz: object[];
}

export interface ICreateQuizAction {
  type: CreateQuizActionTypes;
  payload?: any;
}

const initialState = {
  quiz: []
};

export default ( state = initialState, { type, payload }: ICreateQuizAction ) => {
  switch ( type ) {
    case CreateQuizActionTypes.SET_NEW_QUIZ:
      const newQuiz = [ ...state.quiz, payload ];
      return { ...state, quiz: newQuiz };
    case CreateQuizActionTypes.RESET_QUIZ:
      return { ...state, quiz: [] };
    default:
      return state;
  }
};
