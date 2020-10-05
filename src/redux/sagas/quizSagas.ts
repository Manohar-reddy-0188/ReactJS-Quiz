import { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import Axios from '../../axios/Axios-quiz';
import { showLoader } from '../actions/quizActions';
import QuizActionTypes from '../types/quizActions';
import { hideLoader, setCurrentQuiz, setQuizes } from './../actions/quizActions';


export interface IQuizList {
  id: string;
  name: string;
}


export function* quizWatcher() {
  yield takeEvery( QuizActionTypes.REQUEST_QUIZES, getQuizWorker );
  yield takeEvery( QuizActionTypes.REQUEST_CURRENT_QUIZ, getCurrentQuizWorker );
}

export function* getQuizWorker() {
  try {
    yield put( showLoader() );
    const response: AxiosResponse = yield call( fetchQuizs );
    const payload: IQuizList[] = yield getQuizsList( response );
    yield put( setQuizes( payload ) );
    yield put( hideLoader() );
  } catch ( error ) {
    yield put( hideLoader() );
    console.log( error );
  }
}

export function* getCurrentQuizWorker( { payload } ) {
  try {
    yield put( showLoader() );
    const response: AxiosResponse = yield call( fetchCurrentQuiz.bind( null, payload ) );
    yield put( setCurrentQuiz( response.data ) );
    yield put( hideLoader() );
  } catch ( error ) {
    yield put( hideLoader() );
    console.log( error );
  }
}

async function fetchCurrentQuiz( id: number ): Promise<AxiosResponse> {
  return await Axios.get( `/quizes/${ id }.json` );
}

async function fetchQuizs(): Promise<AxiosResponse> {
  return await Axios.get( 'quizes.json' );
}

function getQuizsList( response: AxiosResponse ): IQuizList[] {
  const quizes: IQuizList[] = [];

  Object.keys( response.data ).forEach( ( id, index ) => {
    quizes.push( { id, name: `Quiz №${ index + 1 }` } );
  } );

  return quizes;
}
