/* eslint-disable react-native/no-inline-styles */
import React, {createContext, useState} from 'react';

import {
  // setToken,
  clearToken,
  getToken,
  // setUser,
  setToken,
} from 'src/utils/storage';

import api from 'src/config/api.config';
import {register} from 'src/services/user.service';
import {signIn} from 'src/services/auth.service';
import {addToast} from 'src/utils/addToast';

type Props = {
  children: React.ReactElement;
};

export type SignInParam = {
  email: string;
  password: string;
};

export type SignUpParam = {
  email: string;
  password: string;
};

export type UserData = {
  token: string;
};

export type AuthState = {
  authenticated: boolean;
  authLoading: boolean;
  userData?: UserData;
  actionSignIn(credetials: SignInParam, callback: any): Promise<void>;
  actionSignUp(credetials: SignUpParam, callback: any): Promise<void>;
  actionLogout(): Promise<boolean>;
  setAuthLoading(status: boolean): void;
  initialization(navigator: any): Promise<void>;
};

export const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({children}: Props): React.ReactElement {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>();

  const actionSignIn = async (
    credentials: SignInParam,
    callback: any,
  ): Promise<void> => {
    try {
      setAuthLoading(true);
      const token = await signIn(credentials);

      await setToken(token);
      setAuthenticated(true);
      setAuthLoading(false);
    } catch (err) {
      setAuthLoading(false);
      callback(err.message || 'Um erro inexperado ocorreu');
    }
  };

  const actionSignUp = async (
    signUpParam: SignUpParam,
    callback: any,
  ): Promise<void> => {
    try {
      setAuthLoading(true);
      const message = await register(signUpParam);
      callback(null, message);
      setAuthLoading(false);
    } catch (err) {
      callback(
        err?.response?.data?.errors[0]?.message || 'Um erro inexperado ocorreu',
      );
      setAuthLoading(false);
    }
  };

  const actionLogout = async (): Promise<boolean> => {
    setAuthLoading(true);

    await clearToken();

    setAuthenticated(false);
    setUserData(undefined);
    setAuthLoading(false);

    return true;
  };

  const initialization = async (navigator: any) => {
    try {
      const token = await getToken();

      if (!token) {
        return navigator.navigate('SignIn');
      }

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      await api.get('/authenticated');

      // __DEV__ && console.log('Authenticated', data.ok);

      setAuthenticated(true);
      setAuthLoading(false);

      navigator.navigate('Home');
    } catch (err) {
      addToast('Ops!', 'Sessão expirada, efetue login novamente.', 'info');
      await clearToken();
      setAuthenticated(false);
      setAuthLoading(false);
      setUserData(undefined);
      navigator.navigate('SignIn');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        initialization,
        authenticated,
        authLoading,
        actionSignIn,
        actionSignUp,
        actionLogout,
        setAuthLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
