import { request } from './request';
import { routes } from '../constants/constant.routes';

const API_URL = `http://localhost:3001/`;

export default class RoughService {
  static getRoughs() {
    return request('GET', `${API_URL}${routes.GET_ROUGHS}`, null, null, null)
  }

  static getRoughList() {
    return request('GET', `${API_URL}${routes.GET_ROUGH_LIST}`, null, null, null)
  }


  static getRoughHistory(roughId) {
    let qp = `?`;
    if (roughId) {
      qp += `rough_id=${roughId}`
    }
    return request('GET', `${API_URL}${routes.GET_ROUGH_HISTORY}${qp}`, null, null, null)
  }

  static getPlanDetail(roughId) {
    let qp = `?`;
    if (roughId) {
      qp += `rough_id=${roughId}`
    }
    return request('GET', `${API_URL}${routes.GET_PLAN_DETAIL}${qp}`, null, null, null)
  }

  static getLsDetail(roughId) {
    let qp = `?`;
    if (roughId) {
      qp += `rough_id=${roughId}`
    }
    return request('GET', `${API_URL}${routes.GET_LS_DETAIL}${qp}`, null, null, null)
  }

  static getBlockDetail(roughId) {
    let qp = `?`;
    if (roughId) {
      qp += `rough_id=${roughId}`
    }
    return request('GET', `${API_URL}${routes.GET_BLOCK_DETAIL}${qp}`, null, null, null)
  }

  static addRough(roughObj) {
    return request('POST', `${API_URL}${routes.ADD_ROUGH}`, null, roughObj, null)
  }

  static addRoughHistory(roughObj) {
    return request('POST', `${API_URL}${routes.ADD_ROUGH_HISTORY}`, null, roughObj, null)
  }

}