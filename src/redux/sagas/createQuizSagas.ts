import { AxiosResponse } from 'axios';
import { call, takeEvery } from 'redux-saga/effects';
import Axios from '../../axios/Axios-quiz';
import CreateQuizActionTypes from '../types/createQuizActions';


export function* createQuizWatcher() {
  yield takeEvery( CreateQuizActionTypes.POST_NEW_QUIZ, postQuizWorker );
}

export function* postQuizWorker( { payload } ) {
  try {
    yield call( postNewQuiz.bind( null, payload ) );
  } catch ( error ) {
    console.log( error );
  }
}

async function postNewQuiz( quiz: object ): Promise<AxiosResponse> {
  return await Axios.post( 'quizes.json', quiz );
}
