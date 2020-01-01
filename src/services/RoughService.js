import { request } from './request';
import { routes } from '../constants/constant.routes';

const API_URL = `http://localhost:3001/`;

export default class RoughService {
  static getRoughs(page, pageSize, search) {
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
    return request('GET', `${API_URL}${routes.GET_ROUGHS}${qp}`, null, null, null)
  }

  static getRoughList(page, pageSize,search) {
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
    return request('GET', `${API_URL}${routes.GET_ROUGH_LIST}${qp}`, null, null, null)
  }

  static getLotList(roughId) {
    let qp = `?`;
    if (roughId) {
      qp += `rough_id=${roughId}`
    }
    return request('GET', `${API_URL}${routes.GET_LOT_LIST}${qp}`, null, null, null)
  }


  static getLotHistory(lotId) {
    let qp = `?`;
    if (lotId) {
      qp += `lot_id=${lotId}`
    }
    return request('GET', `${API_URL}${routes.GET_LOT_HISTORY}${qp}`, null, null, null)
  }


  static getLotStoneList(lotId) {
    let qp = `?`;
    if (lotId) {
      qp += `lot_id=${lotId}`
    }
    return request('GET', `${API_URL}${routes.GET_LOT_STONE_LIST}${qp}`, null, null, null)
  }


  static getPlanDetail(lotId) {
    let qp = `?`;
    if (lotId) {
      qp += `lot_id=${lotId}`
    }
    return request('GET', `${API_URL}${routes.GET_PLAN_DETAIL}${qp}`, null, null, null)
  }

  static getLsDetail(lotId) {
    let qp = `?`;
    if (lotId) {
      qp += `lot_id=${lotId}`
    }
    return request('GET', `${API_URL}${routes.GET_LS_DETAIL}${qp}`, null, null, null)
  }

  static getBlockDetail(lotId) {
    let qp = `?`;
    if (lotId) {
      qp += `lot_id=${lotId}`
    }
    return request('GET', `${API_URL}${routes.GET_BLOCK_DETAIL}${qp}`, null, null, null)
  }

  static addRough(roughObj) {
    return request('POST', `${API_URL}${routes.ADD_ROUGH}`, null, roughObj, null)
  }

  static addLotData(lotObj) {
    return request('POST', `${API_URL}${routes.ADD_LOT_DATA}`, null, lotObj, null)
  }

  static updateRough(roughObj) {
    return request('POST', `${API_URL}${routes.UPDATE_ROUGH}`, null, roughObj, null)
  }

  static updateLotData(roughObj) {
    return request('POST', `${API_URL}${routes.UPDATE_LOT}`, null, roughObj, null)
  }

  static addRoughHistory(roughObj) {
    return request('POST', `${API_URL}${routes.ADD_ROUGH_HISTORY}`, null, roughObj, null)
  }

  static updateLotHistory(roughObj) {
    return request('POST', `${API_URL}${routes.UPDATE_LOT_HISTORY}`, null, roughObj, null)
  }

}