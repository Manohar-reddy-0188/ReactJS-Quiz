import Axios, { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { authSuccess } from '../actions/authActions';
import AuthActionTypes from '../types/authActions';
import { logout } from './../actions/authActions';


export function* authWatcher() {
  yield takeEvery( AuthActionTypes.LOGIN, authLoginWorker );
  yield takeEvery( AuthActionTypes.REGISTER, authRegisterWorker );
  yield takeEvery( AuthActionTypes.AUTO_LOGIN, authAutoLoginWorker );
}

export function* authLoginWorker( { payload } ) {
  try {
    const response = yield call( postLoginData.bind( null, payload.email, payload.password ) );
    yield call( setAuthDateInStorage.bind( null, response ) );
    yield put( authSuccess( response.data.idToken ) );
    yield call( autoLogout.bind( null, response.data.expiresIn ) );
  } catch ( error ) {
    console.log( error );
  }
}

export function* authRegisterWorker( { payload } ) {
  try {
    yield call( postRegisterData.bind( null, payload.email, payload.password ) );
  } catch ( error ) {
    console.log( error );
  }
}

export function* authAutoLoginWorker() {
  const token = localStorage.getItem( 'token' );
  const experationDate = new Date( localStorage.getItem( 'experationDate' ) );
  if ( token && new Date() <= experationDate ) {
    yield put( authSuccess( token ) );
    yield call( autoLogout.bind( null, ( experationDate.getTime() - new Date().getTime() ) / 1000 ) );
  } else {
    yield put( logout() );
  }
}

async function postLoginData( email: string, password: string ): Promise<AxiosResponse> {
  const authData = { email, password, returnSecureToken: true };
  return await Axios.post( 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJJvXncI_Auiut7yycgOsvuC2bqyg0bv4', authData );
}

async function postRegisterData( email: string, password: string ): Promise<AxiosResponse> {
  const authData = { email, password, returnSecureToken: true };
  return await Axios.post( 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJJvXncI_Auiut7yycgOsvuC2bqyg0bv4', authData );
}

function setAuthDateInStorage( response: AxiosResponse ): void {
  const experationDate = new Date( new Date().getTime() + response.data.expiresIn * 1000 );
  localStorage.setItem( 'token', response.data.idToken );
  localStorage.setItem( 'userId', response.data.localId );
  localStorage.setItem( 'experationDate', experationDate.toString() );
}

function autoLogout( time: number ): void {
  const timeout = setTimeout( () => { logout(); }, time * 1000 );
  clearTimeout( timeout );
}
