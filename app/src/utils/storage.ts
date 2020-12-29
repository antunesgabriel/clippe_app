import AsyncStorage from '@react-native-community/async-storage';

const TOKEN_KEY = '@token';
const USER_KEY = '@user';

export const setToken = async (token: string): Promise<void> =>
  AsyncStorage.setItem(TOKEN_KEY, token);
export const clearToken = async (): Promise<void> =>
  AsyncStorage.removeItem(TOKEN_KEY);
export const getToken = async (): Promise<string | null> =>
  AsyncStorage.getItem(TOKEN_KEY);
export const setUser = async (userData: string): Promise<void> =>
  AsyncStorage.setItem(USER_KEY, userData);
export const getUser = async (): Promise<string | null> =>
  AsyncStorage.getItem(USER_KEY);
export const clearUser = async (): Promise<void> =>
  AsyncStorage.removeItem(USER_KEY);
