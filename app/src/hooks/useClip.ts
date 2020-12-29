import {useContext} from 'react';

import {ClipContext, ClipState} from 'src/context/clip.context';

export const useClip = (): ClipState => {
  const context = useContext(ClipContext);

  if (!context) {
    throw new Error('Context need called after provider');
  }

  return context;
};
