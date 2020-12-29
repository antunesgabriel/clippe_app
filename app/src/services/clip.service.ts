import api from 'src/config/api.config';

export type Clip = {
  title: string;
  content: string;
};

export type ClipItem = {
  title: string;
  content: string;
  id: number;
};

type ListResponse = {
  clippers: any[];
};
export const listClippers = async () => {
  const {data} = await api.get<ListResponse>('/clippers');
  return data.clippers;
};

type CreateResponse = {
  clippers: any[];
};

export const createClip = async (clip: Clip) => {
  const {data} = await api.post<CreateResponse>('/clippers', clip);

  return data.clippers;
};

type UpdateResponse = {
  message: string;
  clippers: any[];
};

export const updateClip = async (clip: Clip, clipId: number) => {
  const {data} = await api.put<UpdateResponse>(`/clippers/${clipId}`, clip);

  return data;
};

type DestroyResponse = {
  message: string;
  clippers: any[];
};

export const destroyClip = async (clipId: number) => {
  const {data} = await api.delete<DestroyResponse>(`/clippers/${clipId}`);

  return data;
};
