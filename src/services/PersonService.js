import { request } from './request';
import { routes } from '../constants/constant.routes';

const API_URL = `http://localhost:3001/`;

export default class PersonService {
  static addPerson(personObj) {
    return request('POST', `${API_URL}${routes.ADD_PERSON}`, null, personObj, null)
  }

  static updatePerson(personObj) {
    return request('POST', `${API_URL}${routes.UPDATE_PERSON}`, null, personObj, null)
  }

  static getPerson(page, pageSize, search,from) {
    let qp = `?`;
    if (page) {
      qp += `page=${page}&`
    }
    if (pageSize) {
      qp += `limit=${pageSize}&`
    }
    if (search) {
      qp += `search=${search}&`
    }
    if (from) {
      qp += `from=${from}&`
    }
    return request('GET', `${API_URL}${routes.GET_PERSONS}${qp}`, null, null, null)
  }
} 