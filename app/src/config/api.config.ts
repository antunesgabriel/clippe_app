import axios from 'axios';
import {Platform} from 'react-native';

export const APIURL =
  Platform.OS === 'ios'
    ? 'http://54.233.78.183:3333'
    : 'http://54.233.78.183:3333';

const api = axios.create({
  baseURL: APIURL,
});

export default api;
