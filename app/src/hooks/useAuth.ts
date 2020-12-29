import {useContext} from 'react';

import {AuthContext, AuthState} from 'src/context/auth.context';

export const useAuth = (): AuthState => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Context need called after provider');
  }

  return context;
};
