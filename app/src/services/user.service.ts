import api from 'src/config/api.config';
import {SignUpParam} from 'src/context/auth.context';

type SuccessResponse = {
  ok: boolean;
  message: string;
};

export const register = async (userDTO: SignUpParam) => {
  const {data} = await api.post<SuccessResponse>('/signup', userDTO);

  return data.message;
};
