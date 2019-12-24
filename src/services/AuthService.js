import { request } from './request';
import { routes } from '../constants/constant.routes';

const API_URL = `http://localhost:3001/`;

export default class AuthService {
  static signin(userObj) {
    return request('POST', `${API_URL}${routes.SIGNIN}`, null, userObj, null)
  }
} 