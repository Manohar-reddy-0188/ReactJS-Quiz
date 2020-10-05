import AuthActionTypes from '../types/authActions';
import { IAuthAction } from './../reducers/authReducer';
export const login = ( email: string, password: string ): IAuthAction => ( {
  type: AuthActionTypes.LOGIN,
  payload: { email, password }
} );

export const autoLogin = (): IAuthAction => ( { type: AuthActionTypes.AUTO_LOGIN } );

export const register = ( email: string, password: string ): IAuthAction => ( {
  type: AuthActionTypes.REGISTER,
  payload: { email, password }
} );

export const logout = (): IAuthAction => ( { type: AuthActionTypes.LOGOUT } );

export const authSuccess = ( token: string ): IAuthAction => ( {
  type: AuthActionTypes.AUTH_SUCCESS,
  payload: token
} );
