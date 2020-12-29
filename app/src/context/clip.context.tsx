import React, {createContext, useState} from 'react';

import {
  Clip,
  ClipItem,
  createClip,
  destroyClip,
  listClippers,
  updateClip,
} from 'src/services/clip.service';

type Props = {
  children: React.ReactElement;
};

export type ClipState = {
  clippers: ClipItem[];
  loading: boolean;
  actionCreate(clip: Clip, callback: any): Promise<void>;
  actionUpdate(clip: Clip, id: number, callback: any): Promise<void>;
  actionDestroy(id: number, callback: any): Promise<void>;
  actionList(callback: any): Promise<void>;
};

export const ClipContext = createContext<ClipState | null>(null);

export function ClipProvider({children}: Props): React.ReactElement {
  const [clippers, setClippers] = useState<ClipItem[]>([]);
  const [loading, setLoading] = useState(false);

  const actionList = async (callback: any) => {
    try {
      setLoading(true);
      const newList = await listClippers();
      setClippers(newList);
    } catch (err) {
      callback(
        err?.response?.data?.message || 'Falha ao obter lista de clipes',
      );
    } finally {
      setLoading(false);
    }
  };

  const actionCreate = async (clip: Clip, callback: any) => {
    try {
      setLoading(true);
      const newList = await createClip(clip);
      setClippers(newList);
      callback(null, 'Novo clipe adicionado!');
    } catch (err) {
      callback(err?.response?.data?.message || 'Falha ao adicionar clip');
    } finally {
      setLoading(false);
    }
  };

  const actionUpdate = async (clip: Clip, id: number, callback: any) => {
    try {
      setLoading(true);
      const {clippers: newList, message} = await updateClip(clip, id);
      setClippers(newList);
      callback(null, message);
    } catch (err) {
      console.log(err.message);
      callback(err?.response?.data?.message || 'Falha ao atualizar clip');
    } finally {
      setLoading(false);
    }
  };

  const actionDestroy = async (id: number, callback: any) => {
    try {
      setLoading(true);
      const {clippers: newList, message} = await destroyClip(id);
      setClippers(newList);
      callback(null, message);
    } catch (err) {
      callback(err?.response?.data?.message || 'Falha ao apagar clip');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClipContext.Provider
      value={{
        clippers,
        loading,
        actionList,
        actionCreate,
        actionUpdate,
        actionDestroy,
      }}>
      {children}
    </ClipContext.Provider>
  );
}
