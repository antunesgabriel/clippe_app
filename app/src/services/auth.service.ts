import api from 'src/config/api.config';
import {SignInParam} from 'src/context/auth.context';

type SuccessResponse = {
  type: string;
  token: string;
};

export const signIn = async (credentials: SignInParam) => {
  const {data} = await api.post<SuccessResponse>('/signin', credentials);
  api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

  return data.token;
};
