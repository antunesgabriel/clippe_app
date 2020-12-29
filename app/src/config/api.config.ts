import axios from 'axios';
import {Platform} from 'react-native';

export const APIURL =
  Platform.OS === 'ios' ? 'http://localhost:3333' : 'http://192.168.1.14:3333';

const api = axios.create({
  baseURL: APIURL,
});

export default api;
