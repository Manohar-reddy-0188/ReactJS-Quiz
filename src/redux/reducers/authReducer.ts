import AuthActionTypes from '../types/authActions';

export interface IAuthState {
  isAuth: boolean;
  token: string;
}

export interface IAuthAction {
  type: AuthActionTypes;
  payload?: any;
}

const initialState = {
  isAuth: false,
  token: null
};

export default ( state = initialState, { type, payload }: IAuthAction ) => {
  switch ( type ) {
    case AuthActionTypes.AUTH_SUCCESS:
      return { ...state, isAuth: true, token: payload };
    case AuthActionTypes.LOGOUT:
      localStorage.removeItem( 'token' );
      localStorage.removeItem( 'userId' );
      localStorage.removeItem( 'experationDate' );
      return { ...state, isAuth: false, token: null };
    default:
      return state;
  }
};
